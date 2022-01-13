(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cytoscape')) :
  typeof define === 'function' && define.amd ? define(['cytoscape'], factory) :
  (global = global || self, global.cytoscapeDlbcxttap = factory());
}(this, function () { 'use strict';

  // https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-setdoublecxttaptime
  var INTERVAL = 500;
  function extension(interval) {
      if (interval === void 0) { interval = INTERVAL; }
      var cxted = null;
      this.on('cxttap', function (evt) {
          if (cxted && cxted === evt.target) {
              cxted = null;
              evt.preventDefault();
              evt.stopPropagation();
              evt.target.emit('dblcxt', [evt]);
          }
          else {
              cxted = evt.target;
              setTimeout(function () {
                  if (cxted && cxted === evt.target) {
                      cxted = null;
                      evt.target.emit('dblcxt:timeout', [evt]);
                  }
              }, interval);
          }
      });
      return this; // chainability
  }

  function register(cy) {
      if (!cy) {
          return;
      }
      // Initialize extension
      // Register extension
      var extensionName = 'dblcxt';
      cy('core', extensionName, extension);
      // cy('collection', extensionName, extension);
      // cy('layout', extensionName, extension);
      // cy('renderer', extensionName, extension);
  }
  if (typeof window.cytoscape !== 'undefined') {
      register(window.cytoscape);
  }

  return register;

}));
//# sourceMappingURL=index.js.map
