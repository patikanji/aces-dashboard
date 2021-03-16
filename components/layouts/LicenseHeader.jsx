import { API_ROUTES, ROUTES } from "config/routes";
import { useLicense } from "hooks";
import useUser from "hooks/useUser";
import fetchJson from "lib/fetchJson";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { ACESGray } from "./ACESIcon";

export function LicenseHeader({ isLoading }) {
  const { user, mutateUser } = useUser()
  const { license, isLoading: licenseLoading  } = useLicense()
  const router = useRouter()
  const path = router.pathname

  const handleLogout = async (e) => {
    e.preventDefault()

    await mutateUser(fetchJson(API_ROUTES.Logout, { method: 'POST' }))

    router.push(ROUTES.Home)
  }

  const navigation = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'License', href: '/license' },
    { label: 'Users', href: '/users' },
    { label: 'Clients', href: '/clients' },
    { label: 'Billing', href: '/billing' },
  ]

  const normal = "block pt-1 pb-1 border-b-4 border-transparent hover:border-plum-500 text-bluegray-500 hover:text-plum-600"
  const active = "block pt-1 pb-1 text-bluegray-700 border-b-4 border-bluegray-400 hover:text-plum-600"

  return (
    <>
      <div className="aces-wrap bg-white border-b border-bluegray-300">
        <div className="aces-geist py-3">
          <div className="flex h-7 items-center">
            <div className="flex mr-3 border-r- border-bluegray-300">
              <Link href="/">
                <a className="inline-block">
                  <ACESGray className="h-6" />
                </a>
              </Link>
            </div>
            <div className="flex flex-grow">
              <div className="inline-flex items-center text-gray-800 hover:text-gray-600">
                {/* <div className="rounded-full bg-gray-200 w-7 h-7 mr-2">
                  &nbsp;
                </div> */}
                <span className="text-sm text-bluegray-600">
                  By Gaia Solutions
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div className="hidden sm:block text-plum-600">
                {(isLoading || licenseLoading) && <>&bull; &bull; &bull;</>}
                {user && user.fullname}
              </div>
              {/* <div className="flex mx-2">
                <button className="w-6 h-6 rounded hover:bg-bluegray-200 text-bluegray-600 hover:text-indigo-700">
                  <svg className="h-4 fill-current" viewBox="0 0 28 28" width="100%" height="100%"><path fillRule="evenodd" d="M24.136 12.042c-.503 0-1.006-.201-1.207-.703l-.604-1.506c-.201-.402-.1-1.105.201-1.507l.805-.803c.402-.402.402-.904 0-1.305l-1.308-1.306c-.402-.402-.906-.402-1.308 0l-.805.803c-.402.402-1.006.503-1.51.201l-1.509-.602c-.603-.201-.804-.804-.804-1.306V2.904A.9.9 0 0015.18 2h-2.113c-.503 0-1.006.402-1.006.904v1.104c0 .502-.201 1.005-.705 1.205l-1.509.603c-.402.2-1.107.1-1.51-.2l-.804-.804c-.402-.402-.906-.402-1.308 0L4.918 6.117c-.403.402-.403.904 0 1.306l.805.803c.402.402.503 1.004.201 1.506l-.604 1.506c-.2.603-.805.804-1.308.804H2.906a.9.9 0 00-.906.904v2.209a.9.9 0 00.906.904h1.106c.503 0 1.007.2 1.208.703l.603 1.506c.202.401.101 1.104-.2 1.506l-.806.803c-.402.402-.402.904 0 1.306l1.308 1.305c.403.402.906.402 1.308 0l.805-.803c.403-.402 1.006-.502 1.51-.2l1.509.602c.503.2.704.703.704 1.205v1.104a.9.9 0 00.906.904h2.213a.9.9 0 00.906-.904v-1.004c0-.502.201-1.004.704-1.205l1.51-.602c.402-.201 1.106-.1 1.509.2l.805.804c.402.401.905.401 1.308 0l1.308-1.306c.402-.401.402-.904 0-1.305l-.805-.804c-.403-.401-.503-1.004-.201-1.506l.603-1.506c.1-.502.705-.703 1.208-.703h1.107a.9.9 0 00.905-.904v-2.209c.201-.602-.201-1.004-.704-1.004h-1.107zM14 20.036c-3.292 0-6.036-2.744-6.036-6.036 0-3.292 2.744-6.036 6.036-6.036 3.292 0 6.036 2.744 6.036 6.036 0 3.292-2.744 6.036-6.036 6.036z"></path></svg>
                </button>
              </div> */}
              <div className="text-xs text-gray-600 leading-4 ml-4">
                <Link href={API_ROUTES.Logout}>
                  <a
                    onClick={handleLogout}
                    className="inline-flex rounded-sm border border-plum-400 hover:border-plum-600 hover:bg-plum-600 text-plum-600 font-medium hover:text-white px-2 py-1"
                  >
                    Logout
                  </a>
                </Link>
                {/* <div className="inline-flex rounded-sm bg-bluegray-100 hover:bg-plum-600 hover:text-white px-2 py-1">
                  Logout
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="aces-wrap bg-white">
        <div className="aces-geist py-8">
          <div className="flex justify-center sm:justify-start">
            <div className="">
            <div className="flex flex-row items-center justify-center">
                  <div className="flex-0 mr-4 sm:mr-5 -ml-8 sm:-ml-1">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-bluegray-100 shadow-sm">
                      {license?.logoUrl && (
                        <img
                          src={license?.logoUrl ?? user?.licenseLogo}
                          width='100%'
                          height='100%'
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain rounded-full"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-0 md:flex-grow">
                    {(isLoading || licenseLoading) && (
                      <>
                      <div className="text-xs text-bluegray-400 leading-tight uppercase">
                        ACES License Type
                      </div>
                      <div className="license-name text-2xl sm:text-3xl lg:text-4xl text-bluegray-500 leading-snug tracking-tight">
                        License Name
                      </div>
                      <div className="text-xs text-gray-800 mt-1">
                        2020-02-22
                      </div>
                      </>
                    )}
                    {license && (
                      <>
                        <div className="text-xs text-gray-600 leading-tight uppercase">
                          Aces {license.type} License
                        </div>
                        <div className="license-name text-2xl sm:text-3xl lg:text-4xl text-gray-800 leading-snug tracking-tight">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-plum-700 to-plum-500">
                            {license.licenseName}
                          </span>
                        </div>
                        <div className="text-xs text-gray-800 mt-1">
                        {license.expiryDate}
                        </div>
                      </>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/* License menu */}
      <div className="aces-wrap bg-white border-b border-bluegray-300">
        <div className="aces-geist -mb-px">
          <ul className="flex items-center justify-center sm:justify-start text-sm text-bluegray-500">
          {navigation.map(({ label, href }, index) => (
            <li key={href} className={index ? 'ml-6 sm:ml-8 lg:ml-8' : ''}>
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
    </>
  )
}