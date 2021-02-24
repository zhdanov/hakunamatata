const getLayerList = require('./build__get-layer-list.js');

let list = getLayerList();

// filter
if (process.argv[2]) {
  const filter = process.argv[2];
  list = list.filter(f=>f.indexOf(filter)!=-1);
}

// postfix
if (process.argv[3]) {
  const postfix = process.argv[3];
  list = list.map(m=>m+postfix);
}

console.log(list.join(' '));
