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

}

module.exports = { addUrl, stats, add, remove }
