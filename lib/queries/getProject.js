import { DB } from 'config/db'
import { connect } from 'lib/database'

function buildProjectParams(apiUser, pid, info = false) {
  console.log('Info:', info)
  const args = []
  if (pid) {
    args.push({ $match: { _id: pid } })
  } else {
    args.push(
      { $match: { license: apiUser.license } },
      { $sort: { _id: -1 } }
    )
  }

  if (info) {
    args.push(
      {$limit: 1},
      {$lookup: {
        from: DB.Clients, localField: 'clientId', foreignField: '_id', as: 'client',
      }},
      {$lookup: {
        from: DB.ProjectGroups, localField: '_id', foreignField: 'projectId', as: 'groups',
      }},
      {$lookup: {
        from: DB.Personae, localField: '_id', foreignField: 'projectId', as: 'dfPersona',
      }},
      {$unwind: '$client'},
      {$project: {
        license: 1,
        title: 1,
        shortTitle: 1,
        admin: 1,
        'client.name': 1,
        'client.city': 1,
        // groups: {$size: '$projectGroups'},
        'groups._id': 1,
        'groups.groupName': 1,
        personae: {$size: '$dfPersona'},
      }}
    )
  } else {
    args.push(
      {$limit: 1},
      {$lookup: {
        from: DB.Clients, localField: 'clientId', foreignField: '_id', as: 'client',
      }},
      {$lookup: {
        from: DB.Users, localField: 'admin', foreignField: 'username', as: 'adminInfo',
      }},
      {$lookup: {
        from: DB.ProjectGroups, localField: '_id', foreignField: 'projectId', as: 'groups',
      }},
      {$lookup: {
        from: DB.Personae, localField: '_id', foreignField: 'projectId', as: 'persona',
      }},
      {$unwind: '$client'},
      // {$unwind: '$adminInfo'},
      {$project: {
        license: 1,
        title: 1,
        shortTitle: 1,
        description: 1,
        contacts: 1,
        accessCode: 1,
        startDate: 1,
        admin: 1,
        endDate: 1,
        openingDate: 1,
        closingDate: 1,
        createdAt: 1,
        createdBy: 1,
        'groups._id': 1,
        'groups.groupName': 1,
        'groups.modules.metaId': 1,
        'groups.modules.method': 1,
        'groups.modules.moduleName': 1,
        'client._id': 1,
        'client.name': 1,
        'client.city': 1,
        'adminInfo._id': 1,
        'adminInfo.fullname': 1,
        'adminInfo.username': 1,
        totalPersonae: {$size: '$persona'},
      }}
    )
  }

  return args
}

export const getProject = async (apiUser, query, res) => {
  const { db } = await connect()
  const { pid, simpleInfo } = query
  const info = simpleInfo !== undefined
  const params = buildProjectParams(apiUser, pid, info)

  try {
    const cursor = await db.collection(DB.Projects).aggregate(params)

    const rs = await cursor.next()
    if (rs) {
      // Simple info
      if (info) return res.json(rs)

      // Rebuild
      // adminInfo comes as array, since the lookup didn't use _id
      const project = rs
      if (rs.adminInfo.length > 0) {
        project.adminInfo = rs.adminInfo[0]
      } else {
        project.adminInfo = null
      }
      return res.json(project)
    } else {
      return res.status(404).json({ message: 'Not Found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}