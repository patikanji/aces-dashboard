import ProjectLayout from "components/layouts/ProjectLayout"
import { AddGuest } from "components/project/AddGuest"
import { Guests } from "components/project/Guests"
import { Hero } from "components/project/Hero"
import { ROUTES } from "config/routes"
import { useProject } from "hooks"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"

const AddGuestPage = () => {
  const title = "Add Project Guest"
  const router = useRouter()
  const { pid, type } = router.query
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
          <AddGuest user={user} project={project} type={type} />
        </div>
      </div>
    </>
  )
}

AddGuestPage.suppressFirstRenderFlicker = true
AddGuestPage.redirectUnAuthenticatedTo = ROUTES.Login
AddGuestPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
AddGuestPage.skeletonLoader = (
  <ProjectLayout isLoading>
    <>Loading...</>
  </ProjectLayout>
);

export default AddGuestPage