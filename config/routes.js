const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()

  server.use('/', router)

  const urlService = require('../api/urlService')
  // GET /:urlId
  router.route('/:urlId').get(urlService.redirectUrl)
  // GET /stats
  router.route('/stats').get(urlService.stats)
  // GET /stats/:id
  router.route('/stats/:urlId').get(urlService.statsOneUrl)
  // DELETE /urls/:id
  router.route('/:urlId').delete(urlService.delete)

  const userService = require('../api/userService')
  // POST /users/:userid/urls
  router.route('/users/:userId/urls').post(userService.addUrl)
  //GET /users/:userId/stats
  router.route('/users/:userId/stats').get(userService.stats)
  //POST /users
  router.route('/users').post(userService.add)
  // DELETE /user/:userId
  router.route('/user/:userId').delete(userService.delete)

}
