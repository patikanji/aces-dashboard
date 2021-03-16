export const Hero = ({ title, project, isIndex, isLoading }) => {
  return (
    <div className="py-8 sm:py-9 md:py-10 text-center sm:text-left">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-bluegray-700 font-medium">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-bluegray-800 to-bluegray-400">
          {isIndex && <>{isLoading ? 'Project Title' : project.shortTitle}</>}
          {!isIndex && <>{title}</>}
        </span>
      </h1>
      <div className="text-sms">
        <div className="text-indigo-500 font-medium">
          {isIndex && <>{isLoading ? 'Company Name' : project.client.name}</>}
          {!isIndex && <>{isLoading ? 'Project Title' : project.title}</>}
        </div>
        <div className="text-sm text-bluegray-600 mb-2">
          {isIndex && <span className="font-semibold">{isLoading ? 'Admin' : 'Admin: ' + project.adminInfo.fullname}</span>}
          {!isIndex && <>{isLoading ? 'Company Name' : project.client.name}</>}
        </div>
      </div>
    </div>
  )
}