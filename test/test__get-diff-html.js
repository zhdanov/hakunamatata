const minify = require('html-minifier');
const beautify = require('beautify');
const gitDiff = require('git-diff')

module.exports = function(html1, html2) {

  html1 = beautify(minify.minify(html1, {collapseWhitespace: true}), {format: 'html'});
  html2 = beautify(minify.minify(html2, {collapseWhitespace: true}), {format: 'html'});

  return gitDiff(html1, html2);

};
