h.block.menu.render = function (params) {
  const view = params;

  view.list = h.map(view.list, i=> { i.link=h.render('link', i); return i; });

  return h.render('menu', view);
};
