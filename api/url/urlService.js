const Url = require('./urlModel');
const server = require('../../config/server')

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
        Url.update({_id: url._id},
          {$set: {hits: (url.hits+1)}},
          function(err, url){
            if(err)
              console.error('Erro ao adicionar o hits: shorUrl: '+req.params.urlId);
        });
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
  var stats = {};

  Url.aggregate([
    {$group: {_id: null, totalHits: {$sum: "$hits"}, urlCount: {$sum: 1}}}
  ], function (err, result){
    if(err) {
      console.error(err);
    } else {

      stats.hits = result[0].totalHits;
      stats.urlCount = result[0].urlCount;
      stats.topUrls = [];

      Url.aggregate([
        { $sort: { hits: -1 } }, { $limit: 10 }
      ], function (err, result) {

        if(err) {
          console.error(err);
        } else {

          console.log('funcionou... =D');
          console.dir(result);

          for(var i=0; i<result.length; i++) {
            stats.topUrls.push(new Url(result[i]).responseJSON(req.hostname, server.get('port')));
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(stats));

        }
      });


    }
  })

}

// GET /stats/:id
function statsOneUrl(req, res) {

}

// DELETE /urls/:id
function remove(req, res) {

}

module.exports = {redirectUrl, stats, statsOneUrl, remove}
