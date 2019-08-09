// não utlizado na V2 pois usei os metodos call e apply script principal

/*
v1
(function(win) {
  "use strict";
  var util = function() {
    return {
      setCompanyName: function(ajaxTGT, titleTGT, foneTGT) {
        ajaxTGT.open("GET", "company.json");
        ajaxTGT.send();
        ajaxTGT.addEventListener("readystatechange", function() {
          if (ajaxTGT.readyState === 4 && ajaxTGT.status === 200) {
            titleTGT.innerText = JSON.parse(ajaxTGT.responseText).name;
            foneTGT.innerText = JSON.parse(ajaxTGT.responseText).phone;
          }
        });
      },
      setImage: function(TGTValue) {
        var thImgElement = document.createElement("th");
        thImgElement.appendChild(document.createElement("img"));
        thImgElement.firstElementChild.src = TGTValue;
        return thImgElement;
      },

      showTable: function(TGT) {
        TGT.parentNode.style.opacity = "1";
      },

      isFormNotFilled: function(TGT) {
        var hasError = false;
        TGT.forEach(function(item) {
          item.style.borderColor = item.value === "" ? "red" : "inherit";
          hasError = item.value === "" ? true : false;
        });
        return hasError;
      },

      setMessage: function(TGT, type, color) {
        var messages = {
          formError: 'Existe um campo não preenchido, verifique. ¬¬"',
          waiting: "Aguardando informações. :o)",
          clear: ""
        };

        function formatText(TGTMessage, TGTColor) {
          TGT.innerText = TGTMessage;
          TGT.style.color = TGTColor;
        }

        if (messages[type] === undefined) return formatText(type, color);
        formatText(messages[type], color);
      },

      removeBlock: function name(TGTEntries) {
        TGTEntries.forEach(function(item) {
          item.removeAttribute("disabled");
        });
      },

      verifyField: function name(params) {}
    };
  };
  win.UTIL = util();
})(window); */
