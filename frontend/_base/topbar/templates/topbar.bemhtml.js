block('topbar')(
  elem('logo').tag()('img'),
)

block('menu')(
  tag()('ul'),
  elem('item').tag()('li'),
  elem('link').tag()('a')
)
