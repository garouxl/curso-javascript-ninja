(function(win, doc) {
  "use strict";

  function DOM(elements) {
    this.element = this.getDOMElements(elements);
  }

  DOM.prototype.getDOMElements = function(elements) {
    return doc.querySelectorAll(elements);
  };

  DOM.prototype.on = function(eventType, callBack) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(eventType, callBack, false);
    });
  };

  DOM.prototype.off = function(eventType, callBack) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(eventType, callBack, false);
    });
  };

  DOM.prototype.get = function() {
    return this.element;
  };

  DOM.prototype.forEach = function() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  function handleObject(obj, type) {
    var objType = Object.prototype.toString.call(obj);
    return objType === type;
  }

  DOM.prototype.isArray = function(param) {
    return handleObject(param, "[object Array]");
  };

  DOM.prototype.isObject = function(param) {
    return handleObject(param, "[object Object]");
  };

  DOM.prototype.isFunction = function(param) {
    return handleObject(param, "[object Function]");
  };

  DOM.prototype.isNumber = function(param) {
    return handleObject(param, "[object Number]");
  };

  DOM.prototype.isString = function(param) {
    return handleObject(param, "[object String]");
  };

  DOM.prototype.isBoolean = function(param) {
    return handleObject(param, "[object Boolean]");
  };

  DOM.prototype.isNull = function(param) {
    return (
      handleObject(param, "[object Null]") ||
      handleObject(param, "[object Udenfined]")
    );
  };

  window.DOM = DOM;
})(window, document);
