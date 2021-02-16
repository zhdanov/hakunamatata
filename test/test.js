const fs = require('fs');
const Mustache = require('mustache');
const minify = require('html-minifier');
const beautify = require('beautify');
const path = require("path");
const getDiffHtml = require('./test__get-diff-html.js');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

const $ = jQuery = require('jquery')(window);

eval(fs.readFileSync(__dirname + '/../h.min.js').toString().substring(13));

h.test = {};

h.test.success = function (text) {
  console.log("\x1b[32m", path.basename(text).split('.').slice(0, -1).join('.'), "\x1b[0m");
};

h.test.error = function (filepath, desc = null, params = null) {

  console.log("\x1b[31m", path.basename(filepath).split('.').slice(0, -1).join('.') + (desc?' ('+desc+')':''), "\x1b[0m");

  if (params.type && params.type === 'diff-html' && params.html1 && params.html2) {
    console.log(getDiffHtml(params.html1, params.html2));
  }

  process.exit();
};

var layerList = [
  'common.blocks',
  'common.bundles'
];

layerList.forEach(layer => {
  fs.readdirSync(__dirname + '/../' + layer).map(function (dir) {
    var testsPathDir = __dirname + '/../' + layer + '/' + dir + '/test';

    if (fs.existsSync(testsPathDir)) {
      let files = fs.readdirSync(testsPathDir);

      if (files.length) {
        console.log(layer + '/' + dir);
      }

      files.filter((f)=>{return !f.match(/^\..*\.swp$/);}).forEach((f) => {
        let test =require(testsPathDir + '/'+f);
        test(h, $, Mustache);
      });
    }

  });
});
