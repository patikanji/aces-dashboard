import { LicenseHeader } from './LicenseHeader'

export const LicenseLayout = ({ children, isLoading }) => {
  return (
    <div className="min-h-screen bg-bluegray-50 bg-opacity-50 bg-gradient-to-t from-white">
      <LicenseHeader isLoading={isLoading} />
      {children}
    </div>
  )
}