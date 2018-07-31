(function(win, doc) {
  "use strict";

  var DOMInputs;

  function initialize() {
    DOMInputs = {
      visor: doc.querySelector('[data-js="visor"]'),
      buttonsNumbers: doc.querySelectorAll('[data-js="button-number"]'),
      buttonsOperations: doc.querySelectorAll('[data-js="button-operation"]'),
      buttonCE: doc.querySelector('[data-js="button-ce"]'),
      buttonEqual: doc.querySelector('[data-js="button-equal"]')
    };

    setListeners(DOMInputs.buttonsNumbers, handleClickNumber);
    setListeners(DOMInputs.buttonsOperations, handleClickOperation);
    setListeners(DOMInputs.buttonCE, handleClickCE);
    setListeners(DOMInputs.buttonEqual, handleClickEqual);
  }

  function setListeners(target, handler) {
    if (target.length === undefined) {
      return target.addEventListener("click", handler, false);
    }
    Array.prototype.forEach.call(target, function(button) {
      button.addEventListener("click", handler, false);
    });
  }

  function handleClickNumber() {
    DOMInputs.visor.value += this.value;
  }

  function handleClickOperation() {
    DOMInputs.visor.value = removeLastItemIfItIsAnOperator(
      DOMInputs.visor.value
    );
    DOMInputs.visor.value += this.value;
  }

  function handleClickCE() {
    DOMInputs.visor.value = 0;
  }

  function isLastItemAnOperation(number) {
    var operations = ["+", "-", "x", "÷"];
    var lastItem = number.split("").pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    });
  }

  function removeLastItemIfItIsAnOperator(string) {
    if (isLastItemAnOperation(string)) {
      return string.slice(0, -1);
    }
    return string;
  }

  function formatValues(accumulated, actual) {
    return {
      firstValue: accumulated.slice(0, -1),
      operator: accumulated.split("").pop(),
      lastValue: removeLastItemIfItIsAnOperator(actual),
      lastOperator: isLastItemAnOperation(actual) ? actual.split("").pop() : ""
    };
  }

  function getAllValues() {
    return DOMInputs.visor.value.match(/\d+[+x÷-]?/g);
  }

  function operation(firstValue, lastValue, lastOperator, operator) {
    var operators = {
      "+": function() {
        return arguments[0] + arguments[1] + arguments[2];
      },
      "-": function() {
        return arguments[0] - arguments[1] + arguments[2];
      },
      x: function() {
        return arguments[0] * arguments[1] + arguments[2];
      },
      "÷": function() {
        return arguments[0] / arguments[1] + arguments[2];
      }
    };
    return operators[operator](
      Number(firstValue),
      Number(lastValue),
      lastOperator
    );
  }

  function handleClickEqual() {
    DOMInputs.visor.value = removeLastItemIfItIsAnOperator(
      DOMInputs.visor.value
    );
    DOMInputs.visor.value = getAllValues().reduce(function(
      accumulated,
      actual
    ) {
      var formatedValues = formatValues(accumulated, actual);
      return operation(
        formatedValues.firstValue,
        formatedValues.lastValue,
        formatedValues.lastOperator,
        formatedValues.operator
      );
    });
  }

  initialize();
})(window, document);
