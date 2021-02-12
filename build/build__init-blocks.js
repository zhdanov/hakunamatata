const fs = require('fs');

var layerList = [
  'common.blocks',
  'common.bundles'
];

const blockList = {};

layerList.forEach(layer => {
  fs.readdirSync(__dirname + '/../' + layer).map(function (dir) {
    var filePathLayerDir = __dirname + '/../' + layer + '/' + dir;

    blockList[dir] = {};

  });
});

fs.appendFileSync(__dirname + '/../.babel-blocks/hakunamatata__init-blocks.js', 'h.block = {}; h.block = ' + JSON.stringify(blockList) + ";\n");
