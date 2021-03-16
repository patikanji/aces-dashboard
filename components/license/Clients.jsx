import { IsLoading2 } from "components/IsLoading"
import { SVGGuest } from "components/svg/Icons"
import { useState } from "react"

const Clients = ({ user, clients }) => {
  const [viewStack, setViewStack] = useState([])

  return (
    <div className="">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-plum-600 font-medium border-b border-bluegray-300">
            <td colSpan="2" className="p-3 pl-0">Perusahaan / Organisasi</td>
            <td className="p-3 pr-0 text-right">Proyek Terakhir</td>
          </tr>
        </thead>
        {clients.map(client => (
          <tbody key={client._id}>
            {!viewStack.includes(client._id) && (
              <tr
              onClick={e => {
                setViewStack(vs => ([...vs, client._id]))
              }}
              className="cursor-pointer border-b border-bluegray-200 text-bluegray-300 hover:text-bluegray-600 hover:bg-bluegray-50">
                <td className="w-6 p-3 pl-1 pr-0">
                  <SVGGuest className="w-6 h-6" />
                </td>
                <td className="p-3">
                  <span className="text-bluegray-700 font-mediums">{client.name}</span>
                  <span className="text-bluegray-400">, {client.city}</span>
                </td>
                <td className="p-3 pr-0 text-bluegray-500 text-right">{client.createdAt}</td>
              </tr>
            )}
            {viewStack.includes(client._id) && (
              <tr
              onClick={e => {
                setViewStack(viewStack.filter(vs => vs !== client._id))
              }}
              className="cursor-pointer border-b border-plum-300 border-opacity-25">
                <td className="w-6 p-3 pl-1 pr-0">
                  <SVGGuest className="w-6 h-6 text-bluegray-600" />
                </td>
                <td colSpan="2" className="p-3">
                  <span className="text-bluegray-700 font-semibold">{client.name}</span>
                </td>
              </tr>
            )}
            {viewStack.includes(client._id) && (
              <tr className="border-b bg-bluegray-50 bg-opacity-75 border-bluegray-200">
                <td></td>
                <td colSpan="2" className="p-3">
                  <ClientInfo client={client} />
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
      <pre>
        {/* {JSON.stringify(clients, null, 2)} */}
      </pre>
    </div>
  )
}

export default Clients

const ClientInfo = ({ client }) => {
  return (
    <table className="">
      <tbody className="align-top">
        <tr>
          <td className="text-bluegray-500 w-24 py-1">
            Nama:
          </td>
          <td className="text-bluegray-700 py-1">
            {client.name}
          </td>
        </tr>
        <tr>
          <td className="text-bluegray-500 py-1">
            Alamat:
          </td>
          <td className="text-bluegray-700 py-1">
            {client.address}
          </td>
        </tr>
        <tr>
          <td className="text-bluegray-500 py-1">
            Kota:
          </td>
          <td className="text-bluegray-700 py-1">
            {client.city}
          </td>
        </tr>
        <tr>
          <td className="text-bluegray-500 py-1">
            Telepon:
          </td>
          <td className="text-bluegray-700 py-1">
            {client.phone}
          </td>
        </tr>
        <tr>
          <td className="text-bluegray-500 py-1">
            Proyek:
          </td>
          <td className="py-1">
            <div className="text-indigo-500 leading-relaxed font-mediums mb-1s">
              2020 - Pemetaan Kawasan Limbah Terpadu
            </div>
            <div className="text-indigo-500 leading-relaxed font-mediums mb-1s">
              2021 - Pemetaan Kawasan Limbah Terpadu
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}