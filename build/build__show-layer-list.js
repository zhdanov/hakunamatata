const getLayerList = require('./build__get-layer-list.js');

let list = getLayerList();

// filter
if (process.argv[2]) {
  const filter = process.argv[2];
  if (filter.substring(0,1) == '!') {
    if (filter.length > 1) {
      list = list.filter(f=>f.indexOf(filter.substring(1))==-1);
    }
  } else {
    list = list.filter(f=>f.indexOf(filter)!=-1);
  }
}

// postfix
if (process.argv[3]) {
  const postfix = process.argv[3];
  list = list.map(m=>m+postfix);
}

// prefix
if (process.argv[4]) {
  const prefix = process.argv[4];
  list = list.map(m=>prefix+m);
}

console.log(list.join(' '));
