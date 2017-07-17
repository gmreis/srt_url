const express = require('express')
const url = require('url')

module.exports = function(server) {

  server.use(function(req, res, next) {
    if(req.method === 'GET' && req.url.indexOf('/users') != 0 && req.url.indexOf('/stats') != 0) {
      next();
    } else if(req.headers['content-type'] == 'application/x-www-form-urlencoded') {
      next()
    } else {
      res.status(404).end('Errado');
    }
  })
  
  // API Routes
  const router = express.Router()

  server.use('/', router)

  const urlService = require('../api/url/urlService')
  // GET /:urlId
  router.route('/:urlId').get(urlService.redirectUrl)
  // GET /stats
  router.route('/stats').get(urlService.stats)
  // GET /stats/:id
  router.route('/stats/:urlId').get(urlService.statsOneUrl)
  // DELETE /urls/:id
  router.route('/:urlId').delete(urlService.remove)

  const userService = require('../api/user/userService')
  // POST /users/:userId/urls
  router.route('/users/:userId/urls').post(userService.addUrl)
  //GET /users/:userId/stats
  router.route('/users/:userId/stats').get(userService.stats)
  //POST /users
  router.route('/users').post(userService.add)
  // DELETE /user/:userId
  router.route('/user/:userId').delete(userService.remove)

}
