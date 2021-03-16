import { SWRConfig } from 'swr'
import { WithAuthRedirect } from 'components/with-auth-redirect'
import { WithSkeletonLoader } from 'components/WithSkeletonLoader'
import fetchJson from 'lib/fetchJson'
import { pick } from 'lib/utils'

import 'lib/globals.css'

function MyApp({ Component, pageProps }) {
  const skeletonLoader = Component.skeletonLoader
  const getLayout = Component.getLayout || ((page) => page)

  const authRedirect = pick(
    Component,
    'redirectAuthenticatedTo',
    'redirectUnAuthenticatedTo',
    'suppressFirstRenderFlicker',
  )

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <WithAuthRedirect {...authRedirect}>
        <WithSkeletonLoader skeletonLoader={skeletonLoader}>
          {getLayout(<Component {...pageProps} />)}
        </WithSkeletonLoader>
      </WithAuthRedirect>
    </SWRConfig>
  )
}

export default MyApp
