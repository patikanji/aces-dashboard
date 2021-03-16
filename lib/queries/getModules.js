import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getModules = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid, simple } = query

  try {
    const rs = await db.collection(DB.ProjectGroups).find(
      { projectId: pid },
      { grupName: 0, modules: 1 }
    ).toArray()

    let array = []
    let metaIds = []

    rs.forEach(row => {
      row.modules.forEach(module => {
        if (!metaIds.includes(module.metaId)) {
          metaIds.push(module.metaId)
          if (simple !== undefined) {
            array.push({
              metaId: module.metaId,
              moduleName: module.moduleName
            })
          } else {
            array.push(module)
          }
        }
      })
    })

    return res.json(array)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}