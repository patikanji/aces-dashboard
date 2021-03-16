import ProjectHeader from './ProjectHeader'

const ProjectLayout = ({ children, isLoading, bgColor }) => {

  return (
    <div className={`min-h-screen ` + (bgColor ? bgColor : 'bg-white')}>
      <ProjectHeader isLoading={isLoading} />
      {children}
    </div>
  )
}

export default ProjectLayout