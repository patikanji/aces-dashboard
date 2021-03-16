import { Button } from "components/Buttons"
import { IsLoading } from "components/IsLoading"
import { LinkButton } from "components/LinkButtons"
import { SVGGuest } from "components/svg/Icons"
import { useUsers } from "hooks"
import fetchJson from "lib/fetchJson"
import Link from "next/link"
import { useState } from "react"

const Users = ({ user }) => {
  const { users, isLoading, isError, mutate } = useUsers()

  const [selected, setSelected] = useState(null)
  const [confirmedToDelete, setConfirmedToDelete] = useState(false)

  if (isLoading) return <IsLoading />

  async function deleteUser(e) {
    // e.preventDefault()
    // setDeleteForm(null)
    // setDeleteId(e.target.value)

    const url = '/api/post?q=delete-user'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: e.target.value }),
    })
    console.log('DELETE RESPONSE', response)

    mutate()
  }

  return (
    <div className="">
      <table className="w-full text-sm mb-16">
        <thead>
          <tr className="text-plum-600 font-medium border-b border-bluegray-300">
            <td colSpan="2" className="p-3 pl-0 pb-1">Nama Lengkap</td>
            <td className="hidden sm:table-cell p-3 pb-1">Email</td>
            <td width="18%" className="hidden md:table-cell p-3 pb-1">Role</td>
            <td width="18%" className="p-3 text-right">
              {user.licenseOwner && <LinkButton label="Add User" href="/add-user" />}
              {!user.licenseOwner && <>Action</>}
            </td>
          </tr>
        </thead>
        {users.map(person => (
          <tbody key={person.email}>
            <tr className="border-b border-bluegray-200">
              <td className="w-6 p-3 pl-1 pr-0">
                <SVGGuest className="w-6 h-6 text-bluegray-300" />
              </td>
              <td className="p-3">{person.fullname}</td>
              <td className="hidden sm:table-cell p-3">{person.email}</td>
              <td className="hidden md:table-cell p-3 whitespace-nowrap">
                {person.licenseOwner ? 'license-holder' : 'collaborator'}
              </td>
              <td className="text-xs text-right p-3 whitespace-nowrap">
                {user.email === person.email && (
                  <Link href="/change-password">
                    <a className="text-indigo-500">
                      Change password
                    </a>
                  </Link>
                )}
                {user.licenseOwner && (user.email !== person.email) && (selected !== person.email) && (
                  <button
                    className="text-xs -my-px ml-3 px-3 py-1 rounded-sm border border-plum-500 text-plum-500"
                    onClick={e => {
                      setConfirmedToDelete(false)
                      setSelected(person.email)
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
            {selected === person.email && (
              <tr className="border-b border-bluegray-200">
                <td colSpan="5" className="p-3 text-center">
                  <DeleteForm
                    person={person}
                    confirmed={confirmedToDelete}
                    setConfirmed={setConfirmedToDelete}
                    handleCancel={() => setSelected(null)}
                    handleDelete={deleteUser}
                  />
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
      <pre>
        {/* {JSON.stringify(user, null, 2)} */}
      </pre>
    </div>
  )
}

export default Users

function DeleteForm({ person, confirmed, setConfirmed, handleCancel, handleDelete }) {
  return (
    <div className="flex items-center justify-center text-sm">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="rounded-sm focus:outline-none border-plum-400 text-plum-500"
          onChange={e => {
            setConfirmed(e.target.checked)
          }}
        />
        <span className="ml-2 text-plum-500">
          Confirmed
        </span>
      </label>
      <button
        className="text-xs ml-3 px-3 py-1 focus:outline-none rounded-sm border border-plum-500 text-plum-500"
        onClick={handleCancel}
      >
        Cancel
      </button>
      {!confirmed && <button
        disabled
        className="text-xs ml-3 px-3 py-1 rounded-sm border border-transparent bg-plum-400 text-white"
      >
        Delete
      </button>}
      {confirmed && <button
        value={person._id}
        onClick={handleDelete}
        className="text-xs ml-3 px-3 py-1 focus:outline-none rounded-sm border border-transparent bg-plum-500 text-white"
      >
        Delete
      </button>}
    </div>
  )
}