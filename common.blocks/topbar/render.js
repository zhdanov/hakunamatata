h.block.topbar.render = function (params) {

  const view = {
    'logo': {'src': params.logo},
    'menu': h.block.menu.render({'list':params.menu, 'mix': 'topbar__menu'}),
    'links': h.block.menu.render({'list':params.links, 'mix': 'topbar__links'}),
    'mix': params.mix || ''
  };

  return h.render('topbar', view);
};
