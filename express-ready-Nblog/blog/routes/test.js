var http = require('http');
server = http.createServer(function (req, res) {
  console.log("hello world");
});
server.listen(80);