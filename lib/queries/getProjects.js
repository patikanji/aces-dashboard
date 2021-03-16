import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getProjects = async (apiUser, query, res) => {
  const { db } = await connect()

  try {
    const rs = await db.collection(DB.Projects).aggregate([
      {$match: {license: apiUser.license}},
      {$sort: {_id: -1}},
      {$lookup: {
        from: DB.Clients, localField: 'clientId', foreignField: '_id', as: 'client',
      }},
      {$lookup: {
        from: DB.Users, localField: 'admin', foreignField: 'username', as: 'adminInfo',
      }},
      // {$lookup: {
      //   from: DB.ProjectGroups, localField: '_id', foreignField: 'projectId', as: 'groups',
      // }},
      {$lookup: {
        from: DB.Personae, localField: '_id', foreignField: 'projectId', as: 'persona',
      }},
      {$unwind: '$client'},
      // commented to prevent zero rs when project admin deleted
      // {$unwind: '$adminInfo'},
      {$project: {
        admin: 1,
        title: 1,
        shortTitle: 1,
        description: 1,
        contacts: 1,
        accessCode: 1,
        startDate: 1,
        endDate: 1,
        openingDate: 1,
        closingDate: 1,
        createdAt: 1,
        // createdBy: 1,
        // 'groups.modules.metaId': 1,
        // 'groups.modules.moduleName': 1,
        'client._id': 1,
        'client.name': 1,
        'client.city': 1,
        'adminInfo.fullname': 1,
        'adminInfo.username': 1,
        totalPersonae: {$size: '$persona'},
      }}
    ]).toArray()

    const projects = []
    for (let i = 0; i < rs.length; i++) {
      const project = rs[i]
      if (rs[i].adminInfo.length == 0) {
        project.adminInfo = {
          username: '[deleted]',
          fullname: '[deleted]',
        }
      } else {
        project.adminInfo = rs[i].adminInfo[0]
      }
    }

    return res.json(rs)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}