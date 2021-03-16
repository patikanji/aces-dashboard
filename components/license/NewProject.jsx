import { Button } from "components/Buttons"
import { IsLoading } from "components/IsLoading"
import { ROUTES } from "config/routes"
import { useClients } from "hooks"
import fetchJson from "lib/fetchJson"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

export const NewProject = ({ user }) => {
  const router = useRouter()
  const { clients, isLoading, isError } = useClients()

  const clientNameRef = useRef(null)
  const checkboxRef = useRef(null)

  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [client, setClient] = useState('new')
  const [model, setModel] = useState({
    title: '',
    license: '',
    shortTitle: '',
    description: '',
    startDate: '',
    endDate: '',

    clientId: '',
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientPhone: '',
  })

  if (isLoading) return <IsLoading />

  const tclass = "text-sm text-plum-600 font-medium"
  const dclass = "text-xs text-bluegray-500 mb-2"
  const inputClass = "w-full text-sm rounded border border-bluegray-300 focus:border-plum-400 focus:ring focus:ring-plum-200 px-3"

  function selectClient(e) {
    const val = e.target.value
    if (val === 'new') {
      setModel(m => ({
        ...m,
        clientId: '',
        clientName: '',
        clientAddress: '',
        clientCity: '',
        clientPhone: '',
      }))
      clientNameRef.current.focus()
    } else  {
      const selected =  clients.filter(item => item._id === val)[0]
      setModel(m => ({
        ...m,
        clientId: selected._id,
        clientName: selected.name,
        clientAddress: selected.address,
        clientCity: selected.city,
        clientPhone: selected.phone,
      }))
    }

    checkboxRef.current.checked = false
  }

  function setValue(e) {
    const field = e.target.name
    const value = e.target.value
    setModel(prev => ({
      ...prev,
      [field]: value
    }))
    setConfirmed(false)
    checkboxRef.current.checked = false
  }

  function isReady() {
    return model?.title && model?.shortTitle && (
      model?.clientId  || (model?.clientName && model?.clientCity)
    )
  }

  async function submitProject(e) {
    setSubmitting(true)

    const body = model
    console.log(body);
    // return


    const url = '/api/post?q=create-project'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })

    // Optimistic
    if (response) {
      // callback(response)
      console.log(response)
      router.push(`/projects/${response._id}`)
    }
  }

  if (submitting) return (
    <div className="rounded-md text-center border border-bluegray-300 p-8 mt-8 mb-20">
      Saving project ...
    </div>
  )

  return (
    <>
      <div className="rounded-md border border-bluegray-300 p-4 mt-8 mb-20">
        <div className="flex items-center -mx-4 px-4 pb-3 mb-8 border-b">
          <h3 className="flex-grow text-xl text-bluegray-400 font-semibold">
            Formulir Proyek ACES
          </h3>
          {!submitting && (
            <button
              className="text-xs -my-px ml-3 px-3 py-1 rounded border border-bluegray-300 hover:border-bluegray-400 text-plum-500"
              onClick={e => router.push(ROUTES.Dashboard)}
            >
              Cancel
            </button>
          )}
        </div>

        <FSection
          isTop
          title="Nama Proyek"
          description="Nama resmi proyek, harus diisi."
        >
          <input
            type="text"
            className={inputClass}
            name="title"
            onChange={setValue}
            onBlur={e => {
              if (model.title.length < 37) {
                setModel(m => ({ ...m, shortTitle: model.title}))
              } else {
                setModel(m => ({ ...m, shortTitle: model.title.substr(0, 30) + ' ...'}))
              }
            }}
          />
        </FSection>
        <FSection
          title="Nama Pendek"
          description="Diperlukan bila nama proyek lebih dari 36 karakter."
        >
          <input
            type="text"
            className={inputClass}
            maxLength="36"
            disabled={model.title.length < 37}
            value={model.shortTitle}
            onChange={e => setModel(m => ({ ...m, shortTitle: e.target.value}))}
          />
        </FSection>
        <FSection
          title="Deskripsi Proyek"
          description="Deskripsi singkat, dapat dipakai dalam laporan."
        >
          <input
            type="text"
            name="description"
            className={inputClass}
            value={model.description}
            onChange={setValue}
          />
        </FSection>
        <FSection
          title="Tanggal Mulai Kontrak"
          description="Tanggal mulai proyek sesuai kontrak."
        >
          <input
            type="date"
            name="startDate"
            className={inputClass}
            value={model.startDate}
            onChange={setValue}
          />
        </FSection>
        <FSection
          title="Tanggal Akhir Kontrak"
          description="Tanggal akhir proyek sesuai kontrak."
        >
          <input
            type="date"
            name="endDate"
            className={inputClass}
            value={model.endDate}
            onChange={setValue}
          />
        </FSection>
        <FSection
          title="Klien baru/lama"
          description="Untuk klien baru, nama dan kota harus diisi."
        >
          <select
            defaultValue={client}
            onChange={e => {
              setClient(e.target.value)
              selectClient(e)
            }}
            className="w-full text-sm text-bluegray-600 font-mediums rounded border-plum-300 hover:border-opacity-75 hover:border-plum-400 shadow-sm hover:shadow focus:border-plum-400 focus:ring focus:ring-plum-200 focus:ring-opacity-50 h-9 py-0 pl-3"
          >
            <option value="new">- Klien Baru -</option>
            {clients && clients.map(({ _id, name }) => (
              <option key={_id} value={_id}>{name}</option>
            ))}
          </select>
        </FSection>
        <FSection
          title="Nama Perusahaan/Lembaga"
          description="Nama perusahaan/organisai klien, harus diisi."
        >
          <input
            type="text"
            name="clientName"
            disabled={client !== 'new'}
            ref={clientNameRef}
            className={inputClass}
            value={model.clientName}
            onChange={setValue}
          />
        </FSection>
        <FSection
          title="Alamat"
          description="Alamat perusahaan/organisasi."
        >
          <input
            type="text"
            name="clientAddress"
            disabled={client !== 'new'}
            className={inputClass}
            value={model.clientAddress}
            onChange={setValue}
          />
        </FSection>
        <FSection
          title="Kota"
          description="Kota asal klien, harus diisi."
        >
          <input
            type="text"
            name="clientCity"
            disabled={client !== 'new'}
            className={inputClass}
            value={model.clientCity}
            onChange={setValue}
          />
        </FSection>
        <div className="flex flex-col sm:flex-row text-sm border-t border-bluegray-200 pt-5 mb-5">
          <div className="w-full sm:w-2/5 sm:mr-6">
            <div className="mr-12">

            </div>
          </div>
          <div className="w-full sm:w-3/5 text-center sm:text-left">
            <div className="mb-3">
              <label>
                <input
                  type="checkbox"
                  ref={checkboxRef}
                  disabled={!isReady()}
                  onChange={e => { setConfirmed(e.target.checked) }}
                  className="rounded text-plum-600"
                />
                <span className="ml-2">Siap menyimpan data proyek</span>
              </label>
            </div>
            {(!isReady() || !confirmed) && <Button label="Save New Project" disabled />}
            {isReady() && confirmed && <Button label="Save New Project" onClick={submitProject} />}
          </div>
        </div>
      </div>
      <pre>
        {/* {JSON.stringify(model, null, 2)} */}
      </pre>
      <style jsx>{`
      input:disabled {
        background-color: #fafafc;
      }
      `}</style>
    </>
  )
}

const FSection = ({ children, title, description, isTop }) => {
  const tclass = "text-sm text-plum-600 font-medium"
  const dclass = "text-xs text-bluegray-500 mb-2"

  return (
    <div className={'flex flex-col sm:flex-row text-sm mb-5 ' + (isTop ? '' : 'border-t border-bluegray-200 pt-5')}>
      <div className="w-full sm:w-2/5 sm:mr-6">
        <div className="mr-6 sm:mr-8">
          <div className={tclass}>{title}</div>
          <div className={dclass}>{description}</div>
        </div>
      </div>
      <div className="w-full sm:w-3/5">
        {children}
      </div>
    </div>
  )
}