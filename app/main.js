var express = require('express');
var http = require('http');
var portfinder = require('portfinder');
var Promise = require('bluebird');
var url = require('url');

var app = express();
var server = http.createServer(app);

module.exports.init = function() {
  return Promise.promisify(portfinder.getPort)()
    .then(onPortFound)
    .catch(function(err) {
      process.stderr.write(err);
    });
};

module.exports.deinit = function() {
  server.close();
};

function onPortFound(port) {
  return new Promise(function(resolve, reject) {
    server.on('listening', resolve);
    server.listen(port, 'localhost');
  }).then(function() {
    module.exports.url = url.format({
      protocol: 'http',
      hostname: server.address().address,
      port: server.address().port
    });
    process.stdout.write(module.exports.url + '\n');
  }).catch(function(err) {
    process.stderr.write(err);
  });
}

app.use(express.static('app'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

require.main === module && module.exports.init();