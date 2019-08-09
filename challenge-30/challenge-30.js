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


//V2
(function(win, doc, DOM, XHR) {
  "use strict";
  let app = (() => {
    const $inputs = DOM('[data-js="form-register"] input');
    const $submit = DOM('[data-js="submit"]');
    const $reset = DOM('[data-js="reset"]');
    const $status = DOM('[data-js="status"]');
    const $table = DOM('[data-js="registered-cars"]');
    
    return {
      init: function init () {
        app.setCompanyName(setCompanyInfo);
        app.removeBlock.call($inputs); //o metodo só aceita array como param
        app.removeBlock.apply($submit, $submit); //aqui o 2o param é um array
        $submit.on("click", app.handleSubmit);
        $reset.on("click", app.reset);
      },

      setCompanyName: function setCompanyName(callBack) {
        const getCompany = XHR("company.json", "get", "text", callBack);
        getCompany.init();
      },

      removeBlock: function removeBlock() {
        return Array.prototype.forEach.call(this.element, function(item) {
          item.removeAttribute("disabled");
        });
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        let events = {
          true: () => {
            let inputsData = getData.apply($inputs);
            setStatusMessage.call($status,"none");
            populateTableHeader.call(inputsData, $table);
            populateTableBody.call(inputsData, $table);
            showTable.call($table.get());
            setStatusMessage.call($status,"success");
          },
          false: () => {
            setStatusMessage.call($status,"error");
          }
        };
        events[validateFields.call($inputs).toString()]();
      },

      reset: function reset(event) {
        event.preventDefault();
        $inputs.forEach(item => {
          item.value = "";
          item.classList.value = item.classList.remove("error");
        });
        setStatusMessage.call($status, "none");
      }
    };

    function setCompanyInfo(data) {
      const $company = DOM('[data-js="companyInfo"]');
      $company.get().firstElementChild.textContent = data.name;
      $company.get().lastElementChild.textContent = data.phone;
    }

    function validateFields() {
      let evaluetad = this.map(function(item) {
        evaluateField.call(item);
        return Boolean(item.value.length);
      });
      return evaluetad.every(item => {
        return item === true;
      });
    }

    function evaluateField() {
      if (this.value === ""){
        this.placeholder = formatInput.call(this);
        return this.classList.add("error")
      }
      return this.classList.remove("error");
    }

    function formatInput() {
      console.log("this:",this);
        let type = this.title;
        let errorMessages = {
          imagem: {
            message: "informe uma url de imagem"
          },
          placa: {
            message: "placa inválida"
          },
          ano: {
            message: "ano inválido"
          },
          cor: {
            message: "informe uma cor"
          },
          modelo: {
            message: "informe um modelo"
          }
        }
      return errorMessages[type] 
        ? errorMessages[type].message
        : "Campo inválido";
    } 

    function setStatusMessage(message) {
      const statusMessage = {
        error: "Preencha o campo sinalizado em vermelho",
        success: "Carro cadastrado com sucesso",
        none: ""
      };
      this.get().innerText = statusMessage[message];
    }

    function getData() {
      return this.map(item => {
        return { name: item.id, value: item.value };
      });
    }

    function showTable() {
      if (!this.classList.contains("show"))
        return this.classList.add("show");
    }

    function isTableHeaderRendered() {
      return Boolean(this.get().querySelector("thead tr th"));
    }

    function populateTableHeader(table) {
      if ( isTableHeaderRendered.call(table) )
        return;
      let domFragmentHeader = doc.createDocumentFragment();
      this.forEach(item => {
        let $th = doc.createElement("th");
        $th.innerText = item.name;
        domFragmentHeader.appendChild($th);
      });
      table.get().children[1].firstElementChild.appendChild(domFragmentHeader);
    }

    function populateTableBody(table) {
      let domFragmentBody = doc.createDocumentFragment();
      let $tr = doc.createElement("tr");
      this.forEach(item => {
        let $td = doc.createElement("td");
        if (item.name === "imagem") {
            let $img = doc.createElement("img");
            $img.setAttribute("src", item.value);
            $td.appendChild($img);
            return $tr.appendChild($td);
        }
        $td.innerText = item.value;
        return $tr.appendChild($td);
      });
      domFragmentBody.appendChild($tr);
      table.get().lastElementChild.appendChild(domFragmentBody);
    }   
  })();
  win.app = app;
})(window, document, window.DOM, window.XHR);

app.init();
