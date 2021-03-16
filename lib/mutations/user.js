import { DB } from "config/db"
import { connect } from "lib/database"
import { createPassword } from "lib/utils"
import { ObjectID } from "mongodb"

export const createUser = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const { password, hashed_password, xfpwd } = createPassword(body.username)
    let model = body
    model._id = ObjectID().toString()
    model.hashed_password = hashed_password
    model.createdAt = new Date()
    model.xfpwd = xfpwd

    const rs = await db.collection(DB.Users).insertOne(model)

    if (rs['ops'] && rs['ops'][0]) {
      // Just send notification
      const created = rs['ops'][0]
      console.log(created)
      return res.json({
        created: true,
        type: 'user',
        _id: created._id,
        fullname: created.fullname,
        username: created.username,
        password: password,
      })
    } else {
      throw new Error('Failed to create new user');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const deleteUser = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const { id } = body

    const rs = await db.collection(DB.Users).findOneAndDelete({ _id: id })
    console.log(rs)

    // Just send notification
    if (rs && rs.value) {
      return res.json({
        deleted: {
          type: 'user',
          _id: rs.value._id,
        }
      })
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const changePassword = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const { username, oldPassword, password1 } = body

    const user = await db.collection(DB.Users).findOne({ username: username })
    const bcrypt = require('bcryptjs')
    const verified = bcrypt.compareSync(oldPassword, user.hashed_password)

    if (verified) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password1, saltRounds)
      db.collection(DB.Users).findOneAndUpdate(
        { username: username},
        { $set : {
          hashed_password: hash,
          updatedAt: new Date()
        }}
      )
      res.json({ message: "Password changed." })
    } else {
      res.status(404)
      res.json({ message: "Anda memasukkan password yang salah." })
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}