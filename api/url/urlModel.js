const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const server = require('../../config/server')


const urlSchema = new mongoose.Schema({
  urlId: { type: Number, require: true, index: true },
  hits: { type: Number, min: 0, required: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, required: true }
})

urlSchema.methods.setShortUrl = function (hostname, nextId) {

  var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var base = range.length;

  var str = '';

  while(nextId>0) {
    str = range[nextId % base] + str;
    nextId = Math.floor(nextId / base);
  }

  this.shortUrl = 'http://'+hostname+':'+server.get('port')+'/'+str;
}

urlSchema.methods.responseJSON = function () {
  return JSON.stringify({
      "id": this.urlId,
      "hits": this.hits,
      "url": this.url,
      "shortUrl": this.shortUrl
    })
}

urlSchema.plugin(autoIncrement.plugin, { model: 'Url', field: 'urlId' });
module.exports = mongoose.model('Url', urlSchema);
