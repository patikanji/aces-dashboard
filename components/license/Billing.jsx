import { ACESPlumSolid6 } from "components/ACESLogo"

export const Billing = ({ user }) => {
  return (
    <>
      <div className="aces-wrap mt-14">
        <div className="aces-geist pb-20">
          <div className="bg-white rounded-md border border-plum-400 p-5 pt-1">
            <ACESPlumSolid6 className="-mt-8 mb-6" />
            <div className="text-lg md:text-xl text-center text-plum-600 mb-6">
              Maaf, ACES Billing belum tersedia online.
            </div>
            <div className="max-w-lg mx-auto text-center text-sm text-bluegray-500 mb-6">
              <p className="mb-4">
                Magna fames tempor iaculis facilisis interdum dictum mi et mattis,
                blandit lacus mollis aenean finibus imperdiet placerat ligula nulla.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}