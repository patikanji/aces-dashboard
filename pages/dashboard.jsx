import { IsLoading } from "components/IsLoading";
import { LicenseLayout } from "components/layouts/LicenseLayout";
import { HasNoProject } from "components/license/HasNoProject";
import Projects from "components/license/Projects";
import { ROUTES } from "config/routes";
import { useLicense } from "hooks";
import useUser from "hooks/useUser";
import Head from "next/head";

const DashboardPage = () => {
  const { user } = useUser()
  const { license, isLoading, isError } = useLicense()

  if (isLoading || isError) return <IsLoading />

  if (license.projects === 0) return <HasNoProject user={user} />

  return (
    <>
      <Head>
        <title>ACES Dashboard</title>
      </Head>
      <div className="aces-wrap mt-4">
        <div className="aces-geist pb-20">
          <Projects />
        </div>
      </div>
    </>
  )
}

DashboardPage.suppressFirstRenderFlicker = true
DashboardPage.redirectUnAuthenticatedTo = ROUTES.Login
DashboardPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
DashboardPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
);

export default DashboardPage