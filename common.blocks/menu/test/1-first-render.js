module.exports = function(h, $, Mustache) {

  const html = `<ul class="menu ">
    <li class="menu__item"><a href="/catalog">Catalog</a>
</li>
    <li class="menu__item"><a href="/about">About</a>
</li>
</ul>
`;

  const params = {
    'list': [
      {'title': 'Catalog', 'href': '/catalog'},
      {'title': 'About', 'href': '/about'},
    ]
  };

  const resp = h.block.menu.render(params);

  h.test.html(module.filename, html, resp);
}
