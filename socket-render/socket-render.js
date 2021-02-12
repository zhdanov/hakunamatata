const net = require('net');
const yaml = require('js-yaml');
const fs   = require('fs');
const Mustache = require('mustache');
const minify = require('html-minifier');
const beautify = require('beautify');

eval(fs.readFileSync(__dirname + '/../h.min.js').toString().substring(13));

let port = 8000;
let host = '127.0.0.1';

try {
  const doc = yaml.load(fs.readFileSync(__dirname + '/config.yaml', 'utf8'));
  port = doc['socket-render'].port;
  host = doc['socket-render'].host;
} catch (e) {}

const server = new net.Server();
server.listen(port, host, function() {
  console.log(`Server listening for connection requests on socket ${host}:${port}`);
});

server.on('connection', function(socket) {
  console.log('A new connection has been established.');

  socket.on('data', function(chunk) {
    let data = {};

    try {
      data = JSON.parse(chunk.toString());
    } catch (e) {}

    if (!data.block) {
      socket.write('<div></div>');
      return false;
    }

    let html = h.block[data.block].render(data.params);
    html = beautify(minify.minify(html, {collapseWhitespace: true}), {format: 'html'});

    socket.write(html);
  });

  socket.on('end', function() {
    console.log('Closing connection with the client');
  });

  socket.on('error', function(err) {
    console.log(`Error: ${err}`);
  });
});
