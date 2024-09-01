const {MongoClient, GridFSBucket} = require('mongodb');
const {baseUrl} = require('../helpers/shared')

async function createBucket() {
    const client = await MongoClient.connect(baseUrl);
    const db = client.db('movie');
    const bucket = new GridFSBucket(db, { bucketName: 'videos' });
    return bucket;
}

module.exports = { createBucket }