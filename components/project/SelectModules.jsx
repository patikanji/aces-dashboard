import { useModulesMeta } from "hooks"
import { useEffect, useState } from "react"

export const SelectModules = ({ meta }) => {
  // const { meta, isLoading, isError } = useModulesMeta()

  const [modulesGrouping, setModulesGrouping] = useState({})
  const [viewStack, setViewStack] = useState([])
  const [dummy, setDummy] = useState(null)

  useEffect(() => {
    if (meta) {
      const dummyKV = {}
      const grouping = {}
      meta.forEach((m) => {
        dummyKV[m._id] = { ...m, selected: false }
        if (!grouping[m.domain]) {
          grouping[m.domain] = []
        }

        grouping[m.domain].push(m)
      })

      setDummy(dummyKV)
      setModulesGrouping(grouping)
    }
  }, [meta])

  function selectOrDeselect(id, bSelect) {
    setDummy(prev => ({
      ...prev,
      [id]: { ...prev[id], selected: bSelect}
    }))
  }

  function getSelectedModules() {
    if (!dummy) return []
    const selected = Object.keys(dummy).map(k => {
      return dummy[k].selected ? dummy[k] : null
    })
    .filter(elm => elm !== null)
    .sort((a, b) => { return a.order - b.order })

    const array = []
    selected.forEach(item => {
      array.push({
        order: item.order,
        metaId: item._id,
        domain: item.domain,
        method: item.method,
        moduleName: item.moduleName,
        description: item.description,
        remark: item.remark,
      })
    })

    return array
  }

  return <>
    <pre>
      {/* {JSON.stringify(viewStack, null, 2)} */}
    </pre>
    <div>
     {Object.keys(modulesGrouping).map(domain => (
       <div key={domain} className="mb-4">
         <div className="text-sm text-indigo-500 font-semibold border-b border-bluegray-300 pb-2">
          {domain}
         </div>
         <table className="w-full text-sm">
          {modulesGrouping[domain].map((module, index) => (
            <tbody key={domain}>
              <tr
                key={module._id}
                className="border-b border-bluegray-200 hover:text-indigo-500 cursor-pointer"
                onClick={e => {
                  if (!viewStack.includes(module._id)) {
                    setViewStack(vs => ([...vs, module._id]))
                  } else {
                    setViewStack(viewStack.filter(item => item !== module._id))
                  }
                }}
              >
                <td width="30" className="p-2 text-bluegray-600">{index +1}</td>
                <td width="85%" className="p-2 font-semibold">{module.moduleName}</td>
                <td className="p-2 whitespace-nowrap">
                  <label className="flex items-center text-bluegray-600 hover:text-emerald-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-500 rounded border-bluegray-300 mr-2"
                      onChange={e => {
                        selectOrDeselect(module._id, e.target.checked)
                      }}
                    />
                    <span>Select</span>
                  </label>
                </td>
              </tr>
              {viewStack.includes(module._id) && (
                <tr className="border-b border-bluegray-200 bg-bluegray-50">
                  <td className="p-2"></td>
                  <td colSpan="2" className="p-2 pr-7">
                    <p className="mb-2">{module.description}</p>
                    <p className="text-indigo-500">{module.remark}</p>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
         </table>
       </div>
     ))}
    </div>
    {getSelectedModules().map(item => (
      <p key={item.metaId}>{item.moduleName}</p>
    ))}

    <pre>
      {/* DUMMY: {JSON.stringify(dummy, null, 2)} */}
      {/* {JSON.stringify((
        Object.keys(dummy).map(k => {
          return dummy[k].selected ? dummy[k] : null
        })
      )
      .filter(elm => elm !== null)
      .sort((a, b) => { return a.order - b.order }), null, 2)} */}
    </pre>
  </>
}