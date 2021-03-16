import Link from "next/link"

export const LinkButton = ({ type= 'plum', label= 'Link', href= '/dashboard', margin= '' }) => {
  const base = "inline-flex items-center text-sm font-medium text-white rounded"
  const plum = `${base} bg-plum-600 bg-opacity-90 hover:bg-plum-600 focus:outline-none active:bg-plum-500 h-8 py-0 px-4`
  const indigo = `${base} bg-indigo-400 hover:bg-indigo-500 focus:outline-none active:bg-indigo-400 h-8 py-0 px-4`
  const btnClass = (type == 'indigo' ? indigo : plum) + (margin ? ` ${margin}` : '')

  return (
    <Link href={href}>
      <a className={btnClass}
      >
        {label}
      </a>
    </Link>
  )
}