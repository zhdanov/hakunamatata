module.exports = function(h, $, Mustache) {

  const html = `<div class="topbar ">
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
`;

  const params = {
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

  const resp = h.block.topbar.render(params);

  h.test.html(module.filename, html, resp);
}
