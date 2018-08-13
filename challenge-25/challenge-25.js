/*
Essa semana você terá dois desafios:
1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
o que não ficou tão claro das aulas anteriores.
É essencial que você entenda todo o conteúdo que foi passado até aqui,
para que possamos prosseguir para a parte mais avançada do curso :D

2) Estudar eventos!
Acesse a página do MDN:
https://developer.mozilla.org/en-US/docs/Web/Events#Categories

Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
desafio os experimentos legais que você conseguir desenvolver :D
*/

/** Quebrador de texto, ira quebrar o texto de acordo com a altura do elemento
 * O alvo deverá possuir um max-height configurado;
 * podem ser inseridos mais parâmetros via global import no array de itens;
 * FALSE irá quebrar por palavra e TRUE irá quebrar por letra;
 */

(function(targetArr) {
  "use strict";
  var ellipsis = (function() {
    function textAddTitle(target) {
      if (
        target.getAttribute("title") !== target.innerHTML &&
        target.getAttribute("title") !== null
      )
        return;
      return target.setAttribute("title", target.innerHTML);
    }

    function textReset(target) {
      return (target.innerHTML = target.getAttribute("title"));
    }

    function textSetOverFlow(target) {
      return (target.style.overflow = "hidden");
    }

    function textVerifier(target) {
      textAddTitle(target);
      textReset(target);
      textSetOverFlow(target);
    }

    function textSplitter(target) {
      return target.innerHTML.split(" ");
    }

    function removeChar(target) {
      return target.replace(/[\s,\.;?!]$/, "");
    }

    function halfWord(target) {
      while (target.scrollHeight > target.offsetHeight) {
        var cropped = target.textContent.substring(
          0,
          target.textContent.length - 5
        );
        target.textContent = removeChar(cropped) + " ...";
      }
      return target;
    }

    function fullWord(target, arr) {
      while (target.scrollHeight > target.offsetHeight) {
        arr.pop();
        arr[arr.length - 1] = removeChar(arr[arr.length - 1]);
        target.innerHTML = arr.join(" ") + " ...";
      }
      return target;
    }

    function loopHalfWord(target) {
      if (target.scrollHeight <= target.offsetHeight) return false;
      return loopHalfWord(halfWord(target));
    }

    return {
      init: function(target, breakWord) {
        try {
          textVerifier(target);
          breakWord ? halfWord(target) : fullWord(target, textSplitter(target));
        } catch (error) {
          console.warn("Houve um erro:", error);
        }
      }
    };
  })();

  window.addEventListener("load", function(event) {
    targetArr.forEach(function(item) {
      ellipsis.init(item[0], item[1]);
    });
  });

  window.addEventListener("resize", function(event) {
    targetArr.forEach(function(item) {
      ellipsis.init(item[0], item[1]);
    });
  });
})([[document.querySelector(".ad-text"), true]]);
