import { LinkButton } from "components/LinkButtons"
import fetchJson from "lib/fetchJson"
import { useState } from "react"

const License = ({ user, license, mutate }) => {
  const [licenseName, setLicenseName] = useState(license.licenseName)

  async function updateLicenseName() {
    const url = `/api/post?q=update-license-name`
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ licenseName: licenseName })
    })

    if (response) {
      mutate()
    }
  }

  return (
    <div className="">
      <h3 className="text-xl text-bluegray-500 font-semibold">
        License Info
      </h3>
      <hr className="mt-3 mb-6 border-bluegray-300" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">License ID</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Keterangan singkat
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled
            type="text"
            value={license._id}
            className="w-full text-sm font-mono rounded border border-bluegray-300 py-1s"
          />
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">License Name</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Nama license
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled={user.username !== license.contactUsername}
            type="text"
            value={licenseName}
            onChange={e => setLicenseName(e.target.value)}
            onBlur={updateLicenseName}
            className="w-full text-sm font-mono rounded border border-bluegray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-100"
          />
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">License Code</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Kode yang dipakai sebagai
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled
            type="text"
            value={license.code}
            className="w-24 text-sm font-mono rounded border border-bluegray-300 focus:border-plum-300 focus:ring focus:ring-plum-200"
          />
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">Logo Perusahaan</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Klik tombol berikut untuk mengunggah atau mengganti gambar logo.
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <LinkButton label="Upload Logo" href="/upload-logo" />
          {/* <br/><span className="text-xs">{license.logoUrl}</span> */}
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">License Contact</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Kode yang dipakai sebagai
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled
            type="text"
            value={license.contactName}
            className="w-full text-sm font-mono rounded border border-bluegray-300 focus:border-plum-300 focus:ring focus:ring-plum-200"
          />
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">Publish date</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Kode yang dipakai sebagai
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled
            type="text"
            value={license.publishDate}
            className="w-48 text-sm font-mono rounded border border-bluegray-300 focus:border-plum-300 focus:ring focus:ring-plum-200"
          />
        </div>
      </div>
      <hr className="mt-5 mb-6" />
      <div className="flex flex-col sm:flex-row text-sm-">
        <div className="w-full sm:w-2/5 sm:mr-6">
          <div className="mr-12">
            <div className="text-sm text-plum-600 font-medium">Expiry date</div>
            <div className="text-xs text-bluegray-500 mb-2">
              Kode yang dipakai sebagai
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/5">
          <input
            disabled
            type="text"
            value={license.expiryDate}
            className="w-48 text-sm font-mono rounded border border-bluegray-300 focus:border-plum-300 focus:ring focus:ring-plum-200"
          />
        </div>
      </div>
      <pre>
        {/* {JSON.stringify(license, null, 2)} */}
      </pre>
    </div>
  )
}

export default License