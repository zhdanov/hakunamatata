h.service.debug.api = function (action, params={}) {

  if (!h.service.debug.isDebug()) {
    return false;
  }

  switch (action) {
    case 'alert':
      h.service.debug.alertMessage(params);
    break;
  }

};
