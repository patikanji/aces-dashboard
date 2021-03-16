import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getUser = async (apiUser, query, res) => {
  const { db } = await connect()
  const { username } = query

  try {
    const rs = await db.collection(DB.Users).findOne(
      { username: username },
      { projection: { _id: 1, fullname: 1, username: 1 }}
    )

    if (rs) {
      return res.json(rs)
    } else {
      return res.json({ '_id': null })
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}