const base = "inline-flex items-center text-sm font-medium text-white rounded"
const plum = `${base} bg-plum-600 bg-opacity-90 hover:bg-plum-600 focus:outline-none active:bg-plum-500 h-8 py-0 px-4`
const indigo = `${base} bg-indigo-500 hover:bg-indigo-600 focus:outline-none active:bg-indigo-500 h-8 py-0 px-4`
const plumDisabled = `${base} bg-plum-500 bg-opacity-90 h-8 py-0 px-4`
const indigoDisabled = `${base} bg-indigo-400 h-8 py-0 px-4`

export const Button = ({ type= 'plum', label= 'Button', onClick=()=>{}, margin= "", disabled }) => {
  const btnClass = (type == 'indigo' ? indigo : plum) + (margin ? ` ${margin}` : '')
  const btnDisabled = (type == 'indigo' ? indigoDisabled : plumDisabled) + (margin ? ` ${margin}` : '')

  if (disabled) return (
    <button className={btnDisabled} disabled>
      {label}
    </button>
  )

  return (
    <button className={btnClass} onClick={onClick}>
      {label}
    </button>
  )
}

export const ButtonHollow = ({ label, onClick, margin }) => {
  const base = "inline-flex items-center text-sm font-medium text-plum-500 rounded hover:bg-plum-50 active:bg-white border border-opacity-75 hover:border-opacity-75 border-plum-400 hover:border-plum-500 focus:outline-none focus:border-plum-300 focus:ring focus:ring-plum-200 focus:ring-opacity-50 active:border-plum-400 h-8 py-0 px-4"
  const btnClass = base + (margin ? ` ${margin}` : '')
  return (
    <button className={btnClass} onClick={onClick}>
      {label}
    </button>
  )
}