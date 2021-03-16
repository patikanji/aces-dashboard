import { useModulesMeta } from "hooks"
import { SelectModules } from "./SelectModules"

const openings = '04:00 05:00 06:00 07:00 08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00'
const closings = '09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00 20:00 21:00 22:00 23:00'

export const GroupSetup = ({ project, group }) => {
  const { meta, isLoading, isError } = useModulesMeta()

  return <>
    <div className="rounded-sm border border-indigo-300 px-4 pt-6 pb-6 mt-10">
      <div className="flex items-end mb-4">
        <h3 className="flex-grow text-2xl text-indigo-500 leading-none font-semibold">
          Create Project Group
        </h3>
        <button
          className="text-xs -my-px ml-3 px-3 py-1 rounded border border-bluegray-300 hover:border-bluegray-400 text-plum-500"
        >
          Cancel
        </button>
      </div>

      <div className="-mx-4 border-ts border-indigo-200 bg-bluegray-50 bg-gradient-to-r from-bluegray-200">
        <table className="w-full text-sm mb-5">
          <tbody>
            <tr className="border-b border-white">
              <td className="w-20 p-0">
                <div className="text-right py-2 px-3">Proyek:</div>
              </td>
              <td className="font-medium p-0 border-l border-white">
                <div className="px-3 py-2 overflow-hidden">
                  <p className="truncate">{project.shortTitle}</p>
                </div>
              </td>
            </tr>
            <tr className="">
              <td className="w-20 p-0">
                <div className="text-right py-2 px-3">Klien:</div>
              </td>
              <td className="font-medium p-0 border-l border-white">
                <div className="px-3 py-2 truncate">{project.client.name}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg text-emerald-600 font-medium mb-2">Deployment Settings</h3>
      <div className="max-w-xl text-sm mb-5">
        <table className="table-settings w-full">
          <tbody>
            <tr>
              <td className="py-2">
                <div className="">Nama Group:</div>
                <div className="text-xs text-bluegray-400">Maksimal 32 karakter</div>
              </td>
              <td className="py-2">
                <input
                  type="text"
                  className="input text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <div className="">Kode Akses:</div>
                <div className="text-xs text-bluegray-400">Maksimal 32 karakter</div>
              </td>
              <td className="py-2">
                <div className="relative">
                  <div className="absolute top-0 h-full">
                    <div className="h-full flex items-center pl-3">jhs-</div>
                  </div>
                  <input
                    type="text"
                    className="input text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3 pl-9"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <div className="">Tanggal Mulai:</div>
                <div className="text-xs text-bluegray-400">Maksimal 32 karakter</div>
              </td>
              <td className="py-2">
                <div className="flex items-center">
                  <input
                    type="date"
                    maxLength="10"
                    className="text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3 pr-1"
                  />
                  <div className="text-lg text-bluegray-400 px-1">:</div>
                  <select
                    className="text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3"
                  >
                    <option> - Pilih</option>
                    {openings.split(' ').map(t => (
                      <option key={t} value={t}>{t} WIB</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <div className="">Tanggal Selesai:</div>
                <div className="text-xs text-bluegray-400">Maksimal 32 karakter</div>
              </td>
              <td className="py-2">
                <div className="flex flex-grow items-center">
                  <input
                    type="date"
                    maxLength="10"
                    className="text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3 pr-1"
                  />
                  <div className="text-lg text-bluegray-400 px-1">:</div>
                  <select
                    className="text-sm rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-50 px-3"
                  >
                    <option> - Pilih</option>
                    {closings.split(' ').map(t => (
                      <option key={t} value={t}>{t} WIB</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg text-emerald-600 font-medium mb-2">ACES Modules</h3>
      <SelectModules meta={meta} />
    </div>
    <pre>
      META {JSON.stringify(meta, null, 2)}<br/>
      PROJECT {JSON.stringify(project, null, 2)}<br/>
    </pre>
    <style jsx>{`
    .table-settings td:first-child {
      width: 25%;
      min-width: 8.5rem;
      max-width: 12rem;
    }
    .table-settings td:last-child {
      padding-left: 0.5rem
    }
    .table-settings td input.input {
      width: 14rem;
    }
    .table-settings td .flex input,
    .table-settings td .flex select {
      width: 47.5%;
    }
    `}</style>
  </>
}