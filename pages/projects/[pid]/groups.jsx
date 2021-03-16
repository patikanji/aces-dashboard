import { ButtonLink } from "components/ButtonLink";
import ProjectLayout from "components/layouts/ProjectLayout";
import { Hero } from "components/project/Hero";
import { ROUTES } from "config/routes";
import { useProject } from "hooks";
import useUser from "hooks/useUser";
import Head from "next/head";
import { useRouter } from "next/router";

const GroupsPage = () => {
  const title = "Groups & Modules"
  const router = useRouter()
  const { pid } = router.query
  const { user } = useUser()
  const { project, isLoading, isError } = useProject(pid)

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
          <Hero title={title} project={project} />
          {project.groups.length === 0 && <HasNoGroup project={project} />}
          <pre>
            {JSON.stringify(project, null, 2)}
          </pre>
        </div>
      </div>
    </>
  )
}

GroupsPage.suppressFirstRenderFlicker = true
GroupsPage.redirectUnAuthenticatedTo = ROUTES.Login
GroupsPage.getLayout = (page) => <ProjectLayout>{page}</ProjectLayout>
GroupsPage.skeletonLoader = (
  <ProjectLayout isLoading>
    <>Loading...</>
  </ProjectLayout>
);

export default GroupsPage

const HasNoGroup = ({ user, project }) => {
  return (
    <div className="bg-white rounded-md border border-indigo-300 mt-6s p-5 pt-1">
      <svg className="block mx-auto -mt-7 mb-4" width="46" height="48" viewBox="0 0 46 48" xmlns="http://www.w3.org/2000/svg"><title>Metrics Icon</title><defs><linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="keEiTSa"><stop stopColor="#AC8ECE" offset="0%"></stop><stop stopColor="#79589F" offset="100%"></stop></linearGradient></defs><g fill="none" fillRule="evenodd"><path d="M3.705 9.439L19.296.937a7.797 7.797 0 017.41 0l15.592 8.502C44.588 10.69 46 12.998 46 15.498v17.005c0 2.497-1.411 4.807-3.702 6.059l-15.591 8.5a7.783 7.783 0 01-7.41 0l-15.592-8.5C1.411 37.31 0 35 0 32.502V15.499c0-2.5 1.411-4.808 3.705-6.06z" fill="url(#keEiTSa)"></path><path d="M4.663 11.195C3.003 12.1 2 13.74 2 15.498v17.005c0 1.756 1.004 3.398 2.662 4.303l15.592 8.5a5.783 5.783 0 005.495 0l15.59-8.5C42.996 35.902 44 34.26 44 32.504V15.498c0-1.758-1.003-3.398-2.66-4.303L25.75 2.693a5.797 5.797 0 00-5.496 0L4.663 11.194z" fill="#F5F2F8"></path><path d="M30.531 23.941H27.26c-.34 0-.64.242-.735.593l-.604 1.698-1.58-8.407c-.072-.38-.381-.654-.752-.658-.357 0-.669.266-.747.642l-1.33 10.49-1.952-13.108c-.056-.37-.339-.655-.688-.687-.342-.037-.674.189-.79.544l-1.85 8.898h-2.25c-.423 0-.765.367-.765.822 0 .453.342.82.765.82h2.792c.325 0 .613-.22.722-.55l1.028-6.393 2.107 14.144a.79.79 0 00.755.69c.358 0 .668-.264.748-.642l1.417-10.906 1.488 7.915c.07.37.367.64.72.656.34.035.667-.229.767-.591l1.31-4.328h2.657a1.716 1.716 0 10.04-1.642z" fill="#79589F"></path></g></svg>
      <div className="text-xl text-center text-indigo-600 font-medium mb-6">
        Proyek ini belum memiliki grup dan module.
      </div>
      <div className="max-w-lg mx-auto text-center text-sm text-bluegray-500 mb-6">
        Magna fames tempor iaculis facilisis interdum dictum mi et mattis,
        blandit lacus mollis aenean finibus imperdiet placerat ligula nulla,
        taciti in vestibulum dignissim sagittis ridiculus curae convallis amet.
      </div>
      <div className="flex items-center justify-center mb-6">
        <ButtonLink label="Create Project Group" href={`/projects/${project._id}/create-group`} margin="" />
      </div>
    </div>
  )
}