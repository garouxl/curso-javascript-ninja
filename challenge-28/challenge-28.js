/*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

(function() {
  ("use strict");

  function DOM(elements) {
    this.element = this.getDOMElements(elements);
  }

  DOM.prototype.getDOMElements = function(elements) {
    return document.querySelectorAll(elements);
  };

  DOM.prototype.formatCep = function(target) {
    return target.replace(/\D+/g, "");
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

  DOM.prototype.ajax = function(type, url, info, adressObj) {
    var ajax = new XMLHttpRequest();
    ajax.open(type, url);
    ajax.send();
    ajax.addEventListener(
      "readystatechange",
      function() {
        var states = {
          readyState1_status200: function() {
            return (info.lastChild.innerText = "Iniciando...");
          },
          readyState2_status200: function() {
            return (info.lastChild.innerText = "Recebendo...");
          },
          readyState3_status200: function() {
            return (info.lastChild.innerText = "Carregando...");
          },
          readyState4_status200: function() {
            info.lastChild.innerText = "Finalizado";
            adressObj.logradouro.value = JSON.parse(
              ajax.responseText
            ).logradouro;
            adressObj.bairro.value = JSON.parse(ajax.responseText).bairro;
            adressObj.estado.value = JSON.parse(ajax.responseText).uf;
            adressObj.cidade.value = JSON.parse(ajax.responseText).localidade;
            adressObj.cep.value = JSON.parse(ajax.responseText).cep;
          }
        };
        try {
          states["readyState" + ajax.readyState + "_status" + ajax.status]();
        } catch (error) {
          info.lastChild.innerText = "Houve um erro:\n" + error;
        }
      },
      false
    );
  };

  var $submit = new DOM('[data-js="submit"]');
  $submit.on("click", function(e) {
    e.preventDefault();
    var $cep = document.querySelector("[data-js='search']");
    var $info = document.querySelector("[data-js='info']");
    var adressObj = {
      logradouro: document.querySelector("[data-js='logradouro']"),
      bairro: document.querySelector("[data-js='bairro']"),
      estado: document.querySelector("[data-js='estado']"),
      cidade: document.querySelector("[data-js='cidade']"),
      cep: document.querySelector("[data-js='cep']")
    };
    var cepUrl =
      "https://viacep.com.br/ws/" + $submit.formatCep($cep.value) + "/json/";
    $submit.ajax("GET", cepUrl, $info, adressObj);
  });
})();
