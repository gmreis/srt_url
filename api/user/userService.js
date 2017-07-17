const User = require('./userModel');
const Url = require('../url/urlModel')
const server = require('../../config/server')

// POST /users/:userid/urls
function addUrl(req, res) {

  if(req.body.hasOwnProperty('url') && req.params.hasOwnProperty('userId')) {

    User.findOne({user: req.params.userId}, function(err, user){
      if(err)
        res.status(409).end();

      if(user == null){
        res.status(404).end();
      } else {

        Url.nextCount(function(err, count) {

          var shortUrl = Url.calcShortUrl(count);
          var url = new Url({
            url: req.body.url,
            userId: user._id,
            shortUrl: shortUrl,
            hits: 0
          })

          Url.create(url, function(err, result) {
            if(err){
              console.error(err);
              res.status(409).end();
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.status(201).end(JSON.stringify(url.responseJSON(req.hostname, server.get('port'))));
            }
          });
        });
      }
    });
  } else {
    res.status(406).end();
  }
}

//GET /users/:userId/stats
function stats(req, res) {
  if(req.params.hasOwnProperty('userId')) {

    User.findOne({user: req.params.userId}, function(err, user){
      if(err)
        res.status(409).end();

      if(user == null){
        res.status(404).end();
      } else {

        var stats = {};

        Url.aggregate([
          { $match: { userId: user._id } },
          { $group: { _id: null, totalHits: {$sum: "$hits"}, urlCount: {$sum: 1} } }
        ], function (err, result){
          if(err) {
            console.error(err);
          } else {

            stats.hits = result[0].totalHits;
            stats.urlCount = result[0].urlCount;
            stats.topUrls = [];

            Url.aggregate([
              { $match: { userId: user._id } },
              { $sort: { hits: -1 } }, { $limit: 10 }
            ], function (err, result) {

              if(err) {
                console.error(err);
              } else {

                for(var i=0; i<result.length; i++) {
                  stats.topUrls.push(new Url(result[i]).responseJSON(req.hostname, server.get('port')));
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(stats));

              }
            });


          }
        }) //Url.aggregate

      } //else

    }); // User.findOne



  }
}

//POST /users
function add(req, res) {
  if(req.body.hasOwnProperty('id')) {

    var user = new User({
      user: req.body.id,
    });

    user.checkUser()
    .then(function(err, result) {
      User.create(user, function(err, result) {
        if(err)
          res.status(409).end();

        res.setHeader('Content-Type', 'application/json');
        res.status(201).end(JSON.stringify({id: user.user}));
      })
    })
    .fail(function(err) {
      res.status(409).end();
    });

  } else {
    res.status(406).end();
  }
}

// DELETE /user/:userId
function remove(req, res) {

  if(req.params.hasOwnProperty('userId')) {



    User.findOne({user: req.params.userId}, function(err, user){
      if(err)
        res.status(409).end();

      if(user == null){
        res.status(404).end();
      } else {


        Url.remove({userId: user._id}, function(err) {
          if(err) {
            console.error('Urls do usuario não removida. userId: ' + req.params.userId);
            res.status(409).end();
          } else {
            User.remove({_id: user._id}, function(err) {
              if(err) {
                console.error('Não foi possivel remover o Usuário. userId: ' + req.params.userId);
                res.status(409).end();
              } else {
                res.end(JSON.stringify({}));
              }
            })
          }
        })

      }
    });

  } else {
    res.status(406).end();
  }

}

module.exports = { addUrl, stats, add, remove }
