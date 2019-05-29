/*
Crie um array com 5 items (tipos variados).
*/
var myArr = [1,'2', true,[3,4],function(){}];


/*
Crie uma função chamada `addItem`, que irá adicionar itens no array criado.
A função deverá retornar o array atualizado.
*/
function addItem(newItem) {
  if (!newItem) return "Erro, informe um item!";
    myArr.push(newItem);
    return console.log("Novo array:", myArr);
}

/*
Adicione um novo array ao array criado no início do desafio, com ao menos 3
itens de tipos diferentes, mostrando o resultado no console.
*/
addItem([{obj1:1},'tres', 444])

/*
Mostre no console o segundo elemento desse último array, criado acima, com a
frase:
"O segundo elemento do segundo array é [ELEMENTO]."
*/
console.log('O segundo item desse array é o elemento', myArr[5][1]);

/*
Mostre no console quantos itens tem o primeiro array criado, com a frase:
"O primeiro array tem [QUANTIDADE DE ITENS] itens."
*/
console.log("O primeiro array tem " + myArr.length +" itens.");

/*
Agora mostre no console quantos itens tem o segundo array criado, com a frase:
"O segundo array tem [QUANTIDADE DE ITENS] itens."
*/
console.log("O segundo array tem " + myArr[5].length +" itens.");

/*
Utilizando a estrutura de repetição `while`, mostre no console todos os números
pares entre 10 e 20, inclusive esses 2.
*/
var counter = 10;
while (counter <= 20) {
  if (counter % 2 === 0)
    console.log("O valor par é:", counter);
  counter++
}

/*
Na mesma ideia do exercício acima: mostre agora os números ímpares.
*/
var counter = 10;
while (counter <= 20) {
  if (counter % 2 === 1)
    console.log("O valor impar é:", counter);
  counter++
}

/*
Repita os mesmos exercícios feitos acima, mas agora usando o loop "for".
Só vamos mudar o range:
- No primeiro "for", mostre os números pares entre 100 e 120, inclusive eles;
- No segundo "for", mostre os números ímpares entre 111 e 125, inclusive eles.
*/

for (let index = 100; index <= 120; index++) {
  if (index % 2 === 0)
    console.log("O valor par é:", index);
  index++
}

for (let index = 111; index <= 125; index++) {
  if (index % 2 === 1)
    console.log("O valor par é:", index);
  index++
}
