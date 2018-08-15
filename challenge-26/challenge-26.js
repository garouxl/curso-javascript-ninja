/*
O desafio dessa semana é criar uma mini library (biblioteca) para
reutilizarmos nossos códigos quando fizermos manipulação de DOM!

Requisitos:
- O nome da lib deve ser "DOM".
- Ela deve ser uma função construtora, que receberá uma string por parâmetro.
Essa string será o nó do DOM a ser selecionado;
- No construtor, você deve atribuir à `this.element` todos os elementos
do DOM selecionados;
- Extenda a lib para ter os métodos `on`, `off` e `get`.
- O método `on` irá adicionar um listener de evento a todos os elementos
selecionados.
- O método `off` irá remover o listener de evento de todos os elementos
selecionados.
- O método `get` deve retornar os elementos.
- O código abaixo deve funcionar corretamente após a lib criada.

Dica: olhe os erros que acontecem no console, e vá resolvendo um a um.
Só passe para o próximo problema quando tiver resolvido o anterior :)
*/
// ?
// minha versão
(function() {
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

  var $a = new DOM('[data-js="link"]');
  $a.on("click", function clicker(e) {
    e.preventDefault();
    console.log("clicou-meu");
    $a.off("click", clicker);
  });

  console.log("Elementos selecionados:", $a.get());
  console.log("$a é filho de body?", $a.get()[0].parentNode === document.body);
})();

// versão curso
(function() {
  "use strict";

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

  var $a = new DOM('[data-js="link"]');
  $a.on("click", function handleclick(e) {
    e.preventDefault();
    console.log("clicou");
    $a.off("click", handleclick);
  });

  console.log("Elementos selecionados:", $a.get());
  console.log("$a é filho de body?", $a.get()[0].parentNode === document.body);
})();
