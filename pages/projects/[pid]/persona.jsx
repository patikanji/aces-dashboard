import ProjectLayout from "components/layouts/ProjectLayout";
import { AddPersona } from "components/project/AddPersona";
import { Hero } from "components/project/Hero";
import { ImportPersona } from "components/project/ImportPersona";
import { Personae } from "components/project/Personae";
import { ProjectHasNoGroup } from "components/project/ProjectHasNoGroup";
import { ProjectHasNoPersona } from "components/project/ProjectHasNoPersona";
import { ROUTES } from "config/routes";
import { useProject } from "hooks";
import useUser from "hooks/useUser";
import Head from "next/head";
import { useRouter } from "next/router";

const PersonaPage = () => {
  const title = "Daftar Peserta"
  const router = useRouter()
  const { pid, task } = router.query
  const { user } = useUser()
  const { project, isLoading, isError } = useProject(pid, "simple--")

  if (isLoading) return null

  if (task === 'add') return <AddPersona user={user} project={project} />

  if (task === 'import') return <ImportPersona user={user} project={project} />

  if (project.groups.length === 0) return <ProjectHasNoGroup user={user} project={project} />

  if (project.personae === 0) return <ProjectHasNoPersona user={user} project={project} />

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="aces-wrap">
        <div className="aces-geist pb-20">
          <Hero title={title} project={project} />
          <Personae user={user} project={project} />
        </div>
      </div>
    </>
  )
}

PersonaPage.suppressFirstRenderFlicker = true
PersonaPage.redirectUnAuthenticatedTo = ROUTES.Login
PersonaPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
PersonaPage.skeletonLoader = (
  <ProjectLayout isLoading bgColor="bg-bluegray-300">
    <>Loading...</>
  </ProjectLayout>
);

export default PersonaPage