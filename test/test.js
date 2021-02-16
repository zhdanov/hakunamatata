const fs = require('fs');
const Mustache = require('mustache');
const minify = require('html-minifier');
const beautify = require('beautify');
const path = require("path");
const getDiffHtml = require('./test__get-diff-html.js');
const getLayerList = require('./../build/build__get-layer-list.js');

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

h.test.error = function (filepath, desc = null) {

  console.log("\x1b[31m", path.basename(filepath).split('.').slice(0, -1).join('.') + (desc?' ('+desc+')':''), "\x1b[0m");

  process.exit();
};

h.test.html = function (filepath, html1, html2) {
  if (html1 !== html2) {
    console.log(getDiffHtml(html1, html2));
    h.test.error(filepath);
  }

  h.test.success(filepath);
};

getLayerList().forEach(layer => {
  fs.readdirSync(__dirname + '/../' + layer).map(function (dir) {
    let testsPathDir = __dirname + '/../' + layer + '/' + dir + '/test';

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
