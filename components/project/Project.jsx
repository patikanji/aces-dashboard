import { ButtonLink } from "components/ButtonLink"
import { Button } from "components/Buttons"
import { InfoBox } from "./InfoBox"

export const Project = ({ user, project }) => {
  //
  return (
    <div className="grid grid-cols-5 gap-6 mt-8">
      <div className="col-span-5 md:col-span-2">
        <InfoBox user={user} project={project} />
      </div>
      <div className="col-span-5 md:col-span-3">
        {project.groups.length === 0 && <HasNoGroup project={project} />}
      </div>
      <style jsx>{`
      .strong {
        font-weight: 600;
        margin: 0 .25rem;
      }
      `}</style>
    </div>
  )
}

const HasNoGroup = ({ project }) => {
  return (
    <div className="rounded border border-indigo-200 px-6 py-4">
      <h3 className="text-lg text-center text-indigo-500 font-semibolds mb-4">
        Proyek ini belum memiliki Grup
      </h3>
      <ul className="bg-indigo-100 list-disc text-sm text-whites -mx-6 px-6 pl-10 py-3 mb-4">
        <li className="mb-2">
          Setiap <span className="strong">Proyek ACES</span> setidaknya
          harus memiliki satu grup.
        </li>
        <li className="mb-2">
          Selanjutnya, setiap grup harus memiliki satu atau lebih
          <span className="strong">Modul ACES</span> yang akan dijalani oleh
          peserta proyek.
        </li>
        <li className="mb-2">
          Daftar <span className="strong">persona</span> (peserta proyek)
          hanya dapat ditambahkan pada grup yang telah memilik modul.
        </li>
      </ul>
      <p className="text-sm text-centers text-bluegray-500 mb-4">

        tempor iaculis facilisis interdum dictum mi et mattis, blandit lacus mollis aenean finibus imperdiet placerat ligula nulla, taciti in vestibulum.
      </p>
      <p className="text-center">
        <ButtonLink href={`/projects/${project._id}/create-group`} type="indigo" label="Create Group" />
      </p>
    </div>
  )
}