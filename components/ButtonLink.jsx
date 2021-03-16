import Link from "next/link"

export const ButtonLink = ({ label, href, margin }) => {
  const base = "inline-flex items-center text-sm font-medium text-white rounded bg-indigo-400 hover:bg-indigo-500 focus:outline-none active:bg-indigo-400 h-8 py-0 px-4"
  const btnClass = base + (margin ? ` ${margin}` : '')
  return (
    <Link href={href}>
      <a className={btnClass}
      >
        {label}
      </a>
    </Link>
  )
}