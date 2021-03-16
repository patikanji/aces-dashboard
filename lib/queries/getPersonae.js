import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getPersonae = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid } = query
  const projection = {
    _id: 1,
    fullname: 1,
    group: 1,
    _tests: {$size: '$tests'},
    _sims: {$size: '$sims'},
    _testsPerformed: {$size: '$testsPerformed'},
    _simsPerformed: {$size: '$simsPerformed'},
  }

  try {
    const rs = await db.collection(DB.Personae).find(
      { license: apiUser.license, projectId: pid },
      { projection: projection }
    ).toArray()

    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}