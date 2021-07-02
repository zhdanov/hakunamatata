module.exports = function(h, $, Mustache) {

  dom.reconfigure({ url: 'https://local.loc/?debug=1' });
  h.test.t(h.service.debug.isDebug(), module.filename, 'debug on');

  dom.reconfigure({ url: 'about:blank' });
  h.test.f(h.service.debug.isDebug(), module.filename, 'debug off');

}
