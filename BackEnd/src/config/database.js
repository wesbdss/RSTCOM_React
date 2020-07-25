const { MongoClient } = require('mongodb')

const uri ='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'
  // 'mongodb+srv://admin:admin@cluster0.gzwwd.gcp.mongodb.net?retryWrites=true&w=majority'

const database = callback => MongoClient.connect(uri, callback)

module.exports = database;