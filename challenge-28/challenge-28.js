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

(function(DOM) {
  "use strict";
  function app() {
    var $inputCep, $submit, $reset, $status, $logradouro, $bairro, $estado, $cidade, $cep, xhr, clearData;

    function initVariables() {
      $inputCep = new DOM("[data-js='input-cep']");
      $submit = new DOM("[data-js='submit']");
      $reset = new DOM("[data-js='reset']");
      $status = new DOM("[data-js='status']");
      $logradouro = new DOM("[data-js='logradouro']");
      $bairro = new DOM("[data-js='bairro']");
      $estado = new DOM("[data-js='estado']");
      $cidade = new DOM("[data-js='cidade']");
      $cep = new DOM("[data-js='cep']");
      clearData = {
        logradouro: "---",
        bairro: "---",
        uf: "---",
        localidade: "---",
        cep: "---"
      };
    }

    function isCepNotCorrect() {
      var regex = new RegExp("\\d{5}[/.-]?\\d{3}", "g");
      return !regex.test(this);
    }

    function formatCep() {
      return this.replace(/\D/g, "");
    }

    function initXhr() {
      xhr = new XMLHttpRequest();
      xhr.open("get", "https://viacep.com.br/ws/" + this + "/json/");
      xhr.send();
      $status.get().innerText = setStatus.call("loading");
      xhr.addEventListener(
        "readystatechange",
        function() {
          if (isRequestOk.call(this)) handleXhr.call(this);
        },
        false
      );
    }

    function handleXhr() {
      try {
        var data = JSON.parse(this.responseText);
        if (data.hasOwnProperty("erro")) throw new Error("O cep está errado");
        setInfoOnForm.call(data);
        $status.get().innerText = setStatus.call("success");
      } catch (error) {
        $status.get().innerText = setStatus.call("error");
        setInfoOnForm.call(clearData);
      }
    }

    function isRequestOk() {
      return this.readyState === 4 && this.status === 200;
    }

    function setInfoOnForm() {
      $logradouro.get().innerText = this.logradouro;
      $bairro.get().innerText = this.bairro;
      $estado.get().innerText = this.uf;
      $cidade.get().innerText = this.localidade;
      $cep.get().innerText = this.cep;
    }
    
    function setStatus() {
      var status = {
        error: "O CEP está errado!",
        fill: "Por favor insira um Cep válido!",
        loading: "Carregando informações...",
        success: "Informações carregadas!"
      };
      return status[this] || "Mensagem não reconhecida";
    }

    function reset() {
        $inputCep.get().value = "";
        setInfoOnForm.call(clearData);
        $status.get().innerText = "";
    }

    return {
      init: function() {
        initVariables();
        $submit.on(
          "click",
          function(event) {
            event.preventDefault();
            if (isCepNotCorrect.call($inputCep.get().value))
              return ($status.get().innerText = setStatus.call("fill"));
            initXhr.call(formatCep.call($inputCep.get().value));
          },
          false
        );
        $reset.on("click", reset, false);
      }
    };
  }

  var APP = app();
  APP.init();
  
})(window.DOM);

/* 
(function(DOM) {
  ("use strict");

  var app = (function app() {
    var $formCep,
      $inputCep,
      formatedCep,
      $status,
      $logradouro,
      $bairro,
      $estado,
      $cidade,
      $cep,
      ajax;

    function startVariables(params) {
      $formCep = new DOM("[data-js='form-cep']");
      $inputCep = new DOM("[data-js='input-cep']");
      formatedCep = "";
      $status = new DOM("[data-js='status']");
      $logradouro = new DOM("[data-js='logradouro']");
      $bairro = new DOM("[data-js='bairro']");
      $estado = new DOM("[data-js='estado']");
      $cidade = new DOM("[data-js='cidade']");
      $cep = new DOM("[data-js='cep']");
      ajax = new XMLHttpRequest();
    }

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

    return {
      init: function() {
        startVariables();
        $formCep.on("submit", handleSubmitFormCEP);
      },
      getMessage: getMessage, //reavelling module pattern
      clearCEP: clearCEP //reavelling module pattern
    };
  })();

  app.init();
  window.APP = app;
})(window.DOM); */
