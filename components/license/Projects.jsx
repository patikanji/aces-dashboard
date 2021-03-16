import { IsLoading } from "components/IsLoading"
import { SVGGuest } from "components/svg/Icons"
import useUser from "hooks/useUser"
import Link from "next/link"

const { useProjects } = require("hooks")

const Projects = () => {
  const { user } = useUser()
  const { projects, isLoading, isError } = useProjects()

  if (isLoading) return <IsLoading />

  return (
    <div className="">
      <table className="w-full text-sm mb-16">
        <thead>
          <tr className="text-plum-600 font-medium border-b border-bluegray-300">
            <td colSpan="2" className="p-3 pl-0 pb-1">Daftar Proyek</td>
            <td className="p-3 pr-0 text-right">
              {user.licenseOwner && (
                <Link href="/new-project">
                  <a className="inline-flex items-center whitespace-nowrap text-sm font-medium text-white rounded bg-plum-600 hover:bg-plum-700 focus:outline-none active:bg-plum-500 h-8 ml-3 py-0 px-4">
                    New Project
                  </a>
                </Link>
              )}
              {!user?.licenseOwner && <>Klien</>}
            </td>
          </tr>
        </thead>
        {projects && projects.map((project) => (
          <tbody key={project._id}>
            <tr className="border-b border-bluegray-200 text-bluegray-300 hover:text-indigo-400">
              <td className="w-6 p-3 pl-1 pr-0">
                <SVGGuest className="w-6 h-6 text-bluegray-300s" />
              </td>
              <td className="p-3">
                <Link href={`/projects/${project._id}`}>
                  <a className="text-indigo-500">
                    {project.title}
                  </a>
                </Link>
              </td>
              <td className="p-3 pr-0 text-right text-bluegray-500">
                {project.client.name}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default Projects