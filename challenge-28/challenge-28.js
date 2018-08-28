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

  var $formCep = new DOM("[data-js='form-cep']");
  var $inputCep = new DOM("[data-js='input-cep']");
  var formatedCep = "";
  $formCep.on("submit", handleSubmitFormCEP);
  var $status = new DOM("[data-js='status']");
  var $logradouro = new DOM("[data-js='logradouro']");
  var $bairro = new DOM("[data-js='bairro']");
  var $estado = new DOM("[data-js='estado']");
  var $cidade = new DOM("[data-js='cidade']");
  var $cep = new DOM("[data-js='cep']");
  var ajax = new XMLHttpRequest();

  function handleSubmitFormCEP(event) {
    event.preventDefault();
    formatedCep = clearCEP();
    var url = getUrl();
    ajax.open("GET", url);
    ajax.send();
    getMessage("loading");
    ajax.addEventListener("readystatechange", handleReadyStateChange);
  }

  function getUrl() {
    return replaceCEP("https://viacep.com.br/ws/[CEP]/json/");
  }

  function clearCEP() {
    return $inputCep.get()[0].value.replace(/\D/g, "");
  }

  function handleReadyStateChange() {
    if (isRequestOk()) {
      getMessage("ok");
      fillCepFields();
    }
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status == 200;
  }

  function fillCepFields() {
    var data = parseData();
    if (data.hasOwnProperty("erro")) {
      //API do correio não entrega mais erro
      getMessage("error");
      data = clearData();
    }
    $logradouro.get()[0].textContent = data.logradouro;
    $bairro.get()[0].textContent = data.bairro;
    $estado.get()[0].textContent = data.uf;
    $cidade.get()[0].textContent = data.localidade;
    $cep.get()[0].textContent = data.cep;
  }

  function clearData() {
    return {
      logradouro: "-",
      bairro: "-",
      uf: "-",
      localidade: "-",
      cep: "-"
    };
  }

  function parseData() {
    var result = null;
    try {
      result = JSON.parse(ajax.responseText);
    } catch (e) {
      result = null;
    }
    return result;
  }

  function getMessage(type) {
    var messages = {
      loading: replaceCEP("Buscando informações para o CEP: [CEP]."),
      ok: replaceCEP("Endereço referente ao CEP: [CEP]."),
      error: replaceCEP("Não encontramos o endereço para o CEP: [CEP].")
    };
    $status.get()[0].textContent = messages[type];
  }

  function replaceCEP(message) {
    return message.replace("[CEP]", formatedCep);
  }
})();
