import { IsLoading } from "components/IsLoading";
import { LicenseLayout } from "components/layouts/LicenseLayout";
import Clients from "components/license/Clients";
import { HasNoClient } from "components/license/HasNoClient";
import { ROUTES } from "config/routes";
import { useClients } from "hooks";
import useUser from "hooks/useUser";
import Head from "next/head";

const ClientsPage = () => {
  const { user } = useUser()
  const { clients, isLoading, isError } = useClients()

  if (isLoading) return <IsLoading />
  if (clients.length === 0) return <HasNoClient user={user} />

  return (
    <>
      <Head>
        <title>Experimental Layout</title>
      </Head>
      <div className="aces-wrap mt-7">
        <div className="aces-geist pb-20">
          <Clients user={user} clients={clients} />
        </div>
      </div>
    </>
  )
}

ClientsPage.suppressFirstRenderFlicker = true
ClientsPage.redirectUnAuthenticatedTo = ROUTES.Login
ClientsPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
ClientsPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
);

export default ClientsPage