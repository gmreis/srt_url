const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const urlSchema = new mongoose.Schema({
  urlId: { type: Number, require: true, index: true },
  hits: { type: Number, min: 0, required: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, required: true }
})

urlSchema.methods.responseJSON = function (hostname, port) {
  return JSON.stringify({
      "id": this.urlId,
      "hits": this.hits,
      "url": this.url,
      "shortUrl": 'http://'+hostname+':'+port+'/'+this.shortUrl
    })
}

urlSchema.plugin(autoIncrement.plugin, { model: 'Url', field: 'urlId' });
module.exports = mongoose.model('Url', urlSchema);

module.exports.calcUrlId = function (shortUrl) {
  var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var base = range.length;

  var numberBase = shortUrl.split('');
  var numberDigit = posDigit = (numberBase.length - 1);

  var urlId = 0;
  for(var pos=0; pos<=numberDigit; pos++ ){
    urlId = urlId + (range.indexOf(numberBase[pos])*(Math.pow(base, posDigit--)))
  }

  return urlId;
}

module.exports.calcShortUrl = function (urlId) {

  var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var base = range.length;

  var str = '';

  while(urlId>0) {
    str = range[urlId % base] + str;
    urlId = Math.floor(urlId / base);
  }

  return str;
  //this.shortUrl = 'http://'+hostname+':'+server.get('port')+'/'+str;
}
