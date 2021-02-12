h.block.menu.render = function (params) {
  const view = params;

  view.list = view.list.map(i=> { i.link=h.render('link', i); return i; });

  return h.render('menu', view);
};
