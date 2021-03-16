import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getClients = async (apiUser, query, res) => {
  const { db } = await connect()

  try {
    const rs = await db.collection(DB.Clients).find({ license: apiUser.license }).toArray()
    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}