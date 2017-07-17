const User = require('./userModel');
const Url = require('../url/urlModel')

// POST /users/:userid/urls
function addUrl(req, res) {

  if(req.body.hasOwnProperty('url') && req.params.hasOwnProperty('userId')) {

    User.findOne({user: req.params.userId}, function(err, user){
      if(err)
        res.status(409).end();

      if(user == null){
        res.status(404).end();
      } else {
        var url = new Url({
          url: req.body.url,
          userId: user._id,
          hits: 0
        })

        Url.nextCount(function(err, count) {
          url.setShortUrl(req.hostname, count);

          Url.create(url, function(err, result) {
            if(err)
              res.status(409).end();

            res.setHeader('Content-Type', 'application/json');
            res.status(201).end(url.responseJSON());
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
