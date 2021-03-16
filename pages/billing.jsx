import { LicenseLayout } from "components/layouts/LicenseLayout";
import { Billing } from "components/license/Billing";
import { ROUTES } from "config/routes";
import useUser from "hooks/useUser";
import Head from "next/head";

const BillingPage = () => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>
          Billing - {user.licenseName}
        </title>
      </Head>
      <Billing user={user} />
    </>
  )
}

BillingPage.suppressFirstRenderFlicker = true
BillingPage.redirectUnAuthenticatedTo = ROUTES.Login
BillingPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
BillingPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
);

export default BillingPage