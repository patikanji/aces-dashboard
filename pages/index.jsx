import Head from 'next/head'
import { WebLayout } from "components/layouts/WebLayout";
import Link from 'next/link';
import { ACESCapsPlum10 } from 'components/ACESLogo';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>ACES</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white border-t-8 border-plum-600 py-10 pb-32">
        <div className="w-80 flex justify-center bg-bluegray-100s p-3">
          <ACESCapsPlum10 />
        </div>

        <div className="w-80 mx-auto text-center">
          <Link href="/login">
            <a className="text-sms text-bluegray-400 hover:text-plum-500">Click to login.</a>
          </Link>
        </div>
      </div>
    </>
  )
}

HomePage.getLayout = (page) => <WebLayout>{page}</WebLayout>
HomePage.suppressFirstRenderFlicker = false;

export default HomePage