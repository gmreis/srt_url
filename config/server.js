const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();

server.listen(port, function() {
  console.log(`Server is running on port ${port}`);
})

module.exports = server
