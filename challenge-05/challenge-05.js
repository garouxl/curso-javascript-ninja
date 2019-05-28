/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/
var myArray = [1,"dois", true, false, {prop1: "prop01"}]

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/

function myFunc(arr) {
  return arr;
}

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/
console.log(myFunc(myArray)[1]);

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar o valor de um índice do array que foi passado
no primeiro parâmetro. O índice usado para retornar o valor, deve ser o número passado no
segundo parâmetro.
*/

function returnValues(myArr, index) {
  return myArr[index];
}

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/
var otherVar = [1, null, "tres", true, [1,2], {prop1: 3}];


/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/
console.log(returnValues(otherVar, 0));
console.log(returnValues(otherVar, 1));
console.log(returnValues(otherVar, 2));
console.log(returnValues(otherVar, 3));
console.log(returnValues(otherVar, 4));


/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/

function getBook (bookName) {
  var books = {
    "Duna": {
      quantidadePaginas: "500",
      autor: "Frank Herbert",
      editora: "Nova Fronteira"
    },
    "Cujo": {
      quantidadePaginas: "300",
      autor: "Stephen King",
      editora: "Sextante"
    },
    "It": {
      quantidadePaginas: "1200",
      autor: "King, Stephen",
      editora: "Aurora"
    }
  };
  return bookName ? books[bookName] : books;
}

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/
console.log(getBook());

/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/
var myBook = "Duna";
console.log(
  "O livro " + myBook + " tem " + getBook(myBook).quantidadePaginas + " páginas!"
);


/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/

var myBook = "It";
console.log(
  "O autor do livro " + myBook + " é " + getBook(myBook).autor + "."
);

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/

var myBook = "Cujo";
console.log(
  "O livro " + myBook + " foi publicado pela editora " + getBook(myBook)["editora"] + "."
);

