/*
Envolva todo o conteúdo desse arquivo em uma IIFE.
*/
(function() {
  "use strict";

  /*
Crie um objeto chamado `person`, com as propriedades:
    `name`: String
    `lastname`: String
    `age`: Number
Preencha cada propriedade com os seus dados pessoais, respeitando o tipo
de valor para cada propriedade.
*/

  var person = {
    name: "Leandro",
    lastname: "Almeida",
    age: 38
  };

  console.log('Propriedades de "person":');

  /*
Mostre no console, em um array, todas as propriedades do objeto acima.
Não use nenhuma estrutura de repetição, nem crie o array manualmente.
*/
  console.log(Object.keys(person));

  /*
Crie um array vazio chamado `books`.
*/
  var books = [];

  /*
Adicione nesse array 3 objetos, que serão 3 livros. Cada livro deve ter a
seguintes propriedades:
`name`: String
`pages`: Number
*/
  books.push({ name: "Duna", pages: 500 });
  books.push({ name: "Messias de Duna", pages: 120 });
  books.push({ name: "Filhos de Duna", pages: 400 });

  console.log("\nLista de livros:");

  /*
Mostre no console todos os livros.
*/
  console.log(books);
  console.log("\nLivro que está sendo removido:");
  /*
Remova o último livro, e mostre-o no console.
*/
  console.log(books.pop());
  console.log("\nAgora sobraram somente os livros:");
  /*
Mostre no console os livros restantes.
*/
  console.log(books);

  /*
Converta os objetos que ficaram em `books` para strings.
*/

  console.log("\nLivros em formato string:");
  //prof converteu o array em string
  var books2 = JSON.stringify(books);
  // converti o objeto somente, como no enunciado 
  for (var i = 0; i < books.length; i++) books[i] = JSON.stringify(books[i]);

  /*
Mostre os livros nesse formato no console:
*/
  console.log(books); //array de strings
  console.log(books2); // string de array

  /*
Converta os livros novamente para objeto.
*/
  // ?
  console.log("\nAgora os livros são objetos novamente:");
  for (var i = 0; i < books.length; i++) books[i] = JSON.parse(books[i]);
  JSON.parse(books2);

  /*
Mostre no console todas as propriedades e valores de todos os livros,
no formato abaixo:
    "[PROPRIEDADE]: [VALOR]"
*/
  for (var i = 0; i < books.length; i++) {
    console.log("Livro " + (i + 1) + ":");
    for (var prop in books[i]) {
      console.log(prop + ": " + books[i][prop]);
    }
  }

  /*
Crie um array chamado `myName`. Cada item desse array deve ser uma letra do
seu nome. Adicione seu nome completo no array.
*/
  var myName = [
    "L",
    "e",
    "a",
    "n",
    "d",
    "r",
    "o",
    " ",
    "a",
    "n",
    "d",
    "r",
    "a",
    "d",
    "e",
    " ",
    "d",
    "e",
    " ",
    "a",
    "l",
    "m",
    "e",
    "i",
    "d",
    "a"
  ];
  console.log("\nMeu nome é:");

  /*
Juntando todos os itens do array, mostre no console seu nome.
*/
  console.log(myName.join(""));

  console.log("\nMeu nome invertido é:");

  /*
Ainda usando o objeto acima, mostre no console seu nome invertido.
*/
  console.log(myName.reverse().join(""));

  console.log("\nAgora em ordem alfabética:");
  /*
Mostre todos os itens do array acima, odenados alfabéticamente.
*/
  console.log(myName.sort().join("")); // Ladeilmnor heheheh
})();
