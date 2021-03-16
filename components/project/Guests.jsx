import { ButtonLink } from "components/ButtonLink"
import { SVGGuest, SVGGear } from "components/svg/Icons"
import fetchJson from "lib/fetchJson"
import { useEffect, useState } from "react"

const { useGuests } = require("hooks")

export const Guests = ({ user, project }) => {
  const { guests, isLoading, isError, mutate } = useGuests(project._id)

  const [clientArray, setClientArray] = useState([])
  const [expertArray, setExpertArray] = useState([])

  useEffect(() => {
    if (guests) {
      const clients = [], experts = []
      guests.forEach(g => {
        if (g.type == 'client') clients.push(g)
        else experts.push(g)
      })

      setClientArray(clients)
      setExpertArray(experts)
    }
  }, [guests])

  if (isLoading) return <PageLoading />

  if (guests.length === 0) return <ProjectHasNoGuest user={user} project={project} />

  return (
    <>
      <div className="mb-10">
        <ProjectGuests
          user={user}
          project={project}
          guests={clientArray}
          type="client"
          title="Client Guests"
          button="Add Client Access"
          mutate={mutate}
        />
      </div>
      <div className="mb-10">
        <ProjectGuests
          user={user}
          project={project}
          guests={expertArray}
          type="expert"
          title="Expert Guests"
          button="Add Expert Access"
          mutate={mutate}
        />
      </div>
    </>
  )
}

const PageLoading = () => {
  function Fake() {
    return (
      <div className="rounded bg-gray-50 border border-gray-400 border-opacity-25">
        <div className="flex items-start px-3 py-2">
          <SVGGuest className="w-5 h-5 mr-2 text-gray-300"/>
          <div className="flex-grow text-gray-300 text-sm font-semibold">
            Guest Name
          </div>
          <button
            disabled
            className="-mr-1 text-gray-300 hover:text-gray-500"
          ><SVGGear className="w-4 h-4"/></button>
        </div>
        <div className="relative h-28 rounded-b overflow-hidden"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center border-b pb-3 mb-5">
        <div className="flex-grow font-bold pt-2">Client Guests</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        <Fake /><Fake /><Fake />
      </div>
      <div className="flex items-center border-b pb-3 mb-5">
        <div className="flex-grow font-bold pt-2">Client Guests</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <Fake /><Fake /><Fake />
      </div>
    </>
  )
}

const ProjectGuests = ({ user, project, guests, type, title, button, mutate }) => {
  const isAdmin = user.username === project.admin
  return (
    <>
      <div className="flex items-center border-b pb-3 mb-5">
        <div className="flex-grow font-bold pt-2">{title}</div>
        <div className="">
          {isAdmin && <ButtonLink label={button} href={`/projects/${project._id}/add-guest?type=${type}`} />}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {guests.map(g => (
          <GuestCard
            key={g._id}
            isAdmin={isAdmin}
            guest={g}
            mutate={mutate}
          />
        ))}
      </div>
    </>
  )
}

const GuestCard = ({ isAdmin, guest, notifyDelete, mutate }) => {
  const eid = 'G' + guest._id
  const progress = 'P' + guest._id

  const [submitting, setSubmitting] = useState(false)
  const [resetRs, setResetRs] = useState(null)

  async function handleDelete(e) {
    setSubmitting(true)

    const url = '/api/post?q=delete-guest'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: guest._id }),
    })

    if (response) {
      mutate()
    }
  }

  async function handleDisable(state = 'disable') {
    setSubmitting(true)
    console.log('state:', state)

    let url = '/api/post?q=disable-guest'
    if (state == 'enable') {
      url += '&enable=1'
    }

    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: guest._id }),
    })

    if (response) {
      mutate()
    }

    setSubmitting(false)
    const elm = document.getElementById(eid)
    elm.classList.remove('editing')
  }

  async function handleReset(e) {
    setSubmitting(true)

    let url = '/api/post?q=reset-guest-password'
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: guest._id }),
    })

    if (response) {
      mutate()
      setResetRs(response)
    }
  }

  return (
    <div className="rounded bg-gray-50 border border-bluegray-400 border-opacity-50 shadow-sm">
      <div className="flex items-start px-3 py-2">
        <SVGGuest className={`w-5 h-5 mr-2 text-` + (guest.disabled ? 'gray-300' : (guest.type == 'client' ? 'blue-400' : 'pink-700'))}/>
        <div className="flex-grow text-gray-600 text-sm font-semibold">
          {guest.fullname}
        </div>
        <button
          onClick={e => {
            if (!isAdmin) return false
            if (!submitting) {
              const elm = document.getElementById(eid)
              if (elm.classList.contains('editing')) {
                elm.classList.remove('editing')
              } else {
                elm.classList.add('editing')
              }
            } else {
              setSubmitting(false)
              setResetRs(null)
            }
          }}
          className="-mr-1 text-gray-300 hover:text-gray-500"
        >
          <SVGGear className="w-4 h-4"/>
        </button>
      </div>

      <div className="relative h-28 rounded-b overflow-hidden">

        <div className="absolute w-full h-28 border-t border-bluegray-200 text-sm pl-10 pr-3 pt-2 bg-white">
          <div className="text-xss text-gray-500 leading-none uppercase">Email</div>
          <div className="text-blue-400 leading-snug mb-2">{guest.email}</div>
          <div className="text-xss text-gray-500 leading-none uppercase">Phone</div>
          <div className="text-blue-400 leading-snug mb-2">{guest.phone}</div>
          <div className="text-xs text-gray-400">
            {guest.disabled && <span className="inline-block text-xss leading-none rounded-full bg-gray-200 px-2 py-1">DISABLED</span>}
            {!guest.disabled && <span className="inline-block text-xss text-white uppercase leading-none rounded-full bg-gray-400 px-2 py-1">Active</span>}
          </div>
        </div>

        <div id={eid} className="absolute -top-32 w-full h-28 flex items-center justify-center border-t border-gray-300 text-sm bg-gray-200">
          {resetRs && <div className="w-48 flex flex-col text-gray-700 leading-snug">
            <p className="text-xss uppercase">Username</p>
            <p className="text-sm font-semibold">{resetRs?.email}</p>
            <p className="text-xss uppercase mt-2">Password</p>
            <p className="text-sm font-semibold font-mono">{resetRs?.password}</p>
          </div>}
          {/* Buttons */}
          {!resetRs && <div className="grid grid-cols-2 gap-2 w-36">
            {!guest.disabled && <button
              value={guest._id}
              onClick={handleDisable}
              className="rounded text-xs leading-4 bg-gray-50 hover:bg-white border border-gray-400 hover:border-gray-400 shadow-sm px-2 py-1"
            >Disable
            </button>}
            {guest.disabled && <button
              value={guest._id}
              onClick={e => handleDisable('enable')}
              className="rounded text-xs leading-4 bg-gray-50 hover:bg-white border border-gray-400 hover:border-gray-400 shadow-sm px-2 py-1"
            >Activate
            </button>}
            <button
              value={guest._id}
              onClick={handleDelete}
              className="rounded text-xs leading-4 bg-gray-50 hover:bg-white border border-gray-400 hover:border-gray-400 shadow-sm px-2 py-1"
            >Delete
            </button>
            <button
              value={guest._id}
              onClick={handleReset}
              className="rounded text-xs leading-4 bg-gray-50 hover:bg-white border border-gray-400 hover:border-gray-400 shadow-sm px-2 py-1 col-span-2"
            >Reset Password
            </button>
            <div className="pt-1 col-span-2">
              <div id={progress} className={(submitting ? 'submitting ' : '') + `h-2 rounded-full border border-gray-400`}></div>
            </div>
          </div>}
        </div>
      </div>
      <style jsx>{`
      #${eid} {
        transition: all .25s ease;
      }
      #${eid}.editing {
        top: 0;
        transition: all .25s ease;
      }
      #${progress}.submitting {
        background-image: url(/mango-in-progress-01.gif);
      }
      `}</style>
    </div>
  )
}

