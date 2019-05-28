/*
Vamos falar um pouco sobre "Futebol". Escolha um campeonato estadual qualquer
para começar o desafio.
Declare uma variável chamada `championship` que receberá o nome do campeonato,
e imprima o nome desse campeonato no console.
*/
var championship = "Champions league";
console.log("O nome do campeonato é", championship);

/*
Declare uma variável chamada `teams`, que receberá um array com 5 elementos.
Os elementos serão nomes de times do campeonato escolhido, e os nomes devem
estar na ordem em que eles aparecem na tabela no momento da solução desse
desafio.
*/
var teams = [
  "manchester",
  "ajax",
  "red socks",
  "britain`s foot",
  "scot`s dwarf"
];

console.log("Os times do campeonato são:", teams)

/*
Crie uma função chamada `showTeamPosition` com as seguintes características:
    - A função deve receber um número por parâmetro;
    - A função deve retornar a frase:
    "O time que está em [POSIÇÃO]º lugar é o [NOME DO TIME].";
    - Onde [POSIÇÃO] é o valor passado por parâmetro e [NOME DO TIME] é o time
    que está nessa posição no array criado acima com os nomes dos times.
    --------------
    Dica: lembre-se que arrays começam no índice zero, então a posição passada
    deve ser sempre um número a mais que o índice do array ;)
    --------------
    - A função só deve retornar a frase acima somente se o time estiver entre
    os 5 primeiros.
    - Se não houver time para a posição passada, deve retornar a mensagem:
    "Não temos a informação do time que está nessa posição."
*/
function showTeamPosition(position) {
  return teams[position - 1]
    ? console.log(
        "O time que está em " +
          position +
          "º lugar é o " +
          teams[position - 1] +
          "."
      )
    : console.log(
        "Não temos a informação do time que está na " + position + "º posição."
      );
}

function showTeamPositionOutro(pos) {
  var index = pos - 1;
  if (teams[index] === undefined) {
    return console.log(
      "Não temos a informação do time que está na " + pos + "º posição."
    );
  }
  return console.log(
    "O time que está em " + pos + "º lugar é o " + teams[index] + "."
  );
}

/*
Escolha 4 times do campeonato selecionado e mostre a posição dele, usando a
função acima. Entre esses 4, adicione 1 que não esteja entre os 5 primeiros.
*/
showTeamPosition(1);
showTeamPosition(2);
showTeamPosition(3);
showTeamPosition(4);
showTeamPosition(7);
showTeamPositionOutro(1);
showTeamPositionOutro(8);

/*
Mostre os números de 20 a 30 no console (inclusive o 30), usando a estrutura de
repetição "while".
*/

function while_20_30(counter) {
  while (counter <= 30) console.log(counter++);
}
while_20_30(20);

/*
Crie uma função chamada `convertToHex`, com as seguintes características:
    - A função recebe uma cor por parâmetro, do tipo string. Exemplo: "red";
    - Escolha 5 cores que serão convertidas do nome da cor para o seu
    equivalente hexadecimal (pode ser qualquer tom);
    - Usando a estrutura switch, verifique se a cor passada por parâmetro é
    algum hexa escolhido. Se for, retorne a frase:
    "O hexadecimal para a cor [COR] é [HEXADECIMAL].";
    - Se a cor passada por parâmetro não estiver entre as selecionadas, mostre
    a frase:
    "Não temos o equivalente hexadecimal para [COR]."
*/

/*
Tente mostrar o hexadecimal de 8 cores diferentes usando a função criada acima.
*/

function convertToHex(color) {
  var hex = undefined;
  switch (color) {
    case "red":
      hex = "#F00";
      break;
    case "green":
      hex = "#0F0";
      break;
    case "blue":
      hex = "#00F";
      break;
    case "white":
      hex = "#FFF";
      break;
    case "black":
      hex = "000";
      break;
    default:
      hex = null;
      break;
  }

  return hex
    ? console.log("O hexadecimal para a cor " + color + " é " + hex + ".")
    : console.log("Não temos o equivalente hexadecimal para " + color + ".");
}

function convertToHex2(color) {
  var hex;
  switch (color) {
    case "red":
      hex = "#F00";
      break;
    case "green":
      hex = "#0F0";
      break;
    case "blue":
      hex = "#00F";
      break;
    case "white":
      hex = "#FFF";
      break;
    case "black":
      hex = "000";
      break;
    default:
      return console.log("Não temos o equivalente hexadecimal para " + color + ".");
  }
  return console.log("O hexadecimal para a cor " + color + " é " + hex + "."); 
}

convertToHex("red");
convertToHex("green");
convertToHex("yeallow");
convertToHex("blue");
convertToHex2("white");
convertToHex2("black");
convertToHex2("purple");
convertToHex2("crinsom");
