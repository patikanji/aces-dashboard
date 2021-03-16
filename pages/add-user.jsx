import { LicenseLayout } from "components/layouts/LicenseLayout"
import { NewUser } from "components/license/NewUser"
import { ROUTES } from "config/routes"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"

const NewUserPage = () => {
  const { user } = useUser()
  const router = useRouter()

  if (!user.licenseOwner) {
    router.push(ROUTES.Dashboard)
  }

  return (
    <>
      <Head>
        <title>New User</title>
      </Head>
      <div className="aces-wrap mt-4">
        <div className="aces-geist pb-20">
          <NewUser user={user} />
        </div>
      </div>
    </>
  )
}

NewUserPage.suppressFirstRenderFlicker = true
NewUserPage.redirectUnAuthenticatedTo = ROUTES.Login
NewUserPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
NewUserPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
);

export default NewUserPage