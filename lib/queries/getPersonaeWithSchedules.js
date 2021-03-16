import { DB } from "config/db"
import { connect } from "lib/database"

export const getPersonaeWithSchedules = async (apiUser, query, res) => {
  console.log('getPersonaeWithSchedules')
  try {
    const { db } = await connect()
    const { pid } = query
    console.log('pid', pid)
    const rs = await db.collection(DB.Personae).find(
      { projectId: pid, sims: { $exists: true, $ne: [] }},
      { projection: {_id: 1, username:1, fullname: 1, group: 1, sims: 1}}
    ).toArray()

    // console.log(rs)

    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}