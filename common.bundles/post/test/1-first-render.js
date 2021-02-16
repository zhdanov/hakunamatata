module.exports = function(h, $, Mustache) {

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My title for page!</title>
</head>
<body>
  <div class="topbar post__topbar">
  <img class="topbar__logo" src="http://ya.ru" alt="">
  <ul class="menu topbar__menu">
    <li class="menu__item"><a href="/catalog">Catalog</a>
</li>
    <li class="menu__item"><a href="/about">About</a>
</li>
</ul>

  <ul class="menu topbar__links">
    <li class="menu__item"><a href="/archive">Archive</a>
</li>
    <li class="menu__item"><a href="/telegram-link">Telegram</a>
</li>
</ul>

</div>

  <div class="sidebar">
    <ul class="menu post__sidebar">
    <li class="menu__item"><a href="/item1">Item 1</a>
</li>
    <li class="menu__item"><a href="/item2">Item 2</a>
</li>
</ul>

  </div>
</body>
</html>
`;

  const topbarParams = {
    'logo': 'http://ya.ru',
    'menu': [
      {'title': 'Catalog', 'href': '/catalog'},
      {'title': 'About', 'href': '/about'},
    ],
    'links': [
      {'title': 'Archive', 'href': '/archive'},
      {'title': 'Telegram', 'href': '/telegram-link'},
    ]
  };

  const pageParams = {
    'title': 'My title for page!',
    'topbar': topbarParams,
    'sidebar': [
      {'title':'Item 1', 'href': '/item1'},
      {'title':'Item 2', 'href': '/item2'},
    ]
  };

  const resp = h.bundle.post.render(pageParams);

  if (html !== resp) {
    h.test.error(module.filename, null, {type: 'diff-html', html1: html, html2: resp});
  }

  h.test.success(module.filename);
}
