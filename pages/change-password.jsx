import useUser from 'hooks/useUser'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { useState } from 'react'
import fetchJson from 'lib/fetchJson'
import { ACESCapsPlum10 } from 'components/ACESLogo'
import { useRouter } from 'next/router'

const ChangePasswordPage = () => {
  const { user } = useUser()
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState('')
  const [changed, setChanged] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!user || user.isLoggedIn === false) return <>
    <Head>
      <meta name="robots" content="noindex"/>
    </Head>
    <DefaultErrorPage statusCode={404} />
  </>

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const body = {
      username: user.username,
      oldPassword: e.currentTarget.oldPassword.value,
      password1: e.currentTarget.password1.value,
      password2: e.currentTarget.password2.value,
    }


    try {
      const response = await fetchJson("/api/post?q=change-password", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log(response)
      setErrorMsg('')
      setChanged(true)
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
    setSubmitting(false)
  }

  const btn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  const input = "appearance-none bg-gray-100 border hover:border-blue-400 rounded w-full py-1 px-2 mt-1 text-xl focus:bg-white focus:text-black leading-tight focus:outline-none focus:border-blue-400"
  const inputBase = "w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
  const btnBase = "bg-plum-600 w-full py-2 font-bold text-gray-50 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 active:text-white active:bg-plum-700"


  return <>
    <Head>
      <title>ACES - Login</title>
    </Head>
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white border-t-8 border-plum-600 py-10">
      <div className="rounded-md border-4 border-plum-200 border-opacity-50">
        <div className="rounded border border-plum-300 hover:border-plum-400 shadow-sm p-5">
          <div className="w-64">
            <div className="flex justify-center mb-4">
              <ACESCapsPlum10 />
            </div>
            <p className="mb-5 text-lg text-center">
              Mengganti Password
            </p>
            {!changed && (
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                  <span className="text-sm text-bluegray-600">Password lama</span>
                  <input
                    type="password"
                    id="username"
                    name="oldPassword"
                    required
                    autoFocus
                    autoComplete="off"
                    className={inputBase}
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm text-bluegray-600">Password baru</span>
                  <input
                    type="password"
                    id="username"
                    name="password1"
                    required
                    autoComplete="off"
                    className={inputBase}
                  />
                </label>
                <label className="block text-sm mb-2">
                  <span className="text-sm text-bluegray-600">Sekali lagi password baru</span>
                  <input
                    type="password"
                    id="username"
                    name="password2"
                    required
                    autoComplete="off"
                    className={inputBase}
                  />
                </label>
                {errorMsg && <p className={submitting ? "text-sm text-gray-400 my-3" : "text-sm text-red-500 my-3"}>{errorMsg}</p>}

                <div className="h-4 flex items-center text-sm bg-gray-100s">
                  {errorMsg && !submitting && <p className="text-red-500">
                    ERROR {errorMsg}
                  </p>}
                  {submitting && <div
                    className="h-1 w-full rounded-full shadows"
                    style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }}
                  ></div>}
                  {!errorMsg && !submitting && <><hr className="w-full border-gray-300" /></>}
                </div>

                <div className="text-center mt-3 mb-4">
                  <button className={btnBase} type="submit">
                    Ganti Password
                  </button>
                </div>
              </form>
            )}
            {changed && (
              <div>
                <p className="text-lg text-center text-plum-600 font-semibold mt-10 mb-8">
                  Password berhasil diganti.
                </p>
                <p className="mb-6">
                  <button className={btnBase} onClick={e => router.push("/dashboard")}>
                    Selesai
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 font-mono mt-2 mb-24">
        sam6875 sum5d5b grab2ef
      </div>
    </div>
  </>
}

export default ChangePasswordPage

/*

<main className="min-h-screensss">
      <div className="bg-white px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto antialiased">
          <div className="max-w-sm mx-auto p-6 mb-24">
            <div className="rounded-lg bg-blue-200 bg-opacity-0 hover:bg-opacity-25 p-1 -m-1">
              <div className="bg-white shadow text-gray-700 antialiased rounded-md border border-gray-400 hover:border-blue-400 p-6 pt-4">
                <p className="text-xl leading-snugs font-semibold mt-1 mb-4">Form ganti password</p>
                <hr className="-mx-6 mb-6" />
                <div className="-fmwrap pt-1-">
                  {!changed && (<form onSubmit={handleSubmit}>
                    <label className="block text-sm mb-2">
                      <span className="text-red-400s">Password lama</span>
                      <input type="password" name="oldPassword" required autoFocus autoComplete="off" className={input} />
                    </label>
                    <label className="block text-sm mb-2">
                      <span className="text-red-400s">Password baru</span>
                      <input type="password" name="password1" required autoFocus autoComplete="off" className={input} />
                    </label>
                    <label className="block text-sm mb-2">
                      <span className="text-red-400s">Sekali lagi password baru</span>
                      <input type="password" name="password2" required autoFocus autoComplete="off" className={input} />
                    </label>
                    {errorMsg && <p className={submitting ? "text-sm text-gray-400 my-3" : "text-sm text-red-500 my-3"}>{errorMsg}</p>}
                    <div className="text-center mt-6">
                      <button className={btn} type="submit">
                        Ganti password
                      </button>
                    </div>
                  </form>)}
                  {!changed && (
                    <div>
                      <p className="text-lg text-green-500 font-bolds mt-10 mb-8">
                        Password berhasil diganti.
                      </p>
                      <p className="text-sm text-blue-500">
                        <a href={backUrl}>
                          Back to dashboard
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          </div>
          </div>
          <style jsx>{`
          .fmwrap {
            width: 280px;
            min-height: 265px;
          }
          `}</style>
        </main>

*/