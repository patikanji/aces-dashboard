import { DB } from "config/db"
import { connect } from "lib/database"
import { ObjectID } from "mongodb"

export const createGroup = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    let doc = body
    doc._id = ObjectID().toString()
    // doc.username = body.email
    doc.createdBy = apiUser.username
    doc.createdAt = new Date()

    const rs = await db.collection(DB.ProjectGroups).insertOne(doc)
    console.log('-------------------------')
    if (rs && rs['ops']) {
      console.log("rs['ops'][0]", rs['ops'][0])
      return res.json({ message: 'OK' })
    } else {
      throw new Error('Failed to save modules');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const mutateGroup = async (apiUser, query, body, res) => {
  // try {
    // let doc = body
    // doc.updatedAt = new Date()
  console.log('BODY', body)

  // Prepare for personae update
  const tests = []
  const sims = []
  body.modules.forEach(module => {
    if (module.method == 'selftest') tests.push(module.metaId)
    if (module.method == 'guided') sims.push(module.metaId)
  })

  const { db, client } = await connect()
  const session = client.startSession()

  try {
    console.log('Start transaction', new Date().toString())
    await session.withTransaction(async () => {
      const dbPersonae = db.collection(DB.Personae)
      const dbGroups = db.collection(DB.ProjectGroups)

      console.log('Upating personae', new Date().toString())
      await dbPersonae.updateMany(
        { projectId: body.projectId, group: body._id },
        {
          $set: { tests: tests, sims: sims },
          $currentDate: { lastModified: true }
        },
      )

      console.log('Upating group', new Date().toString())
      await dbGroups.findOneAndUpdate(
        { _id: body._id },
        {
          $set: { modules: body.modules, updatedAt: new Date() },
          $currentDate: { lastModified: true }
        }
      )
    })

    console.log('Returning response', new Date().toString())
    return res.json({ message: 'OK' })
  }
  catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
  finally {
    await session.endSession();
    // await client.close();
  }
}