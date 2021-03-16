import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getSimpleProjects = async (apiUser, query, res) => {
  const { db } = await connect()

  try {
    const rs = await db.collection(DB.Projects).aggregate([
      {$match: {license: apiUser.license}},
      {$sort: {_id: -1}},
      {$lookup: {
        from: DB.Clients, localField: 'clientId', foreignField: '_id', as: 'client',
      }},
      {$unwind: '$client'},
      {$project: {
        admin: 1,
        title: 1,
        shortTitle: 1,
        'client._id': 1,
        'client.name': 1,
        'client.city': 1,
      }}
    ]).toArray()

    // const projects = []
    // for (let i = 0; i < rs.length; i++) {
    //   const project = rs[i]
    //   if (rs[i].adminInfo.length == 0) {
    //     project.adminInfo = {
    //       username: '[deleted]',
    //       fullname: '[deleted]',
    //     }
    //   } else {
    //     project.adminInfo = rs[i].adminInfo[0]
    //   }
    // }

    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}