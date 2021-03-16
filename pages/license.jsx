import Head from 'next/head'
import { LicenseLayout } from 'components/layouts/LicenseLayout';
import { ROUTES } from 'config/routes';
import License from 'components/license/License';
import useUser from 'hooks/useUser';
import { useLicense } from 'hooks';
import { IsLoading } from 'components/IsLoading';

const LicensePage = () => {
  const { user } = useUser()
  const { license, isLoading, isError, mutate } = useLicense()

  if (isLoading) return <IsLoading />

  return (
    <>
      <Head>
        <title>
          License Info - {license.licenseName}
        </title>
      </Head>
      <div className="aces-wrap mt-7">
        <div className="aces-geist mb-32">
          <License user={user} license={license} mutate={mutate} />
        </div>
      </div>
    </>
  )
}

LicensePage.suppressFirstRenderFlicker = false;
LicensePage.redirectUnAuthenticatedTo = ROUTES.Login
LicensePage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
LicensePage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
)

export default LicensePage