import { DB } from 'config/db'
import { connect } from 'lib/database'

export const getLicense = async (apiUser, query, res) => {
  const { db } = await connect()

  try {
    const cursor = await db.collection(DB.Licenses).aggregate([
      { $match: { code: apiUser.license }},
      { $lookup: { from: 'users', localField: 'code', foreignField: 'license', as: 'users' }},
      { $lookup: { from: 'projects', localField: 'code', foreignField: 'license', as: 'projects' }},
      { $lookup: { from: 'clients', localField: 'code', foreignField: 'license', as: 'clients' }},
      // {$unwind: '$users'},
      { $project: {
        _id: 1, code: 1, type: 1,
        licenseName: 1, contactName: 1, contactUsername: 1, contactEmail: 1,
        publishedBy: 1, publishDate: 1, refreshDate: 1, expiryDate: 1,
        disabled: 1, createdAt: 1, updatedAt: 1, logoUrl: 1,

        'users': {$size: '$users'},
        'projects': {$size: '$projects'},
        'clients': {$size: '$clients'},
      }}
    ])

    const rs = await cursor.next()

    if (rs) {
      return res.json( rs )
    } else {
      return res.status(404).json({ 'message': 'License not found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}