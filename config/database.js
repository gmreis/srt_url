const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const host = 'localhost'
const port = 27017
const db = 'srt_url'

const connection = mongoose.connect(`mongodb://${host}:${port}/${db}`)
autoIncrement.initialize(connection);
module.exports = connection
