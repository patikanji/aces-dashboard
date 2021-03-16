import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getPersona = async (apiUser, query, res) => {
  const { db } = await connect()
  const { id } = query

  try {
    const rs = await db.collection(DB.Personae).findOne(
      { _id: id },
      { projection: {
        // _id: 1,
        createdBy: 0,
        createdAt: 0,
        updatedAt: 0,
        hashed_password: 0,
        xfpwd: 0,
      }}
    )

    if (rs) {
      return res.json(rs)
    } else {
      return res.status(404).json({ message: 'Not Found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}