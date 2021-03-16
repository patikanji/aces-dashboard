export const Select = ({ options, onChange, defaultValue, disabled }) => {
  return (
    <>
      <select
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className="select text-sm text-indigo-500 font-medium rounded border-indigo-400 border-opacity-75 hover:border-opacity-60 hover:border-indigo-500 shadow-sm hover:shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 py-0 pl-3"
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value}>{label}</option>
        ))}
      </select>
      <style jsx>{`
      select {
        background-position: right .25rem center;
        padding-right: 2rem;
      }
      `}</style>
    </>
  )
}