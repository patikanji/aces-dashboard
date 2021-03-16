import { LicenseLayout } from "components/layouts/LicenseLayout"
import { NewProject } from "components/license/NewProject"
import { ROUTES } from "config/routes"
import { useLicense } from "hooks"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"

const NewProjectPage = () => {
  const { user } = useUser()
  const router = useRouter()

  if (!user.licenseOwner) {
    router.push(ROUTES.Dashboard)
  }

  return (
    <>
      <Head>
        <title>New ACES Project</title>
      </Head>
      <div className="aces-wrap mt-4">
        <div className="aces-geist pb-20">
          <NewProject user={user} />
        </div>
      </div>
    </>
  )
}

NewProjectPage.suppressFirstRenderFlicker = true
NewProjectPage.redirectUnAuthenticatedTo = ROUTES.Login
NewProjectPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
NewProjectPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
);

export default NewProjectPage