const ProjectHasNoGuest = ({ user, project }) => {
  return (
    <div className="bg-white rounded-md border border-indigo-300 mt-6s p-5 pt-1">
      <svg className="block mx-auto -mt-7 mb-4" width="46" height="48" viewBox="0 0 46 48" xmlns="http://www.w3.org/2000/svg"><title>Metrics Icon</title><defs><linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="keEiTSa"><stop stopColor="#AC8ECE" offset="0%"></stop><stop stopColor="#79589F" offset="100%"></stop></linearGradient></defs><g fill="none" fillRule="evenodd"><path d="M3.705 9.439L19.296.937a7.797 7.797 0 017.41 0l15.592 8.502C44.588 10.69 46 12.998 46 15.498v17.005c0 2.497-1.411 4.807-3.702 6.059l-15.591 8.5a7.783 7.783 0 01-7.41 0l-15.592-8.5C1.411 37.31 0 35 0 32.502V15.499c0-2.5 1.411-4.808 3.705-6.06z" fill="url(#keEiTSa)"></path><path d="M4.663 11.195C3.003 12.1 2 13.74 2 15.498v17.005c0 1.756 1.004 3.398 2.662 4.303l15.592 8.5a5.783 5.783 0 005.495 0l15.59-8.5C42.996 35.902 44 34.26 44 32.504V15.498c0-1.758-1.003-3.398-2.66-4.303L25.75 2.693a5.797 5.797 0 00-5.496 0L4.663 11.194z" fill="#F5F2F8"></path><path d="M30.531 23.941H27.26c-.34 0-.64.242-.735.593l-.604 1.698-1.58-8.407c-.072-.38-.381-.654-.752-.658-.357 0-.669.266-.747.642l-1.33 10.49-1.952-13.108c-.056-.37-.339-.655-.688-.687-.342-.037-.674.189-.79.544l-1.85 8.898h-2.25c-.423 0-.765.367-.765.822 0 .453.342.82.765.82h2.792c.325 0 .613-.22.722-.55l1.028-6.393 2.107 14.144a.79.79 0 00.755.69c.358 0 .668-.264.748-.642l1.417-10.906 1.488 7.915c.07.37.367.64.72.656.34.035.667-.229.767-.591l1.31-4.328h2.657a1.716 1.716 0 10.04-1.642z" fill="#79589F"></path></g></svg>
      <div className="text-lg text-center text-indigo-600 mb-6">
        Tentang Project Guests (Client & Expert)
      </div>
      <div className="max-w-lg mx-auto text-center text-sm text-bluegray-500 mb-6">
        Magna fames tempor iaculis facilisis interdum dictum mi et mattis,
        blandit lacus mollis aenean finibus imperdiet placerat ligula nulla,
        taciti in vestibulum dignissim sagittis ridiculus curae convallis amet.
      </div>
      <div className="flex items-center justify-center mb-6">
        <ButtonLink label="Add Client Access" href={`/projects/${project._id}/add-guest?type=client`} margin="mr-4" />
        <ButtonLink label="Add Expert Access" href={`/projects/${project._id}/add-guest?type=expert`} margin="mr-4" />
      </div>
    </div>
  )
}

