export const IsLoading = () => {
  return (
    <div className="flex justify-center py-2">
      <img src="/loading.svg" className="w-6 h-6" />
    </div>
  )
}

export const IsLoading2 = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="w-4 h-1 mr-1 rounded border border-bluegray-300" style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }}></div>
      <div className="w-4 h-1 mr-1 rounded border border-bluegray-300" style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }}></div>
      <div className="w-4 h-1 mr-1 rounded border border-bluegray-300" style={{ backgroundImage: 'url(/mango-in-progress-01.gif)' }}></div>
    </div>
  )
}
