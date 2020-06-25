/**
 * Component example (extends).
 *
 * @author Yuriy Zhdanov <yuriy.zhdanov@gmail.com>
 *
 */
(function( H, example ) {

  // public method (extends base component)
  example.getList = function() {
    return example.itemList;
  };

}( window.H = window.H || {}, H.example = H.example || {}));
