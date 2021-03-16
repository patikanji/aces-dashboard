import { ButtonLink } from "components/ButtonLink"
import { ButtonLinkHollow } from "components/ButtonLinkHollow"
import { IsLoading } from "components/IsLoading"
import { Select } from "components/Select"
import { usePersona, usePersonae } from "hooks"
import fetchJson from "lib/fetchJson"
import { useEffect, useRef, useState } from "react"

export const Personae = ({ user, project }) => {
  const { personae, isLoading, isError, mutate: mutatePersonae } = usePersonae(project._id)

  const [dfPersona, setDfPersona] = useState([])
  const [filter, setFilter] = useState('')
  const [options, setOptions] = useState([])
  const [viewStack, setViewStack] = useState([])
  const [personToDelete, setPersonToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [projectGroups, setProjectGroups] = useState({})

  useEffect(() => {
    const array = [{ label: 'All Groups', value: ''}]
    const model = {}
    project.groups.forEach(({ _id, groupName, modules }) => {
      model[_id] = { groupName: groupName, tests: [], sims: [], modules: {} }
      array.push({
        label: groupName,
        value: _id,
      })

      modules.forEach(({ metaId, method, moduleName }) => {
        model[_id].modules[metaId] = moduleName
        if (method === 'selftest') {
          model[_id].tests.push(metaId)
        }
        else {
          model[_id].sims.push(metaId)
        }
      })
    })

    setProjectGroups(model)
    setOptions(array)
  }, [project])

  useEffect(() => {
    if (personae) {
      setDfPersona(personae)
    }
  }, [personae])

  if (isLoading) return <IsLoading />

  async function deletePersona() {
    setDeleting(true)
    const body = { id: personToDelete._id}
    const response = await fetchJson('/api/post?q=delete-persona', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (response) {
      setDfPersona(personae.filter(p => p._id !== body.id))
      mutatePersonae()
      setDeleting(false)
      setPersonToDelete(null)
      document.body.classList.remove('has-modal')
      document.getElementById('modal-overlay').classList.add('hidden')
    }

  }

  return (
    <>
      <div className="flex items-center mb-5">
        <div className="flex flex-grow">
          <Select options={options}
            onChange={e => setFilter(e.target.value)}
          />
          <div className="h-8 mx-3 flex items-center rounded bg-indigo-100 text-indigo-500">
            <span className="h-8 flex items-center px-2 rounded-l bg-indigo-200 text-sm font-medium">
              {dfPersona.filter(p => p.group.includes(filter)).length}
            </span>
            <span className="text-sm pl-2 pr-3">Peserta</span>
          </div>
        </div>
        {user.username === project.admin && (
          <div>
            <ButtonLinkHollow label="Add Persona" href={`/projects/${project._id}/persona?task=add`} />
            <ButtonLink margin="ml-3" label="Import CSV" href={`/projects/${project._id}/persona?task=import`} />
          </div>
        )}
      </div>
      {/*  */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-indigo-500 border-b border-indigo-200 font-medium">
            <td className="bg-indigo-100 bg-opacity-75 w-10 rounded-tl text-center p-2">#</td>
            <td className="bg-indigo-100 bg-opacity-75 p-2 border-l border-indigo-300 border-opacity-25">Full Name</td>
            <td className="bg-indigo-100 bg-opacity-75 w-14 p-2 border-l border-indigo-300 border-opacity-25 text-center">Tests</td>
            <td className="bg-indigo-100 bg-opacity-75 w-14 p-2 border-l border-indigo-300 border-opacity-25 text-center">Sims</td>
            <td className="bg-indigo-100 bg-opacity-75 w-16 rounded-tr p-2 border-l border-indigo-300 border-opacity-25">Report</td>
          </tr>
        </thead>
        {dfPersona.filter(p => p.group.includes(filter)).map((person, index) => (
          <tbody key={person._id}>
            {!viewStack.includes(person._id) && (
              <NormalRow
                person={person}
                index={index}
                setViewStack={setViewStack}
              />
            )}
            {viewStack.includes(person._id) && (
              <ExpandedRow
                person={person}
                index={index}
                viewStack={viewStack}
                setViewStack={setViewStack}
                groupsModel={projectGroups}
                setPersonToDelete={setPersonToDelete}
                mutate={mutatePersonae}
              />
            )}
          </tbody>
        ))}
      </table>
      <pre>
        {/* {JSON.stringify(project, null, 2)} */}
      </pre>
      <div
        id="modal-overlay"
        className="hidden bg-white bg-opacity-25 fixed w-full min-h-screen top-0 left-0"
      >
        <div className="max-w-lg mx-auto flex items-center justify-center min-h-screen px-6">
          <div className="w-full bg-white rounded-md border border-bluegray-200 shadow-xl p-4 overflow-hidden">
            {personToDelete !== null && (
              <>
                <div className="flex items-center bg-bluegray-200 text-whites font-medium -mt-4 -mx-4 pl-4 pr-2 py-2">
                  <div className="flex-grow">
                    Delete {personToDelete.fullname}?
                  </div>
                  <button
                    onClick={e => {
                    setPersonToDelete(null)
                    document.body.classList.remove('has-modal')
                    document.getElementById('modal-overlay').classList.add('hidden')
                  }}
                    className="w-5 h-5 ml-5"
                  >
                    <svg className="fill-current" viewBox="0 0 16 16" width="100%" height="100%"><path fill-rule="evenodd" d="M6.663 8.01l-3.362 3.362a.955.955 0 00-.005 1.352.953.953 0 001.352-.005L8.01 9.357l3.362 3.362a.955.955 0 001.352.005.953.953 0 00-.005-1.352L9.357 8.01l3.362-3.362a.955.955 0 00.005-1.352.953.953 0 00-1.352.005L8.01 6.663 4.648 3.301a.955.955 0 00-1.352-.005.953.953 0 00.005 1.352L6.663 8.01z"></path></svg>
                  </button>
                </div>
                <div className="text-center py-10">
                  {!deleting && <button
                    onClick={deletePersona}
                    className="inline-flex items-center text-sm font-medium text-white rounded bg-bluegray-500 hover:bg-bluegray-600 focus:outline-none active:bg-bluegray-500 h-8 py-0 px-4"
                  >
                    Yes, Delete
                  </button>}
                  {deleting && (
                    <div className="flex items-center h-8 px-8">
                      <div
                      style={{
                        width: '100%',
                        height: '2px',
                        backgroundImage: 'url(/mango-in-progress-01.gif)'
                      }}
                      ></div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
      #modal-overlay {
        z-index: 9999;
      }
      `}</style>
    </>
  )
}

const NormalRow = ({ person, index, setViewStack }) => {
  return (
    <>
      <tr
        onClick={e => {
          setViewStack(vs => ([...vs, person._id]))
        }}
        className="cursor-pointer border-b border-indigo-200 border-opacity-50 hover:bg-indigo-50 hover:bg-opacity-50"
      >
        <td className="p-2 text-center">{index +1}</td>
        <td className="p-2 border-l border-gray-100 border-opacity-50">
          {person.fullname}
        </td>
        <td className="p-2 border-l border-gray-100 border-opacity-50 text-center font-medium">
          <span className="text-gray-600">{person._tests}</span>
          <span className="mx-1 text-gray-400">:</span>
          <span className="text-indigo-400">{person._testsPerformed}</span>
        </td>
        <td className="p-2 border-l border-gray-100 border-opacity-50 text-center font-medium">
          <span className="text-gray-600">{person._sims}</span>
          <span className="mx-1 text-gray-400">:</span>
          <span className="text-indigo-400">{person._simsPerformed}</span>
        </td>
        <td className="p-2 border-l border-gray-100 border-opacity-50 text-center">-</td>
      </tr>
    </>
  )
}

const ExpandedRow = ({ person, index, viewStack, setViewStack, groupsModel, setPersonToDelete, mutate }) => {

  function collapseAndMutate() {
    mutate()
    setViewStack(viewStack.filter(item => item !== person._id))
  }

  return (
    <>
      <tr
        className="border-b border-indigo-200 border-opacity-50 bg-indigo-50 bg-opacity-75 hover:bg-opacity-100"
      >
        <td className="p-2 text-center">{index +1}</td>
        <td
          onClick={e => setViewStack(viewStack.filter(item => item !== person._id))}
          className="cursor-pointer p-2 border-l border-gray-100 border-opacity-50 text-bluegray-700"
        >
          {person.fullname}
        </td>
        <td colSpan="3" className="p-2 py-1 text-right border-l border-gray-100 border-opacity-50 text-bluegray-700">
          <button
            onClick={e => {
              setPersonToDelete(person)
              document.body.classList.add('has-modal')
              document.getElementById('modal-overlay').classList.remove('hidden')
            }}
            className="text-xs bg-white rounded border border-indigo-300 text-indigo-500 inline-flex items-center h-6 px-3 ml-2"
          >
            Delete
          </button>
        </td>
      </tr>
      <tr className="bg-indigo-50 bg-opacity-25 border-b border-indigo-100">
        <td></td>
        <td colSpan="4" className="p-2 pr-4">
          <DetailPersona person={person} groupsModel={groupsModel} cb={collapseAndMutate} />
        </td>
      </tr>
    </>
  )
}

function createPersonaModel(person) {
  return {
    _id: person._id,
    fullname: person.fullname,
    group: person.group,
    email: "",
    gender: "",
    birth: "",
    phone: "",
    nip: "",
    position: "",
    currentLevel: "",
    targetLevel: "",
    tests: [],
    sims: [],
  }
}

const DetailPersona = ({ person, groupsModel, cb }) => {
  const { persona, isLoading, isError, mutate: mutatePersona } = usePersona(person._id)

  const firstInput = useRef(null)

  const [model, setModel] = useState(createPersonaModel(person))
  const [editing, setEditing] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (persona) {
      setModel(persona)
    }
  }, [persona])

  function getEditedFields() {
    const body = { _id: person._id, packet: {} }
    const fields = [
      'fullname',
      'group',
      'email',
      'gender',
      'birth',
      'phone',
      'nip',
      'position',
      'currentLevel',
      'targetLevel',
    ]
    fields.forEach(f => {
      if (model[f] !== persona[f]) {
        body.packet[f] = model[f]
      }
    })

    if (model.tests.sort().toString() !== persona.tests.sort().toString()) {
      body.packet.tests = model.tests
    }
    if (model.sims.sort().toString() !== persona.sims.sort().toString()) {
      body.packet.sims = model.sims
    }

    return body
  }

  async function updatePersona() {
    const body = getEditedFields()
    console.log(body)
    const response = await fetchJson('/api/post?q=update-persona', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (response) {
      console.log('response', response)
      mutatePersona()
      cb()
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Nama lengkap:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  ref={firstInput}
                  disabled
                  value={isLoading ? '' : model.fullname}
                  onChange={e => {
                    setModel(m => ({...m, fullname: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Jenis kelamin:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.gender}
                  onChange={e => {
                    setModel(m => ({...m, gender: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Tanggal lahir:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.birth}
                  onChange={e => {
                    setModel(m => ({...m, birth: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Email:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.email}
                  onChange={e => {
                    setModel(m => ({...m, email: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Telepon:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.phone}
                  onChange={e => {
                    setModel(m => ({...m, phone: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">NIP / NIK:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.nip}
                  onChange={e => {
                    setModel(m => ({...m, nip: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Jabatan:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.position}
                  onChange={e => {
                    setModel(m => ({...m, position: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Level sekarang:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.currentLevel}
                  onChange={e => {
                    setModel(m => ({...m, currentLevel: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
            <tr>
              <td className="w-28 text-plum-600 whitespace-nowrap p-1 pl-0">Level target:</td>
              <td className="text-bluegray-800 font-medium p-1">
                <input
                  type="text"
                  disabled={!editing}
                  value={isLoading ? '' : model.targetLevel}
                  onChange={e => {
                    setModel(m => ({...m, targetLevel: e.target.value}))
                    setDirty(true)
                  }}
                  className="w-full text-xs px-2 py-1 rounded border border-plum-300 focus:ring focus:ring-plum-200 focus:border-plum-400"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full text-xs mt-2">
        <tbody>
          <tr className="border-t">
            <td className="w-28 text-plum-600 whitespace-nowrap p-2 pl-0">Grup:</td>
            <td className="text-bluegray-800 font-medium p-2">
              <select
              disabled={!editing}
              defaultValue={model.group}
              onChange={e => {
                    setModel(m => ({...m, group: e.target.value}))
                    setDirty(true)
                  }}
              className="text-xs rounded border border-plum-400 border-opacity-75 hover:border-opacity-60 hover:border-plum-500 shadow-sm hover:shadow focus:border-plum-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-2 pr-5 py-1"
              >
                {Object.keys(groupsModel).map((key) => (
                  <option key={key} value={key}>{groupsModel[key].groupName}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr className="border-t">
            <td className="w-28 text-plum-600 whitespace-nowrap p-2 pl-0">Online Tests:</td>
            <td className="text-bluegray-800 font-medium p-2">
              {/* {tests.map(t => ( */}
              {groupsModel[model.group].tests.map(t => (
                <label className="inline-flex items-center mr-3">
                  <input
                  type="checkbox"
                  disabled={!editing}
                  checked={model.tests.includes(t)}
                  value={t}
                  onChange={e => {
                    const val = e.target.value
                    if (e.target.checked) {
                      if (!model.tests.includes(val)) {
                        setModel(m => ({
                          ...m,
                          tests: [...m.tests, val]
                        }))
                      }
                    } else {
                      setModel(m => ({
                        ...m,
                        tests: [...m.tests.filter(item => item !== val)]
                      }))
                    }
                    setDirty(true)
                  }}
                  className="rounded text-plum-500" />
                  <span className="ml-1">{groupsModel[model.group]['modules'][t]}</span>
                </label>
              ))}
            </td>
          </tr>
          <tr className="border-t">
            <td className="w-28 text-plum-600 whitespace-nowrap p-2 pl-0">Online Tests:</td>
            <td className="text-bluegray-800 font-medium p-2">
              {groupsModel[model.group].sims.map(t => (
                <label className="inline-flex items-center mr-3">
                  <input
                  type="checkbox"
                  disabled={!editing}
                  checked={model.sims.includes(t)}
                  value={t}
                  onChange={e => {
                    const val = e.target.value
                    if (e.target.checked) {
                      if (!model.sims.includes(val)) {
                        setModel(m => ({
                          ...m,
                          sims: [...m.sims, val]
                        }))
                      }
                    } else {
                      setModel(m => ({
                        ...m,
                        sims: [...m.sims.filter(item => item !== val)]
                      }))
                    }
                    setDirty(true)
                  }}
                  className="rounded text-plum-500" />
                  <span className="ml-1">{groupsModel[model.group]['modules'][t]}</span>
                </label>
              ))}
            </td>
          </tr>
          <tr className="border-t">
            <td className="w-28 p-2 pl-0">
              <label className="flex items-center h-6">
                <input
                  type="checkbox"
                  onChange={e => {
                    setEditing(e.target.checked)
                    if (e.target.checked) {
                      firstInput.current.disabled = false
                      firstInput.current.focus()
                    } else {
                      firstInput.current.disabled = true
                      setModel(persona)
                      setDirty(false)
                    }
                  }}
                  className="rounded-sm border-plum-300 text-plum-500 focus:ring focus:ring-plum-200"
                />
                <span className="ml-2">Edit</span>
              </label>
            </td>
            <td className="text-plum-600 whitespace-nowrap p-2 pl-0">
              {editing && !dirty && <button disabled
                className="inline-flex items-center h-6 px-4 rounded bg-plum-500 bg-opacity-75 text-white"
              >
                Save
              </button>}
              {editing && dirty && <button
                onClick={updatePersona}
                className={'focus:outline-none bg-plum-500 text-white rounded hover focus:ring focus:ring-plum-200 inline-flex items-center h-6 px-4'}
              >
                Save
              </button>}
            </td>
          </tr>
        </tbody>
      </table>
      <pre>
        {/* {JSON.stringify(groupsModel, null, 2)} */}
      </pre>
      <style jsx>{`
      input:disabled, select:disabled {
        border-color: rgba(215, 206, 232, 0.5)
      }
      select {
        background-position: right .25rem center;
        padding-right: 1.75rem;
      }
      `}</style>
    </>
  )
}