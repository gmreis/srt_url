const Url = require('./urlModel');

// GET /:urlId
function redirectUrl(req, res) {
  if(req.params.hasOwnProperty('urlId')) {

    //var inicio = new Date;

    var urlId = Url.calcUrlId(req.params.urlId);

    Url.findOne({urlId: urlId}, function(err, url){
      if(err)
        res.status(409).end();
      if(url == null){
        res.status(404).end();
      } else {
        res.redirect(url.url);
        //var temp = new Date - inicio;
        //console.log('Tempo: ' + temp);
        //console.log('URL: ' + url.url);
      }
    });

/*
    Url.findOne({shortUrl: req.params.urlId}, function(err, url){
      if(err)
        res.status(409).end();
      if(url == null){
        res.status(404).end();
      } else {
        res.redirect(url.url);
        var temp = new Date - inicio;
        console.log('Tempo: ' + temp);
        console.log('URL: ' + url.url);
      }
    });
*/
  } else {
    res.status(406).end();
  }
}

// GET /stats
function stats(req, res) {

}

// GET /stats/:id
function statsOneUrl(req, res) {

}

// DELETE /urls/:id
function remove(req, res) {

}

module.exports = {redirectUrl, stats, statsOneUrl, remove}
