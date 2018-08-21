/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/
// minha versão
/* (function() {
  "use strict";
  function DOM(targetNode) {
    this.element = document.querySelectorAll(targetNode);
  }

  DOM.prototype.on = function(event, callBack) {
    this.handleNodes(this.element, event, callBack, "addEventListener");
  };

  DOM.prototype.off = function(event, callBack) {
    this.handleNodes(this.element, event, callBack, "removeEventListener");
  };

  DOM.prototype.get = function() {
    return this.element;
  };

  DOM.prototype.handleNodes = function(elementList, event, callBack, listener) {
    return elementList.forEach(function(item) {
      item[listener](event, callBack);
    });
  };
  // - forEach, map, filter, reduce, reduceRight, every e some.
  DOM.prototype.forEach = function(callBack) {
    return Array.prototype.forEach.call(this.element, callBack);
  };

  DOM.prototype.map = function(callBack) {
    return Array.prototype.map.call(this.element, callBack);
  };

  DOM.prototype.filter = function(callBack) {
    return Array.prototype.filter.call(this.element, callBack);
  };

  DOM.prototype.reduce = function(callBack) {
    return Array.prototype.reduce.call(this.element, callBack);
  };

  DOM.prototype.reduceRight = function(callBack) {
    return Array.prototype.reduceRight.call(this.element, callBack);
  };

  DOM.prototype.every = function(callBack) {
    return Array.prototype.every.call(this.element, callBack);
  };

  DOM.prototype.some = function(callBack) {
    return Array.prototype.some.call(this.element, callBack);
  };

  DOM.typeofObject = function(obj) {
    var objType = Object.prototype.toString.call(obj);
    return objType.replace(/\[object (\w+)\]/g, "$1").toLowerCase();
  };

  DOM.handleObject = function(obj, type) {
    if (obj === undefined || obj === null) return true;
    var objType = DOM.typeofObject(obj);
    if (objType === type) return true;
    return false;
  };

  DOM.isArray = function(obj) {
    return DOM.handleObject(obj, "array");
  };

  DOM.isObject = function(obj) {
    return DOM.handleObject(obj, "object");
  };
  DOM.isFunction = function(obj) {
    return DOM.handleObject(obj, "function");
  };
  DOM.isNumber = function(obj) {
    return DOM.handleObject(obj, "number");
  };
  DOM.isString = function(obj) {
    return DOM.handleObject(obj, "string");
  };
  DOM.isBoolean = function(obj) {
    return DOM.handleObject(obj, "boolean");
  };
  DOM.isNull = function(obj) {
    return DOM.handleObject(obj, "");
  };

  var $a = new DOM('[data-js="link"]');
  $a.on("click", function clicker(e) {
    e.preventDefault();
    console.log("clicou-meu");
    $a.off("click", clicker);
  });

  console.log("is array:", DOM.isArray([1, 2, 3]));
  console.log(
    "isObject:",
    DOM.isObject({
      atrib: 11,
      attr: true
    })
  );
  console.log(
    "isFunction:",
    DOM.isFunction(function() {
      console.log(1);
    })
  );
  console.log("isNumber:", DOM.isNumber(22));
  console.log("isString:", DOM.isString("teste"));
  console.log("isBoolean:", DOM.isBoolean(true));
  console.log("isNull:", DOM.isNull(undefined));

  console.log("Elementos selecionados:", $a.get());
  console.log("$a é filho de body?", $a.get()[0].parentNode === document.body);

  $a.forEach(function(item) {
    console.log("DOM forEach:", item);
  });
  $a.map(function(item) {
    console.log("DOM map", item);
  });
  console.log("DOM filter:");
  console.log(
    $a.filter(function(item) {
      return typeof item === "object";
    })
  );
  console.log("DOM Reduce:");
  console.log(
    $a.reduce(function(item) {
      console.log(item.innerText);
      return item.value == "link 1";
    })
  );
  console.log("DOM reduceRight:");
  console.log(
    $a.reduceRight(function(item) {
      console.log(item.innerText);
      return item.value !== "link 1";
    })
  );
  console.log("DOM every:");
  console.log(
    $a.every(function(item) {
      console.log(item.innerText);
      return item.value !== "link 1";
    })
  );
  console.log("DOM some:");
  console.log(
    $a.some(function(item) {
      console.log(item.innerText);
      return item.value !== "link 1";
    })
  );
})(); */

// versão curso
(function() {
  ("use strict");

  function DOM(elements) {
    this.element = this.getDOMElements(elements);
  }

  DOM.prototype.getDOMElements = function(elements) {
    return document.querySelectorAll(elements);
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

  //- forEach, map, filter, reduce, reduceRight, every e some.
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

  // isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.

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

  var $a = new DOM('[data-js="link"]');
  $a.on("click", function handleclick(e) {
    e.preventDefault();
    console.log("clicou");
    $a.off("click", handleclick);
  });

  console.log("Elementos selecionados:", $a.get());
  console.log("$a é filho de body?", $a.get()[0].parentNode === document.body);
  $a.forEach(function(item, index) {
    console.log(item, index, item.firstChild.nodeValue);
  });
  var dataJs;
  dataJs = $a.map(function(item) {
    return item.getAttribute("data-js");
  });
  console.log(dataJs);
  dataJs = $a.reduce(function(acc, item, index) {
    return acc + " " + item.getAttribute("data-js") + index;
  }, 0);
  console.log(dataJs);

  var DOM2 = new DOM();
  console.log(DOM2.isArray([1, 2, 3]));
  console.log(DOM.prototype.isArray([1, 2, 3]));
  console.log(DOM.prototype.isNumber(1));
  console.log(DOM.prototype.isString("1"));
  console.log(DOM.prototype.isNull(undefined));
  console.log(DOM.prototype.isNull());
  console.log(DOM.prototype.isFunction(function() {}));
})();
