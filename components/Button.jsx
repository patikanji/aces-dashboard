export const Button = ({ label, onClick, margin }) => {
  const base = "inline-flex items-center text-sm font-medium text-white rounded bg-indigo-400 hover:bg-indigo-500 focus:outline-none active:bg-indigo-400 h-8 py-0 px-4"
  const btnClass = base + (margin ? ` ${margin}` : '')
  return (
    <button className={btnClass} onClick={onClick}>
      {label}
    </button>
  )
}

export const ButtonHollow = ({ label, onClick, margin }) => {
  const base = "inline-flex items-center text-sm font-medium text-indigo-500 rounded hover:bg-indigo-50 active:bg-white border border-opacity-75 hover:border-opacity-75 border-indigo-400 hover:border-indigo-500 focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 active:border-indigo-400 h-8 py-0 px-4"
  const btnClass = base + (margin ? ` ${margin}` : '')
  return (
    <button className={btnClass} onClick={onClick}>
      {label}
    </button>
  )
}