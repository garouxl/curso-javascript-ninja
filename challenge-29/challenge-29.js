(function(DOM, UTIL, win, doc) {
  "use strict";

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function() {
    var $title,
      $fone,
      $submit,
      $status,
      ajax,
      $inputs,
      $tableRow,
      $allFormEntries;

    function startVariables() {
      $title = new DOM("[data-js='companyName']");
      $fone = new DOM("[data-js='companyFone']");
      $status = new DOM("[data-js='status']");
      $submit = new DOM("[data-js='submit']");
      $tableRow = new DOM("[data-js='registered-cars']");
      ajax = new XMLHttpRequest();
      $inputs = new DOM("[data-js='form-register'] input");
      $allFormEntries = new DOM(
        "[data-js='form-register'] input, [data-js='form-register'] button"
      );
    }

    function registerNewCar(e) {
      e.preventDefault();
      if (UTIL.isFormNotFilled($inputs))
        return UTIL.setMessage($status.get()[0], "formError", "red");
      UTIL.setMessage($status.get()[0], "clear", "inherit");
      UTIL.showTable($tableRow.get()[0]);
      writeTable();
    }

    function writeTable() {
      var trElement = doc.createElement("tr");
      var inputs = $inputs.get();
      var formatedData = setRow(trElement, inputs, inputs.length);
      $tableRow.get()[0].appendChild(formatedData);
      UTIL.setMessage(
        $status.get()[0],
        inputs[1].value + " cadastrado! :D",
        "#1c1"
      );
    }

    function setRow(target, targetInputs, targetLength) {
      var imageItem = UTIL.setImage(targetInputs[0].value);
      target.appendChild(imageItem);
      for (var index = 1; index <= targetLength - 1; index++) {
        var thElement = doc.createElement("th");
        thElement.innerText = targetInputs[index].value;
        target.appendChild(thElement);
      }
      return target;
    }

    return {
      init: function() {
        startVariables();
        UTIL.setCompanyName(ajax, $title.get()[0], $fone.get()[0]);
        UTIL.setMessage($status.get()[0], "waiting", "#11f");
        UTIL.removeBlock($allFormEntries);
        $submit.on("click", registerNewCar);
      }
    };
  })();

  win.APP = app;
})(window.DOM, window.UTIL, window, document);

window.setTimeout(function() {
  APP.init();
}, 2000);
