import { WebLayout } from "components/layouts/WebLayout"
import LoginForm from "components/LoginForm"
import { ROUTES } from "config/routes"
import { useRouter } from "next/router"

function useRedirectToAfterLogin() {
  const { next } = useRouter().query

  if (!next) {
    return undefined
  }

  return decodeURIComponent(next)
}

const LoginPage = () => {
  const router = useRouter()
  const redirectTo = useRedirectToAfterLogin()

  const handleSuccess = () => {
    router.push(redirectTo ?? ROUTES.Dashboard)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white border-t-8 border-plum-600 py-10">
      <div className="rounded-md border-4 border-plum-200 border-opacity-50">
        <div className="rounded border border-plum-300 hover:border-plum-400 shadow-sm p-5">
        <LoginForm onSuccess={handleSuccess} />
        </div>
      </div>
      <div className="text-xs text-gray-400 font-mono mt-2 mb-24">
        sam6875 sum5d5b grab2ef
      </div>
    </div>
  )
}

LoginPage.suppressFirstRenderFlicker= false
LoginPage.getLayout = (page) => <WebLayout>{page}</WebLayout>
LoginPage.redirectAuthenticatedTo = ROUTES.Dashboard

export default LoginPage