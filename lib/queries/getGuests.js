import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getGuests = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid } = query

  try {
    const rs = await db.collection(DB.ProjectGuests).find({ projectId: pid }).toArray()
    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}