import Head from "next/head"
import { useRouter } from "next/router"
import { Hero } from "./Hero"

export const ProjectHasNoPersona = ({ user, project }) => {
  const title = "Project Has No Persona"
  const router = useRouter()
  const { pid } = router.query

  return (
    <>
      <Head>
        <title>ACES - {title}</title>
      </Head>
      <div className="aces-wrap mt-14s">
        <div className="aces-geist pb-20">
          <Hero title={title} project={project} />
          <pre>
            {JSON.stringify(project, null, 2)}
          </pre>
        </div>
      </div>
    </>
  )
}