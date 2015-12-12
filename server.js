var express = require('express');

var server = express();
server.use('/', express.static(__dirname + '/'));

server.get('/*', function(req, res) {
    console.log(req.originalUrl);
    if(req.originalUrl.slice(0, 4) == "/mvc") {
        res.sendFile(__dirname + req.originalUrl);
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }
});

var port = 8080;
server.listen(port, function() {
  console.log('Server listening on port ' + port);
});