import { DB } from "config/db"
import { connect } from "lib/database"
import { createPassword } from "lib/utils"
import { ObjectID } from "mongodb"

// 'update-persona': updatePersona,
export const updatePersona = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    // const updateParam = buildUpdateParam(body)
    const args = body.packet
    const rs = await db.collection(DB.Personae).findOneAndUpdate(
      { _id: body._id },
      { $set: args, $currentDate: { lastModified: true } }
    )

    console.log('RS', rs)
    return res.json({ message: `Document ${body.id} updated` })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

// 'delete-persona': updatePersona,
export const deletePersona = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    const rs = await db.collection(DB.Personae).findOneAndDelete(
      { _id: body.id }
    )

    console.log('RS', rs)
    return res.json({ message: `Document ${body.id} deleted` })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

export const createPersona = async (apiUser, query, body, res) => {
  try {
    const { db } = await connect()
    let model = body
    const { password, hashed_password, xfpwd } = createPassword(model.username)
    model._id = ObjectID().toString()
    model.license = apiUser.license
    model.createdBy = apiUser.username
    model.createdAt = new Date()
    model.hashed_password = hashed_password
    model.xfpwd = xfpwd

    const rs = await db.collection(DB.Personae).insertOne(model)

    if (rs['ops'] && rs['ops'][0]) {
      // Just send notification
      const person = rs['ops'][0]
      console.log('person', person)
      return res.json({
        person: {
          type: 'persona',
          _id: person._id,
          fullname: person.fullname,
          username: person.username,
          email: person.email,
          password: password
        }
      })
    } else {
      throw new Error('Failed to create new user');
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const saveCSVData = async (apiUser, query, body, res) => {
  console.log(new Date(), 'lib/saveCSVData')
  const { license, projectId, group, tests, personae } = body
  let docs = []
  console.log(new Date(), 'Compiling csv data...')
  for (let i = 0; i < personae.length; i++) {
    let person = personae[i]
    // const { password, hashed_password, xfpwd } = createPassword(person.username)
    person._id = ObjectID().toString()
    docs.push(person)
    console.log(person._id)
  }
  console.log(new Date(), 'Finished compiling csv data')

  try {
    const { db } = await connect()
    console.log(new Date(), 'BEFORE insertMany(docs)...')
    await db.collection(DB.Personae).insertMany(docs)
    console.log(new Date(), 'AFTER insertMany(docs)...')
    // console.log('insertedCount', rs.insertedCount)
    // console.log('insertedIds', rs.insertedIds)

    // optimistic
    return res.json({
      created: 'CSV IMPORTED'
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}

export const __generateCredentials = async (apiUser, query, body, res) => {
  const projectId = body.projectId
  const { db, client } = await connect()
  const session = client.startSession()
  try {
    // const usernames = []
    const persons_ = []

    await session.withTransaction(async () => {
      const rs1 = await db.collection(DB.Personae).find(
        { projectId: projectId },
        { projection: {
          _id: 1,
          username: 1,
        }}
      )

      const usernames = []
      const persons = []

      rs1.forEach(row => {
        if (!usernames.includes(row.username)) {
          let username = ''

          if (row.username.length < 5) {
            const sub = (7 - row.username.length)
            const suffix = ObjectID().toString().substr(-sub)
            username = row.username.toLowerCase() + suffix
          } else {
            username = row.username.toLowerCase()
          }

          const { password, hashed_password, xfpwd } = createPassword(username)

          usernames.push(username)
          persons.push({
            username: username,
            password: password,
            xfpwd: xfpwd,
          })

          console.log(`Updating ${username}`, row._id)
          const rs = db.collection(DB.Personae).findOneAndUpdate(
            { _id: row._id },
            {
              $set: {
                username: username,
                hashed_password: hashed_password,
                xfpwd: xfpwd,
              },
              $currentDate: { lastModified: true }
            }
          )
        } else {
          let username = ''

          if (row.username.length < 5) {
            const sub = (7 - row.username.length)
            const suffix = ObjectID().toString().substr(-sub)
            username = row.username.toLowerCase() + suffix
          } else {
            username = row.username.toLowerCase() + ObjectID().toString().substr(-3)
          }

          const { password, hashed_password, xfpwd } = createPassword(username)

          usernames.push(username)
          persons.push({
            username: username,
            password: password,
            xfpwd: xfpwd,
          })

          console.log(`Updating ${username}`, row._id)
          const rs = db.collection(DB.Personae).findOneAndUpdate(
            { _id: row._id },
            {
              $set: {
                username: username,
                hashed_password: hashed_password,
                xfpwd: xfpwd,
              },
              $currentDate: { lastModified: true }
            }
          )
        }
      })

      console.log('TRSANSACTION RS', persons)
      return res.json(persons)
    })

    console.log(new Date(), 'after transaction')
    // return res.json({})
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  } finally {
    await session.endSession()
  }
}

export const generateCredentials = async (apiUser, query, body, res) => {
  const projectId = body.projectId
  const { db, client } = await connect()
  const session = client.startSession()

  try {
    const transactionResults = await session.withTransaction(async () => {
      const rs1 = await db.collection(DB.Personae).find(
        { projectId: projectId },
        { projection: {
          _id: 1,
          username: 1,
        }}
      )

      const usernames = []
      const persons = []

      rs1.forEach(row => {
        if (!usernames.includes(row.username)) {
          let username = ''

          if (row.username.length < 5) {
            const sub = (7 - row.username.length)
            const suffix = ObjectID().toString().substr(-sub)
            username = row.username.toLowerCase() + suffix
          } else {
            username = row.username.toLowerCase()
          }

          const { password, hashed_password, xfpwd } = createPassword(username)

          usernames.push(username)
          persons.push({
            username: username,
            password: password,
            xfpwd: xfpwd,
          })

          console.log(new Date(), username , row._id)
          const rs = db.collection(DB.Personae).findOneAndUpdate(
            { _id: row._id },
            {
              $set: {
                username: username,
                hashed_password: hashed_password,
                xfpwd: xfpwd,
              },
              $currentDate: { lastModified: true }
            }
          )
        } else {
          let username = ''

          if (row.username.length < 5) {
            const sub = (7 - row.username.length)
            const suffix = ObjectID().toString().substr(-sub)
            username = row.username.toLowerCase() + suffix
          } else {
            username = row.username.toLowerCase() + ObjectID().toString().substr(-3)
          }

          const { password, hashed_password, xfpwd } = createPassword(username)

          usernames.push(username)
          persons.push({
            username: username,
            password: password,
            xfpwd: xfpwd,
          })

          console.log(new Date(), username , row._id)
          const rs = db.collection(DB.Personae).findOneAndUpdate(
            { _id: row._id },
            {
              $set: {
                username: username,
                hashed_password: hashed_password,
                xfpwd: xfpwd,
              },
              $currentDate: { lastModified: true }
            }
          )
        }
      })
    });

    return res.json({ message: 'OK' })
  } catch (error) {
    console.error("The transaction was aborted due to an unexpected error: " + error)
    await session.endSession
    return res.status(error.status || 500).end(error.message)
  } finally {
    await session.endSession();
  }
}