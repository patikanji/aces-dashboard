import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getUsers = async (apiUser, query, res) => {
  const { db } = await connect()

  try {
    const rs = await db.collection(DB.Users).find(
      { license: apiUser.license },
      { projection: { hashed_password: 0 }}
    ).toArray()

    return res.json( rs )
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}