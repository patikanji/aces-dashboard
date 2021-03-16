import { Button, ButtonHollow } from "components/Button"
import { ButtonLinkHollow } from "components/ButtonLinkHollow"
import { Select } from "components/Select"
import fetchJson from "lib/fetchJson"
import { GuestModel } from "lib/models"
import { useRouter } from "next/router"
import { useState } from "react"

function newModel(project, type = '') {
  let model = GuestModel
  model.projectId = project._id
  model.license = project.license
  if (type) model.type = type

  return model
}

export const AddGuest = ({ user, project, type }) => {
  const router = useRouter()

  const [model, setModel] = useState(newModel(project, type))
  const [submitting, setSubmitting] = useState(false)
  const [createdModel, setCreatedModel] = useState(null)

  async function handleSubmit(e) {
    setSubmitting(true)
    let body = model
    body.email = model.email.trim().toLowerCase()

    const url = '/api/post?q=create-guest'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.created) {
      console.log(response)
      setCreatedModel(response.created)
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-md border border-indigo-300 p-2 px-5">
        <div className="text-right mb-3 -mr-3">
          <button
            className="w-5 h-5 text-indigo-400 hover:text-indigo-600"
            onClick={e => router.push(`/projects/${project._id}/guests`)}
          >
            <svg className="fill-current" viewBox="0 0 16 16" width="100%" height="100%"><path fillRule="evenodd" d="M6.663 8.01l-3.362 3.362a.955.955 0 00-.005 1.352.953.953 0 001.352-.005L8.01 9.357l3.362 3.362a.955.955 0 001.352.005.953.953 0 00-.005-1.352L9.357 8.01l3.362-3.362a.955.955 0 00.005-1.352.953.953 0 00-1.352.005L8.01 6.663 4.648 3.301a.955.955 0 00-1.352-.005.953.953 0 00.005 1.352L6.663 8.01z"></path></svg>
          </button>
        </div>
        {createdModel && (
          <CreatedModel
            model={createdModel}
            handleMore={() => {
              setCreatedModel(null)
              setModel(newModel(project))
              setModel(m => ({ ...m, type: ''}))
            }}
          />
        )}
        {!createdModel && (
          <Form
            model={model}
            setModel={setModel}
            createdModel={createdModel}
            submitting={submitting}
            handleSubmit={handleSubmit}
          />
        )}

      </div>
    </>
  )
}

const Form = ({ model, setModel, submitting, handleSubmit }) => {
  const tdl = "w-32 p-2 pl-0 whitespace-nowrap"
  const input= "w-full text-sm px-2 py-1 rounded-sm border-bluegray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"

  return (
    <div className="max-w-lg mx-auto text-sm text-bluegray-500 mb-6">
      <p className="mb-4">
      Magna fames tempor iaculis facilisis interdum dictum mi et mattis,
      blandit lacus mollis aenean finibus imperdiet placerat ligula nulla,
      taciti in vestibulum dignis.
      </p>
      <table className="w-full">
        <tbody>
          <tr>
            <td className={tdl}>Client/Expert:</td>
            <td className="p-2">
              <Select
                options={[
                  { label: 'Client', value: 'client' },
                  { label: 'Expert', value: 'expert' }
                ]}
                defaultValue={model.type}
                disabled={model.type !== ''}
              />
            </td>
          </tr>
          <tr>
            <td className={tdl}>Nama Lengkap:</td>
            <td className="p-2">
              <input
                type="text"
                onChange={e => setModel(m => ({ ...m, fullname: e.target.value}))}
                className={input}
              />
            </td>
          </tr>
          <tr>
            <td className={tdl}>Email (username):</td>
            <td className="p-2">
              <input
                type="text"
                onChange={e => setModel(m => ({ ...m, email: e.target.value}))}
                className={input}
              />
            </td>
          </tr>
          <tr>
            <td className={tdl}>Nomor Telepon:</td>
            <td className="p-2">
              <input
                type="text"
                onChange={e => setModel(m => ({ ...m, phone: e.target.value}))}
                className={input}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="p-2 pl-0">
              <div className="h-1 rounded bg-white border-b border-white">
                {submitting && <div className="h-full" style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }}></div>}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-2">
              <Button
                label="Save New Guest"
                onClick={handleSubmit}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const CreatedModel = ({ model, handleMore }) => {
  const tdl = "w-32 p-2 pl-0 whitespace-nowrap"
  const span ="inline-flex w-full px-2 py-1 bg-bluegray-100"

  return (
    <div className="max-w-lg mx-auto text-sm text-bluegray-500 mb-6">
      <p className="mb-4">
      Magna fames tempor iaculis facilisis interdum dictum mi et mattis,
      blandit lacus mollis aenean finibus imperdiet placerat ligula nulla,
      taciti in vestibulum dignis.
      </p>
      <table className="w-full">
        <tbody>
          <tr>
            <td className={tdl}>Nama Lengkap:</td>
            <td className="p-2">
              <span className={span}>{model.fullname}</span>
            </td>
          </tr>
          <tr>
            <td className={tdl}>Email (username):</td>
            <td className="p-2">
              <span className={span}>{model.email}</span>
            </td>
          </tr>
          <tr>
            <td className={tdl}>Nomor Telepon:</td>
            <td className="p-2">
              <span className={span}>{model.phone}</span>
            </td>
          </tr>
          <tr>
            <td className={tdl}>Password:</td>
            <td className="p-2">
              <span className={span}>{model.password}</span>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="p-2 pl-0">
              <div className="h-1 rounded bg-white border-b border-white"></div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-2">
              <Button
                label="Create More"
                margin="mr-3"
                onClick={handleMore}
              />
              <ButtonLinkHollow
                label="Selesai"
                href={`/projects/${model.projectId}/guests`}
                margin="mr-3"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}