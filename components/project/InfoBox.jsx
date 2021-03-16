import { IsLoading } from "components/IsLoading"
import { useUsers } from "hooks"
import fetchJson from "lib/fetchJson"
import { createIDDate } from "lib/utils"
import { useEffect, useRef, useState } from "react"
import { mutate } from "swr"

export const InfoBox = ({ user, project }) => {
  const { users, isLoading, isError } = useUsers()

  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [model, setModel] = useState(project)

  useEffect(() => {
    setModel(project)
  }, [project])

  const isAdmin = user.username === project.admin
  const titleRef = useRef(null)

  if (isLoading) return <IsLoading />

  function enableEdit() {
    setEditing(true)
    if (isAdmin && titleRef) {
      titleRef.current.disabled = false
      titleRef.current.focus()
    }
  }

  async function updateProjectInfo(e) {
    setSubmitting(true)
    const body = { _id: project._id, packet: {} }
    const fields = [ 'title', 'shortTitle', 'description', 'startDate', 'endDate', 'admin' ]
    fields.forEach(f => {
      if (model[f] !== project[f]) {
        body.packet[f] = model[f]
      }
    })

    const response = await fetchJson('/api/post?q=update-project-info', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.message === 'OK') {
      mutate('/api/get?q=get-project&pid=' + project._id)
      setEditing(false)
      setSubmitting(false)
    }
  }

  const inputClass = "block w-full text-sm text-bluegray-600 rounded-sm border border-indigo-200 focus:bg-white focus:border-indigo-300 focus:ring focus:ring-indigo-100 focus:ring-opacity-50 px-2 py-1"

  return (
    <div className="border border-indigo-300 bg-white shadow-sms px-3 py-2">
      <div className="flex mb-4">
        <h3 className="text-indigo-400 font-bold mr-3">Project Info</h3>
        <div className={'flex-grow ' + (editing ? 'text-right' : '')}>
        {(!editing && (isAdmin || user.licenseOwner)) && <button
          onClick={enableEdit}
          className="text-xs text-pink-500 hover:text-pink-600"
        >Edit</button>}
        {editing && <button
          onClick={e => {
            setEditing(false)
            setModel(project)
          }}
          className="text-xs text-pink-500 hover:text-pink-600"
        >Cancel</button>}
        </div>
      </div>

      <FGroup label="Nomor" field={model._id} editing={false} />
      <FGroup label="Judul lengkap" field={model.title} editing={editing}>
        <div className={editing ? '' : 'hidden'}>
          <input
            type="text"
            ref={titleRef}
            id='projectTitle'
            value={model.title}
            disabled={!isAdmin}
            className={inputClass}
            onChange={e => setModel(m => ({...m, title: e.target.value}))}
          />
        </div>
      </FGroup>
      <FGroup label="Judul pendek" field={model.shortTitle} editing={editing}>
        <div className={editing ? '' : 'hidden'}>
          <input
            type="text"
            ref={titleRef}
            id='projectTitle'
            value={model.shortTitle}
            disabled={!isAdmin}
            className={inputClass}
            onChange={e => setModel(m => ({...m, shortTitle: e.target.value}))}
          />
        </div>
      </FGroup>
      <FGroup label="Deskripsi" field={model.description} editing={editing} truncate={false}>
        {editing && <div>
          <textarea
            className={inputClass}
            rows="3"
            disabled={!isAdmin}
            value={model.description}
            onChange={e => setModel(m => ({...m, description: e.target.value}))}
          ></textarea>
        </div>}
      </FGroup>
      <FGroup label="Tanggal mulai" field={createIDDate(model.startDate).tanggal} editing={editing}>
        {editing && <div>
          <input
          type="date"
          value={model.startDate}
          disabled={!isAdmin}
          placeholder="yyyy-mm-dd"
          className={inputClass}
          onChange={e => setModel(m => ({...m, startDate: e.target.value}))}
        />
        </div>}
      </FGroup>
      <FGroup label="Tanggal selesai" field={createIDDate(model.endDate).tanggal} editing={editing}>
        {editing && <div>
          <input
          type="date"
          value={model.endDate}
          disabled={!isAdmin}
          placeholder="yyyy-mm-dd"
          className={inputClass}
          onChange={e => setModel(m => ({...m, endDate: e.target.value}))}
        />
        </div>}
      </FGroup>
      <FGroup label="Klien" field={model.client.name} editing={false} />
      <FGroup label="Admin" field={model.adminInfo.fullname} editing={editing}>
        {editing && <div>
          <select
          className={inputClass}
          disabled={!user.licenseOwner}
          defaultValue={model.admin}
          onChange={e => setModel(m => ({...m, admin: e.target.value}))}
          >
            {users.map(({ _id, username, fullname }) => (
              <option key={_id} value={username} >{fullname}</option>
            ))}
          </select>
        </div>}
      </FGroup>

      {editing && <div className="mt-4 mb-2">
        <button
          onClick={updateProjectInfo}
          className="w-full text-sm font-medium text-white rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none active:bg-indigo-500 h-8 py-0 px-4"
        >
          Update Project Info
        </button>
      </div>}
      <style jsx>{`

      select {
        background-position: right 0.25rem center;
      }
      `}</style>
    </div>
  )
}

const FGroup = ({ children, label, field, truncate = true, editing }) => {
  return (
    <div className="flex md:flex-col mb-3">
      <div className="w-32 flex-shrink-0">
        <div className="text-xs text-indigo-500 -font-medium uppercase py-1 md:pt-0">
          {label}
        </div>
      </div>
      <div className="flex-grow">
        {!editing && <div className={`rounded-sm bg-indigo-100 border border-transparent text-sm text-bluegray-600 px-2 py-1 ` + (truncate ? 'truncate' : '')}>
          {field}
        </div>}
        {children}
      </div>
    </div>
  )
}