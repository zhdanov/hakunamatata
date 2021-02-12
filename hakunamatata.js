var h = {};

h.render = function (name, view, el = null) {
  return Mustache.render(h.templates[name], view, h.templates);
};

h.map = $.map;
