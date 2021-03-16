import ProjectLayout from "components/layouts/ProjectLayout";
import { Hero } from "components/project/Hero";
import { ROUTES } from "config/routes";
import { useProject } from "hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";
import { Project } from "components/project/Project";

const OverviewPage = () => {
  const title = "Overview"
  const router = useRouter()
  const { pid } = router.query
  const { user } = useUser()
  const { project, isLoading, isError } = useProject(pid)

  if (isLoading) return null

  if (isError) return null

  return (
    <>
      <Head>
        <title>Experimental Layout</title>
      </Head>
      <div className="aces-wrap bg-bluegray-50 bg-opacity-75 border-b border-bluegray-200">
        <div className="aces-geist">
          <Hero isIndex project={project} />
        </div>
      </div>
      <div className="aces-wrap bg-white">
        <div className="aces-geist pb-32">
          <Project user={user} project={project} />
          <pre>
            {/* {JSON.stringify(project, null, 2)} */}
          </pre>
        </div>
      </div>
    </>
  )
}

OverviewPage.suppressFirstRenderFlicker = true
OverviewPage.redirectUnAuthenticatedTo = ROUTES.Login
OverviewPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
OverviewPage.skeletonLoader = (
  <ProjectLayout isLoading>
    <>Loading...</>
  </ProjectLayout>
);

export default OverviewPage