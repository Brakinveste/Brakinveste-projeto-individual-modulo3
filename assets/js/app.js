let buyOrSell = document.getElementById("tipo-select");
let nameOfTheProduct = document.getElementById("tipo_mercadoria");
let valueOfTheProduct = document.getElementById("tipo_valor");

let valorComReplace;
let valorTotalFinal = [];

const conta = document.querySelector(".conta");
const contaFilho = conta.lastElementChild; 

let textoSemMercadoriaCadastrada = document.createElement("p");
textoSemMercadoriaCadastrada.textContent = "Nada registrado por enquanto.";
textoSemMercadoriaCadastrada.className = "novoTexto";
if (localStorage.length == 0) {
  conta.appendChild(textoSemMercadoriaCadastrada);
}

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("arquivo_merc")) || [];
const setLocalStorage = (arquivoMerc) =>
  localStorage.setItem("arquivo_merc", JSON.stringify(arquivoMerc));


const leitura_merc = () => getLocalStorage();

const clearFields = () => {
  buyOrSell.focus();
  nameOfTheProduct.value = "";
  valueOfTheProduct.value = "";
};

const createMerchandise = (merchandise) => {
  const arquivoMerc = getLocalStorage();
  arquivoMerc.push(merchandise);
  setLocalStorage(arquivoMerc);
};

const isValidFields = () => {
  
  return document.getElementById("form").reportValidity();
};

const saveForm = () => {
  
  if (isValidFields()) {
    const merchandise = {
      opcao: buyOrSell.value,
      nome: nameOfTheProduct.value,
      valor: valueOfTheProduct.value,
    };

    createMerchandise(merchandise);
    clearFields(); 
  }
};

const createRow = (merchandise) => {
    
  let newDiv = document.createElement("div");
  newDiv.className = "apagaInicio"; 

  let sinalMaisOuMenos = merchandise.opcao;
  sinalMaisOuMenos == 0 ? (sinalMaisOuMenos = "-") : (sinalMaisOuMenos = "+");
  
  let frame = document.querySelector(".frame");
  frame.style.display = "block";
  
  valorComReplace = sinalMaisOuMenos + merchandise.valor;
  valorComReplace = Number(valorComReplace
    .replaceAll(".", "")
    .replaceAll(",", "."));
  valorTotalFinal.push(valorComReplace);
  let reducedValue = valorTotalFinal.reduce((total, atual) => total + atual);
  
  let valorToLocaleString;
  valorToLocaleString = reducedValue.toFixed(2);
  Math.sign(reducedValue) == -1
    ? (valorToLocaleString = -valorToLocaleString) // Fiz isso pro 1º valor não mostrar o sinal "negativo" na tela num caso de "compra"
    : valorToLocaleString;
  valorToLocaleString = parseFloat(valorToLocaleString).toLocaleString(
    "pt-BR",
    { minimumFractionDigits: 2, style: "currency", currency: "BRL" }
  );
  
  newDiv.innerHTML += `
  <hr class="hr-tipo4" />
  <div class="primeiro">
    <p class="primeiro-sinal">${sinalMaisOuMenos}</p>
    <p class="primeiro-tex">${merchandise.nome}</p>      
    <p class="primeiro-valor">R$ ${merchandise.valor}</p>
  </div> 
  `;
  
  let extratos = document.querySelector(".extratos");
  extratos.insertAdjacentElement("afterend", newDiv);
  
  let total = document.querySelector(".total-valor");
  total.textContent = `${valorToLocaleString}`;
  
  let linhaLucroOuDespesa = document.querySelector(".lucro");
  linhaLucroOuDespesa.textContent = `${
    Math.sign(reducedValue) == -1 ? "[Despesa]" : "[Lucro]"
  }`;
};


const clearScreen = () => {
  const rows = document.querySelectorAll(".apagaInicio");
  rows.forEach((row) => row.remove());
};

function updateScreen() {
  const arquivoMerc = leitura_merc(); 
  clearScreen();
  buyOrSell.value = "";
  arquivoMerc.forEach(createRow); 
}

updateScreen();

function limpaLocalStorage() {
  let alertaSobreExclusao = confirm("Tem certeza que deseja limpar todos os registros?");

  if (alertaSobreExclusao) {
    localStorage.clear();
    contaFilho.remove();
    location.reload();
  } else {
    return false;
  }

  buyOrSell.value = "";
}

function abrirMenu() {
  let botaoMenuX = document.querySelector(".menu");
  const mediaTablet = window.matchMedia("(min-width: 768px)");

  mediaTablet.matches
    ? botaoMenuX.classList.add("menu-tablet")
    : botaoMenuX.classList.add("menu-celular");
}

function fecharMenu() {
  let botaoMenuX = document.querySelector(".menu");

  botaoMenuX.classList.remove("menu-celular");
  botaoMenuX.classList.remove("menu-tablet");
}

function testaCampoValor() {
  let elemento = document.getElementById("tipo_valor");
  let valor = elemento.value;
  
  valor = valor.toString();
  valor = valor.replace(/[\D]+/g, "");
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length >= 6) {
    while (/([0-9]{4})[,|.]/g.test(valor)) {
      valor = valor.replace(/([0-9]{2})$/g, ",$1");
      valor = valor.replace(/([0-9]{3})[,|.]/g, ".$1");
    }
  }

  elemento.value = valor;
  
}
