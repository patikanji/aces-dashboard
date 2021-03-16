import { useProject } from "hooks"

const LatestProject = () => {
  const { project, isLoading, isError } = useProject()

  if (isLoading) return <></>

  return (
    <div className="bg-white rounded border border-plum-400 p-5 pt-1 mt-10 mb-10">
      <div className="text-center -mt-4">
        <span className="inline-block px-3 py-1 bg-plum-500 text-sm text-white">
          Latest Project
        </span>
      </div>
      <div className="">
        <p>{project.title}</p>
        <pre>
          {/* {JSON.stringify(project, null, 2)} */}
        </pre>
      </div>
    </div>
  )
}

export default LatestProject