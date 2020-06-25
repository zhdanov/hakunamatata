/**
 * Component example.
 *
 * @author Yuriy Zhdanov <yuriy.zhdanov@gmail.com>
 *
 */
(function( H, example ) {

  // private property
  const isHot = true;

  // public property
  example.itemList = [];

  // public method
  example.addItem = function( item ) {
    example.itemList.push(item + '-' + randomInt(0, 10));
  };

  // private method
  function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

}( window.H = window.H || {}, H.example = H.example || {}));
