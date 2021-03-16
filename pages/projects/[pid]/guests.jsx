import ProjectLayout from "components/layouts/ProjectLayout"
import { Guests } from "components/project/Guests"
import { Hero } from "components/project/Hero"
import { ROUTES } from "config/routes"
import { useProject } from "hooks"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"

const GuestsPage = () => {
  const title = "Client & Expert Guests"
  const router = useRouter()
  const { pid, task } = router.query
  const { user } = useUser()
  const { project, isLoading, isError } = useProject(pid, "simple")

  if (isLoading) return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="aces-wrap">
        <div className="aces-geist pb-20">
          <Hero title={title} isLoading />
        </div>
      </div>
    </>
  )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="aces-wrap">
        <div className="aces-geist pb-20">
          <Hero title={title} project={project} />
          <Guests user={user} project={project} />
        </div>
      </div>
    </>
  )
}

GuestsPage.suppressFirstRenderFlicker = true
GuestsPage.redirectUnAuthenticatedTo = ROUTES.Login
GuestsPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
GuestsPage.skeletonLoader = (
  <ProjectLayout isLoading>
    <>Loading...</>
  </ProjectLayout>
);

export default GuestsPage