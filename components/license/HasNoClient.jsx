import { ACESPlumSolid6 } from "components/ACESLogo"
import { LinkButton } from "components/LinkButtons"
import Head from "next/head"

export const HasNoClient = ({ user }) => {
  return (
    <>
      <Head>
        <title>
          Clients - {user.licenseName}
        </title>
      </Head>
      <div className="aces-wrap mt-14">
        <div className="aces-geist pb-20">
          <div className="bg-white rounded-md border border-plum-400 p-5 pt-1">
            <ACESPlumSolid6 className="-mt-8 mb-6" />
            <div className="text-lg md:text-xl text-center text-plum-600 mb-6">
              Belum ada data klien.
            </div>
            <div className="max-w-lg mx-auto text-center text-sm text-bluegray-500 mb-6">
              {user.licenseOwner && (
                <>
                  <p className="mb-4">
                    Data klien hanya dapat dibuat pada saat pembuatan proyek.
                  </p>
                  <p>
                    <LinkButton label="Cretae New Project" href="/new-project" />
                  </p>
                </>
              )}
              {!user.licenseOwner && (
                <>
                  <p className="mb-4">
                    Data klien hanya dapat dibuat pada saat pembuatan proyek.
                    Hanya <span className="text-indigo-500">admin </span>
                    <span className="text-plum-600 font-bold">{user.licenseName}</span> yang dapat membuat Proyek ACES.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}