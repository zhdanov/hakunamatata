const net = require('net');
const yaml = require('js-yaml');
const fs   = require('fs');
const bemxjst = require('bem-xjst');
const nodeEval = require('node-eval');

let port = 8004;

function evalFile(filename) {
  return nodeEval(fs.readFileSync(filename, 'utf8'), filename);
}

// load config file
try {
  const doc = yaml.safeLoad(fs.readFileSync(__dirname + '/../../config.yml', 'utf8'));
  port = doc['xjst-server'].port;
} catch (e) {
  console.log('Error: config not found');
}

// start server
const server = new net.Server();
server.listen(port, function() {
  console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
  console.log('A new connection has been established.');

  socket.on('data', function(chunk) {
    var data = JSON.parse(chunk.toString());

    if (!data.block) {
      socket.write('<div></div>');
      return false;
    }

    var bemtreePathFile = __dirname + '/../../frontend/_base/' + data.block + '/templates/' + data.block + '.bemtree.js';
    var bemhtmlPathFile = __dirname + '/../../frontend/_base/' + data.block + '/templates/' + data.block + '.bemhtml.js';

    if (!fs.existsSync(bemtreePathFile) || !fs.existsSync(bemhtmlPathFile)) {
      socket.write('<div></div>');
      return false;
    }

    var bemjson = bemxjst.bemtree.compile(evalFile(bemtreePathFile)).apply(data);
    var html = bemxjst.bemhtml.compile(fs.readFileSync(bemhtmlPathFile).toString()).apply(bemjson);

    socket.write(html);
  });

  socket.on('end', function() {
    console.log('Closing connection with the client');
  });

  socket.on('error', function(err) {
    console.log(`Error: ${err}`);
  });
});
