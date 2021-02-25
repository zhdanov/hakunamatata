const fs = require('fs');

module.exports = function() {

  const list = [
    'common.blocks',
    'desktop.blocks',
    'mobile.blocks',
    'mobile-landscape.blocks',
    'mobile-portrait.blocks',
    'common.bundles'
  ];

  list.forEach(layer => {
    let layerPathDir = __dirname + '/../../frontend/' + layer;

    if (fs.existsSync(layerPathDir)) {
      list.push('../frontend/' + layer);
    }

  });

  return list;

};
