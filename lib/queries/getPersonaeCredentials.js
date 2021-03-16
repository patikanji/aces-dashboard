import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getPersonaeCredentials = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid } = query
  console.log(pid)

  try {
    const rs = await db.collection(DB.Personae).find(
      { projectId: pid },
      { projection: {
        _id: 1,
        fullname: 1,
        username: 1,
        xfpwd: 1,
      }}
    ).toArray()

    const array = []
    rs.forEach(row => {
      array.push({
        _id: row._id,
        fullname: row.fullname,
        username: row.username,
        xfpwd: row.xfpwd ? row.xfpwd.split('').reverse().join('') : null,
      })
    })

    // console.log(array)
    return res.json(array)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}