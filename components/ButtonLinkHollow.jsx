import Link from "next/link"

export const ButtonLinkHollow = ({ label, href, margin }) => {
  const base = "inline-flex items-center text-sm font-medium text-indigo-500 rounded hover:bg-indigo-50 active:bg-white border border-opacity-75 hover:border-opacity-75 border-indigo-400 hover:border-indigo-500 focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 active:border-indigo-400 h-8 py-0 px-4"
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