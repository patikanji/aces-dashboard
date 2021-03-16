import { LicenseLayout } from "components/layouts/LicenseLayout";
import Users from "components/license/Users";
import { ROUTES } from "config/routes";
import useUser from "hooks/useUser";
import Head from "next/head";

const UsersPage = () => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>License Users</title>
      </Head>
      <div className="aces-wrap mt-5">
        <div className="aces-geist pb-20">
          <Users user={user}/>
        </div>
      </div>
    </>
  )
}

UsersPage.suppressFirstRenderFlicker = true
UsersPage.redirectUnAuthenticatedTo = ROUTES.Login
UsersPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
UsersPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>LicenseHeader Is Loading...</>
  </LicenseLayout>
);

export default UsersPage