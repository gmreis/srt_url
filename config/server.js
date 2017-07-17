const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();

// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, function() {
  console.log(`Server is running on port ${port}`);
})

module.exports = server
