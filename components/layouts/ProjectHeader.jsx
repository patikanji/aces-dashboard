import { API_ROUTES, ROUTES } from "config/routes"
import { useLicense } from "hooks"
import useUser from "hooks/useUser"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/router"
import { ACESGray } from "./ACESIcon"
import { useEffect } from "react"
import fetchJson from "lib/fetchJson"

const ProjectHeader = ({ isLoading }) => {
  const { user, mutateUser } = useUser()
  const { license, isLoading: licenseLoading  } = useLicense()
  const router = useRouter()
  const { pid } = router.query
  const path = router.asPath

  useEffect(() => {
    const h = document.getElementById("page-nav").clientHeight
    document.getElementById("page-nav-pad").style.height = h + 'px'
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()

    await mutateUser(fetchJson(API_ROUTES.Logout, { method: 'POST' }))

    router.push(ROUTES.Home)
  }

  const navigation = [
    { label: 'Overview', href: `/projects/${pid}` },
    { label: 'Groups', href: `/projects/${pid}/groups` },
    { label: 'Persona', href: `/projects/${pid}/persona` },
    { label: 'Guests', href: `/projects/${pid}/guests` },
    { label: 'Schedules', href: `/projects/${pid}/schedules` },
  ]

  // const normal = "block pt-1 pb-2 border-b-4 border-transparent hover:border-indigo-200 text-bluegray-500 hover:text-indigo-500"
  // const active = "block pt-1 pb-2 text-indigo-600 border-b-4 border-indigo-500 hover:text-indigo-600"
  const normal = "block pt-1 pb-2 border-b-4 border-transparent hover:border-bluegray-200 text-bluegray-500 hover:text-emerald-600"
  const active = "block pt-1 pb-2 text-emerald-600 border-b-4 border-emerald-500 hover:text-emerald-600"

  return (
    <>
      <div id="page-nav" className="bg-white shadow-sms border-b border-bluegray-200 fixed w-full top-0 left-0 z-50">
        <div className="aces-wrap">
          <div className="aces-geist py-3">
            <div className="flex h-7 items-center">
              <div className="flex mr-3 pr-3 sm:border-r border-bluegray-300">
                <Link href="/">
                  <a className="inline-block">
                    <ACESGray className="h-6" />
                  </a>
                </Link>
              </div>
              <div className="flex flex-grow justify-center sm:justify-start text-sm text-bluegray-800">
                <Link href="/dashboard">
                  <a className="inline-flex items-center hover:text-bluegray-600">
                    <div className="rounded-full bg-gray-100 w-7 h-7 mr-2">
                      {(user?.licenseLogo || license?.logoUrl ) && <Image
                        src={license?.logoUrl ?? user?.licenseLogo}
                        width={28}
                        height={28}
                        className="object-contain rounded-full w-7 h-7"
                      />}
                    </div>
                    <span className="font-medium">
                      {user?.licenseName}
                    </span>
                  </a>
                </Link>
              </div>
              <div className="flex items-center text-xs">
                <div className="hidden sm:block text-bluegray-600 font-semibold">
                  {user && user.fullname}
                </div>
                <div className="text-xs text-gray-600s leading-4 ml-4">
                  <Link href={API_ROUTES.Logout}>
                    <a
                      onClick={handleLogout}
                      className="inline-flex rounded-sm border border-bluegray-200 hover:border-bluegray-600 hover:bg-bluegray-600 text-bluegray-500 font-medium hover:text-white px-2 py-1"
                    >
                      Logout
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="aces-wrap bg-white border-b border-bluegray-300"> */}
          <div className="aces-geist -mb-px">
            <ul className="flex items-center justify-center sm:justify-start text-sm text-bluegray-500">
            {navigation.map(({ label, href }, index) => (
              <li key={href} className={index ? 'pt-1 ml-4 sm:ml-6 md:ml-8 lg:ml-9' : 'pt-1'}>
                <Link href={href}>
                  <a className={href === path ? active : normal}>
                    <div className="">
                      {label}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
      <div id="page-nav-pad" className=""></div>
    </>
  )
}

export default ProjectHeader