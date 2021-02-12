const fs = require('fs');
const path = require('path')

const layerList = [
  'common.blocks',
  'common.bundles'
];

const templateList = {};

layerList.forEach(layer => {
  fs.readdirSync(__dirname + '/../' + layer).map(function (dir) {
    const filePathLayerDir = __dirname + '/../' + layer + '/' + dir;

    fs.readdirSync(filePathLayerDir).map(function (file) {
      const filePath = filePathLayerDir + '/' + file;
      if (path.parse(filePath).ext == '.tpl') {
        const templateName = path.parse(filePath).name;
        templateList[templateName] = fs.readFileSync(filePath).toString();
      }
    });

  });
});

fs.appendFileSync(__dirname + '/../.babel-blocks/hakunamatata__init-templates.js', 'h.templates = ' + JSON.stringify(templateList) + ";\n");
