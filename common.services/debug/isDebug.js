h.service.debug.isDebug = function () {
  return window.location.href.indexOf('?debug=1') != -1 ? true : false;
};
