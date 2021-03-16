import { DB } from "config/db"
import { connect } from "lib/database"
import { ClientModel, ProjectModel } from "lib/models"
import { ObjectID } from "mongodb"

export const createProject = async (apiUser, query, body, res) => {
  const { db } = await connect()
  let project = ProjectModel

  try {
    let client = null

    // Check if it is for new client
    if ( !body.clientId ) {
      client = ClientModel
      client._id        = ObjectID().toString()
      client.license    = apiUser.license
      client.name       = body.clientName
      client.address    = body.clientAddress
      client.city       = body.clientCity
      client.phone      = body.clientPhone
      client.contacts   = []
      client.createdBy  = apiUser.username
      client.createdAt  = new Date()
      client.updatedAt  = null

      const rs = await db.collection(DB.Clients).insertOne(client)

      if (rs['ops'] && rs['ops'][0]) {
        console.log('New Client', rs['ops'][0])
        project.clientId = client._id
      }
    }

    project._id =         ObjectID().toString()
    project.license =     apiUser.license
    project.clientId =    body.clientId ? body.clientId : client._id
    project.status =      null
    project.title =       body.title
    project.shortTitle =  body.shortTitle
    project.description = body.description
    project.startDate =   body.startDate
    project.endDate =     body.endDate
    project.admin =       apiUser.username
    project.contacts =    []
    // project.groups =      [ 1 ]
    project.accessCode =  null
    project.openingDate =  null
    project.closingDate = null
    project.createdBy =   apiUser.username
    project.createdAt =   new Date()
    project.updatedAt =   null

    const rs = await db.collection(DB.Projects).insertOne(project)

    if (rs['ops'] && rs['ops'][0]) {
      // Send the whole object to be used as ref for modules selection
      let resProject = rs['ops'][0]
      resProject.clientName = body.clientName
      console.log('resProject', resProject)
      return res.json( resProject )
    } else {
      throw new Error('Failed to create new user');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const updateProject = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Projects).findOneAndUpdate(
      { _id: body._id },
      {
        $set: {
          title: body.title,
          shortTitle: body.shortTitle,
          description: body.description,
          admin: body.admin,
          startDate: new Date(body.startDate),
          endDate: new Date(body.endDate),
        },
        $currentDate: { lastModified: true }
      }
    )

    console.log('findOneAndUpdate', rs)
    return res.json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const updateProjectInfo = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Projects).findOneAndUpdate(
      { _id: body._id },
      {
        $set: body.packet,
        $currentDate: { lastModified: true }
      }
    )

    console.log('findOneAndUpdate', rs)
    return res.json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const setDeployment = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Projects).findOneAndUpdate(
      { _id: body.projectId },
      {
        $set: {
          openingDate: new Date(body.openingDate),
          closingDate: new Date(body.closingDate),
          accessCode: body.accessCode,
          updatedAt: new Date(),
        },
        $currentDate: { lastModified: true }
      }
    )

    console.log('findOneAndUpdate', rs)
    return res.json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}