import ProjectLayout from "components/layouts/ProjectLayout"
import { GroupSetup } from "components/project/GroupSetup"
import { Hero } from "components/project/Hero"
import { ROUTES } from "config/routes"
import { useProject } from "hooks"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const createGroup = (project) => {
  return {
    _id: null,
    pid: project._id,
    license: project.license,
    groupName: '',
    accessCode: '',
    openAt: null,
    closeAt: null,
    modules: [],
    createdBy: project.admin,
    createdAt: null,
  }
}

const CreateGroupPage = () => {
  const title = "Create Project Group"
  const router = useRouter()
  const { pid } = router.query
  const { user } = useUser()
  const { project, isLoading, isError } = useProject(pid)

  const [model, setModel] = useState(null)

  useEffect(() => {
    if (project) {
      setModel(createGroup(project))
    }
  }, [project])

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
        <title>ACES - {title}</title>
      </Head>
      <div className="aces-wrap mt-14s">
        <div className="aces-geist pb-20">
          <GroupSetup user={user} project={project} group={createGroup(project)} />
          <pre>
            {/* {JSON.stringify(model, null, 2)} */}
          </pre>
        </div>
      </div>
    </>
  )
}

CreateGroupPage.suppressFirstRenderFlicker = true
CreateGroupPage.redirectUnAuthenticatedTo = ROUTES.Login
CreateGroupPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
CreateGroupPage.skeletonLoader = (
  <ProjectLayout isLoading>
    <>Loading...</>
  </ProjectLayout>
);

export default CreateGroupPage