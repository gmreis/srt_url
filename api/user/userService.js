const User = require('./userModel');


// POST /users/:userid/urls
function addUrl(req, res) {
  console.log(req.body);
  console.log(req.params.userId);

  res.status(200).end();

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

    user.checkUser().
    then(function(err, result) {
      User.create(user, function(err, result) {
        res.status(201).end(res.json({id: user.user}));
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
