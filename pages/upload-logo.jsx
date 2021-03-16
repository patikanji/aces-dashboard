import { LicenseLayout } from 'components/layouts/LicenseLayout';
import LogoUploader from 'components/license/LogoUploader';
import { ROUTES } from 'config/routes';
import useUser from 'hooks/useUser'
import Head from 'next/head';

const UploadLogoPage = () => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>
          Upload Logo - {user.licenseName}
        </title>
      </Head>
      <div className="aces-wrap mt-7">
        <div className="aces-geist mb-24">
          <LogoUploader user={user} />
        </div>
      </div>
    </>
  )
}

UploadLogoPage.suppressFirstRenderFlicker = false;
UploadLogoPage.redirectUnAuthenticatedTo = ROUTES.Login
UploadLogoPage.getLayout = (page) => <LicenseLayout>{page}</LicenseLayout>
UploadLogoPage.skeletonLoader = (
  <LicenseLayout isLoading>
    <>Loading...</>
  </LicenseLayout>
)

export default UploadLogoPage