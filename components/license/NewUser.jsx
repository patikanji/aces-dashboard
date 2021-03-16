import { ButtonHollow } from "components/Buttons"
import { Button } from "components/Buttons"
import { ROUTES } from "config/routes"
import fetchJson from "lib/fetchJson"
import { useRouter } from "next/router"
import { useState } from "react"

const createModel = (user) => {
  return {
    _id: null,
    license: user.license,
    fullname: '',
    username: '',
    email: '',
    licenseOwner: false,
    verified: false,
    disabled: false,
    gender: '',
    phone: '',
    roles: [],
    hashed_password: '',
    createdBy: user.username,
    createdAt: null,
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const NewUser = ({ user }) => {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  // const [viewState, setViewState] = useState(0)
  const [model, setModel] = useState(createModel(user))
  const [response, setResponse] = useState(null)

  const [nameMsg, setNameMsg] = useState(null)
  const [usernameMsg, setUsernameMsg] = useState(null)
  const [emailMsg, setEmailMsg] = useState(null)
  const [usernameTaken, setUsernameTaken] = useState(false)

  const inputClass = "w-full text-sm rounded border border-bluegray-300 focus:border-plum-400 focus:ring focus:ring-indigo-50 px-3"

  function isReady() {
    return model.fullname && model.fullname.length > 4 && model.username.length > 5 && validateEmail(model.email)
  }

  function reset() {
    setNameMsg(null)
    setUsernameMsg(null)
    setEmailMsg(null)
    setModel(createModel(user))
  }

  function more() {
    reset()
    // setViewState(0)
  }

  async function checkUsername(username) {
    // const url = `/api/get?q=check-username&find=${username}`
    const url = `/api/get?q=get-user&username=${username}`
    const response = await fetchJson(url)
    if (response._id) {
      setUsernameTaken('Sudah terpakai')
      setUsernameMsg('Sudah terpakai')
    }
    else {
      setUsernameTaken(null)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    setResponse(null)
    // setViewState(1)
    const url = '/api/post?q=create-user'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(model),
    })

    if (response.username && response.password) {
      // console
      setResponse(response)
      // setViewState(2)
    }

    reset()
  }

  if (response !== null) return <>
    <div className="rounded-md border border-bluegray-300 p-4 mt-8 mb-20-">
      <div className="w-96 mx-auto bg-gray-50s">
        <h3 className="text-xl text-center text-bluegray-600 font-semibold mb-4">
          Berhasil menyimpan data user baru
        </h3>
        <table className="mx-auto mb-6">
          <tbody>
            <tr className="bg-indigo-100">
              <td className="p-1 px-2">Nama:</td>
              <td className="p-1 px-2 bg-indigo-200 font-semibold">
                {response?.fullname ? response?.fullname : 'error'}
              </td>
            </tr>
            <tr><td colSpan="2"></td></tr>
            <tr className="bg-indigo-100">
              <td className="p-1 px-2">Username:</td>
              <td className="p-1 px-2 bg-indigo-200 font-semibold">
                {response?.username ? response?.username : 'error'}
              </td>
            </tr>
            <tr><td colSpan="2"></td></tr>
            <tr className="bg-indigo-100">
              <td className="p-1 px-2">Password:</td>
              <td className="p-1 px-2 bg-indigo-200 font-semibold">
                {response?.password ? response?.password : 'error'}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <Button label="Selesai" onClick={() => router.push(ROUTES.Users)} />
        </div>
      </div>
    </div>
  </>

  return (
    <>
      <div className="rounded-md border border-bluegray-300 p-4 mt-8 mb-20-">
        <div className="flex items-center -mx-4 px-4 pb-3 mb-8 border-b">
          <h3 className="flex-grow text-xl text-bluegray-400 font-semibold">
            Formulir User
          </h3>
          {!submitting && (
            <button
              className="text-xs -my-px ml-3 px-3 py-1 rounded border border-bluegray-300 hover:border-bluegray-400 text-plum-500"
              onClick={e => router.push(ROUTES.Users)}
            >
              Cancel
            </button>
          )}
        </div>

        <FSection
          isTop
          title="Nama Lengkap"
          description="Harus diisi."
          warning={nameMsg}
        >
          <input
            type="text"
            className={inputClass}
            disabled={submitting}
            onChange={e => {
              const val = e.target.value
              setModel(prev => ({ ...prev, fullname: val }))
            }}
            onBlur={e => {
              const v = e.target.value.trim()
              setModel(prev => ({ ...prev, fullname: v }))
              setNameMsg(v.length < 5 ? 'Minimal 5 karakter' : null)
            }}
          />
        </FSection>
        <FSection
          title="Username"
          description="Harus diisi."
          warning={usernameMsg}
        >
          <input
            type="text"
            className={inputClass}
            disabled={submitting}
            onChange={e => {
              const val = e.target.value
              setModel(prev => ({ ...prev, username: val }))
            }}
            onBlur={e => {
              const val = e.target.value
              const v = val.trim().toLocaleLowerCase()
              setModel(prev => ({ ...prev, username: v }))
              if (v.length < 6) setUsernameMsg('Minimal 6 karakter')
              else setUsernameMsg(null)

              checkUsername(v)
            }}
          />
        </FSection>
        <FSection
          title="Email"
          description="Harus diisi."
          warning={emailMsg}
        >
          <input
            type="text"
            className={inputClass}
            onChange={e => {
              const val = e.target.value.trim()
              setModel(prev => ({ ...prev, email: val.toLowerCase() }))
            }}
            onBlur={e => {
              const val = e.target.value.trim()
              setEmailMsg( validateEmail(val) ? null : 'Format email tidak valid.')
            }}
          />
        </FSection>
        <FSection
          title="Telepon / HP"
          description=""
        >
          <input
            type="text"
            className={inputClass}
            disabled={submitting}
            onChange={e => {
              const val = e.target.value.trim()
              setModel(prev => ({ ...prev, phone: val }))
            }}
          />
        </FSection>

        <div className="h-1 border-t border-bluegray-200 pt-px mb-3">
          {submitting && <div className="h-1 rounded border border-white" style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }} ></div>}
        </div>

        <div className="flex flex-col sm:flex-row text-sm  pt-5 mb-5">
          <div className="w-full sm:w-2/5 sm:mr-6"></div>
          <div className="w-full sm:w-3/5 text-center sm:text-left">
            {!isReady() && <Button label="Save New Project" disabled />}
            {isReady() && confirm && (
              <Button
                label="Save New Project"
                onClick={handleSubmit}
                disabled={submitting}
              />
            )}
          </div>
        </div>
      </div>
      <pre>
        RESPONSE {JSON.stringify(response, null, 2)}<br/>
        {JSON.stringify(model, null, 2)}
      </pre>
    </>
  )
}

const FSection = ({ children, title, description, warning, isTop }) => {
  const tclass = "text-sm text-plum-600 font-medium"
  const dclass = "text-xs text-bluegray-500 mb-2"
  const wclass = "text-xs text-pink-500 mb-2"

  return (
    <div className={'flex flex-col sm:flex-row text-sm mb-5 ' + (isTop ? '' : 'border-t border-bluegray-200 pt-5')}>
      <div className="w-full sm:w-2/5 sm:mr-6">
        <div className="mr-6 sm:mr-8">
          <div className={tclass}>{title}</div>
          {!warning && <div className={dclass}>{description}</div>}
          {warning && <div className={wclass}>{warning}</div>}
        </div>
      </div>
      <div className="w-full sm:w-3/5">
        {children}
      </div>
    </div>
  )
}