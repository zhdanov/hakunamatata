const fs = require('fs');
const getLayerList = require('./build__get-layer-list.js');

const blockList = {};
const bundleList = {};

getLayerList().forEach(layer => {
  fs.readdirSync(__dirname + '/../' + layer).map(function (dir) {
    var filePathLayerDir = __dirname + '/../' + layer + '/' + dir;

    if (layer.indexOf('.blocks') !== -1) {
      blockList[dir] = {};
    } else if (layer.indexOf('.bundles') !== -1) {
      bundleList[dir] = {};
    }


  });
});

fs.appendFileSync(__dirname + '/../.babel-blocks/hakunamatata__init-blocks.js', 'h.block = {}; h.block = ' + JSON.stringify(blockList) + ";\n");
fs.appendFileSync(__dirname + '/../.babel-blocks/hakunamatata__init-blocks.js', 'h.bundle = {}; h.bundle = ' + JSON.stringify(bundleList) + ";\n");
