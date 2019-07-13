/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/
(function(doc) {
  "use strict";
  let DOM = undefined;

  function initialize() {
    populateVars();
    initEvents();  
  }

  function populateVars () {
    DOM = {
      visor: doc.querySelector("[data-js='visor']"),
      all: doc.querySelectorAll("button"),
      operators: doc.querySelectorAll("[data-js='button-operation']")
    };
  }

  function initEvents() {
    function setEventListeners() {
      return Array.prototype.forEach.call(arguments, function(item) {
        item.addEventListener("click", handleClick, false);
      });
    }
    setEventListeners.apply(setEventListeners, DOM.all);
  }
  
  function handleClick() {
    let that = this;
    let handlers = {
      "button-ce": clear,
      "button-number": setDigit,
      "button-operation": setOperator,
      "button-equal": setCalculation
    };
    return handlers[this.getAttribute("data-js")].call(that);
  }

  function clear() {
    return (DOM.visor.value = "");
  }

  function setDigit() {
    return (DOM.visor.value += this.value);
  }

  function setOperator() {
    return (
      DOM.visor.value = verifyIfLastIsAOperand.call(DOM.visor.value)
      ? DOM.visor.value.slice(0, -1).concat(this.value)
      : DOM.visor.value += this.value
    );
  }

  function setCalculation() {
    if (ifVisorIsEmpty.call(DOM.visor.value))
      return;
    let regexOps = new RegExp("\\d+[" + getOperations() + "]?","g");
    let value = removeLastItemIfOperator
      .call(DOM.visor.value)
      .match(regexOps);
    return DOM.visor.value = execCalculation(value);
  }

  function execCalculation(value) {
    return value.reduce(function(acc, actual) {
      let firstValue = formatAcc(acc).value;
      let operand = formatAcc(acc).operator;
      let lastValue = formatActual(actual).value;
      let lastOperand = formatActual(actual).operator;
      let operation = operationTypes(operand);
      return operation(firstValue, lastValue) + lastOperand;
    });
  }

  function operationTypes(operator) {
    let operation = {
      "+": (value1, value2) => Number(value1) + Number(value2),
      "-": (value1, value2) => Number(value1) - Number(value2),
      "x": (value1, value2) => Number(value1) * Number(value2),
      "÷": (value1, value2) => Number(value1) / Number(value2)
    };
    return operation[operator];
  }

  function getOperations() {
    return Array.prototype.map.call(DOM.operators, function(button) {
      return button.value;
    }).join("");
  }

  function verifyIfLastIsAOperand() {
    var regexOps = new RegExp("[" + getOperations() + "]"); 
    return regexOps.test(this.split("").pop());
  }

  function removeLastItemIfOperator() {
    return verifyIfLastIsAOperand.call(this) ? this.slice(0, -1) : this;
  }

  function ifVisorIsEmpty () {
    return !Boolean(this);
  }
  
  function formatAcc(acc) {
    return {
      value: acc.slice(0, -1),
      operator: acc.split("").pop()
    };
  }

  function formatActual(actual) {
    return {
      value: removeLastItemIfOperator.call(actual),
      operator: verifyIfLastIsAOperand.call(actual) ? actual.split("").pop() : ""
    };
  }

  initialize();

})(document);