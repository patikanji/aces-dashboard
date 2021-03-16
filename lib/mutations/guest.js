import { DB } from "config/db"
import { connect } from "lib/database"
import { createPassword, createRandomPassword } from "lib/utils"
import { ObjectID } from "mongodb"

export const createGuest = async (apiUser, query, body, res) => {
  const { db } = await connect()
  const doc = body
  const { password, hashed_password } =  createPassword(body.email)
  doc._id = ObjectID().toString()
  doc.license = apiUser.license
  doc.hashed_password = hashed_password
  doc.createdBy = apiUser.username
  doc.createdAt = new Date()
  try {
    const rs = await db.collection(DB.ProjectGuests).insertOne(doc)

    if (rs && rs['ops'] && rs['ops'].length !== 0) {
      const guest = rs['ops'][0]
      guest.password = password
      console.log("GUEST", guest)
      return res.json({ message: 'OK', created: guest })
    } else {
      throw new Error('Failed to save modules');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const deleteGuest = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.ProjectGuests).findOneAndDelete(
      { _id: body.id }
    )

    console.log('RS', rs)
    return res.json({ message: `Document ${body.id} deleted` })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

export const disableGuest = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const { enable } = query
    console.log('enable:', enable)
    const rs = await db.collection(DB.ProjectGuests).findOneAndUpdate(
      { _id: body.id },
      { $set: { disabled: !enable ? true : false }}
    )

    // console.log('RS', rs)
    return res.json({ message: `Document ${body.id} deleted` })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

// Reset password
export const resetGuestPassword = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const { password, hashed_password, xfpwd } = createRandomPassword()
    const rs = await db.collection(DB.ProjectGuests).findOneAndUpdate(
      { _id: body.id },
      {
        $set: { hashed_password: hashed_password },
        $currentDate: { lastModified: true }
      }
    )

    console.log('RS', rs)
    return res.json({
      email: rs.value.email,
      password: password
    })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}