const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();

// create application/json parser
server.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended: true }));

server.set('port', port);
server.listen(server.get('port'), function() {
  console.log(`Server is running on port ${port}`);
})

module.exports = server
