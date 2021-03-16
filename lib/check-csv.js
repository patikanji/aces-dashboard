import { ObjectID } from "mongodb"
import { createPassword } from "./utils"

export const checkAndPrepareCSV = async (apiUser, query, body, res) => {
  let rows = body
  for (let i = 0; i < rows.length; i++) {
    const { password, hashed_password, xfpwd } = createPassword(rows[i].username)
    rows[i]._id = ObjectID().toString()
    rows[i].hashed_password = null // hashed_password
    rows[i].xfpwd = null // xfpwd
  }

  console.log(new Date(), 'Finished checking')
  return res.json(rows)
}