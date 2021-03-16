import { DB } from "config/db"
import { connect } from "lib/database"

export const updateLogo = async (apiUser, quey, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Licenses).findOneAndUpdate(
      { code: apiUser.license },
      { $set: {
        logoUrl: body.imageUrl
      }}
    )

    return res.json({ message: 'Logo saved' })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const updateName = async (apiUser, quey, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Licenses).findOneAndUpdate(
      { code: apiUser.license },
      { $set: {
        licenseName: body.licenseName
      }}
    )

    return res.json({ message: 'License updated' })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}