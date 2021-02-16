h.bundle.post.render = function (params) {

  params.topbar.mix = 'post__topbar';

  const view = {
    'title': params.title,
    'topbar': h.block.topbar.render(params.topbar),
    'sidebar': h.block.menu.render({'list': params.sidebar, 'mix': 'post__sidebar'})
  };

  return h.render('post', view);
};
