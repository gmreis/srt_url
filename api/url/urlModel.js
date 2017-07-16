const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  hits: { type: Number, min: 0, required: true},
  url: { type: String, required: true },
  shortUrl: { type: String, required: true},
  userId: { type: type: mongoose.Schema.ObjectId, required: true}
})

module.exports = mongoose.model('Url', urlSchema);
