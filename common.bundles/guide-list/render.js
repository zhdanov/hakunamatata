h.bundle['guide-list'].render = function (params) {

  params.topbar.mix = 'guide-list__topbar';

  const view = {
    'title': params.title,
    'topbar': h.block.topbar.render(params.topbar),
    'sidebar': h.block.menu.render({'list': params.sidebar, 'mix': 'guide-list__sidebar'})
  };

  return h.render('guide-list', view);
};
