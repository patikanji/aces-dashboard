import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getGroups = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid, field } = query

  try {
    if (!field) {
      const rs = await db.collection(DB.ProjectGroups).find({ projectId: pid }).toArray()
      return res.json( rs )
    } else {
      let params = {}
      if (typeof field === 'string') {
        params[field] = 1
      } else if (Array.isArray(field)) {
        field.forEach(f => {
          if (f == 'modulesCount') params[f] = { $size: '$modules' }
          else params[f] = 1
        })
      }

      const rs = await db.collection(DB.ProjectGroups).find(
        { projectId: pid },
        { projection: params }
      ).toArray()

      return res.json( rs )
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}