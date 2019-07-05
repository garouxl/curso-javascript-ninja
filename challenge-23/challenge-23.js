/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/


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
