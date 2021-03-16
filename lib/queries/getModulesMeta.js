import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getModulesMeta = async (apiUser, query, res) => {
  const { db } = await connect()
  const { field, method } = query

  const params = {}
  if (field) {
    if (typeof field === 'string') {
      params[field] = 1
    } else if (Array.isArray(field)) {
      field.forEach(f => {
        params[f] = 1
      })
    }
  }

  const match = method ? { method: method } : {}

  try {
    if (field || method) {
      console.log('field | method')
      const rs = await db.collection(DB.ModulesMeta).find(
        match,
        { projection: params }
      ).toArray()

      return res.json(rs)
    } else {
      const rs = await db.collection(DB.ModulesMeta).find({}).toArray()

      return res.json( rs )
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}