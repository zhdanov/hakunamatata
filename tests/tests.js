const fs = require('fs');
const Mustache = require('mustache');
const minify = require('html-minifier');
const beautify = require('beautify');

eval(fs.readFileSync(__dirname + '/../h.min.js').toString().substring(13));

const topbarParams = {
  'logo': 'http://ya.ru',
  'menu': [
    {'title': 'Catalog', 'href': '/catalog'},
    {'title': 'About', 'href': '/about'},
  ],
  'links': [
    {'title': 'Archive', 'href': '/archive'},
    {'title': 'Telegram', 'href': '/telegram-link'},
  ]
};

const pageParams = {
  'title': 'My title for page!',
  'topbar': topbarParams,
  'sidebar': [
    {'title':'Item 1', 'href': '/item1'},
    {'title':'Item 2', 'href': '/item2'},
  ]
};

let html = h.block['guide-list'].render(pageParams);
html = beautify(minify.minify(html, {collapseWhitespace: true}), {format: 'html'});

console.log(html);
