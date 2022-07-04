const saveForm = (eventoForm) => {

    eventoForm.preventDefault();
     
     if (isValidFields()) {
       const merchandise = {
         opcao: buyOrSell.value,
         nome: nameOfTheProduct.value,
         valor: valueOfTheProduct.value,
       };
   
       createMerchandise(merchandise);
       clearFields(); 
       updateScreen();
     }
   };

   function updateScreen() {
    const arquivoMerc = leitura_merc(); 
    clearScreen();
    buyOrSell.value = "";

    reducedValue = 0

    for (createRow of arquivoMerc){
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
             
        reducedValue += valorComReplace;
        
        newDiv.innerHTML += `
        <hr class="hr-tipo4" />
        <div class="primeiro">
          <p class="primeiro-sinal">${sinalMaisOuMenos}</p>
          <p class="primeiro-tex">${merchandise.nome}</p>      
          <p class="primeiro-valor"> ${merchandise.valor}</p>
        </div> 
        `;
    }; 

    valorToLocaleString = reducedValue.toFixed(2);
    Math.sign(reducedValue) == -1
      ? (valorToLocaleString = -valorToLocaleString) 
      : valorToLocaleString;
           
    valorToLocaleString = parseFloat(valorToLocaleString).toLocaleString(
       "pt-BR",
    { minimumFractionDigits: 2, style: "currency", currency: "BRL" }
    );    
    
   
  
    let extratos = document.querySelector(".extratos");
    extratos.insertAdjacentElement("afterend", newDiv);
   
    let total = document.querySelector(".total-valor");
    total.textContent = `${valorToLocaleString}`;
    
    let linhaLucroOuDespesa = document.querySelector(".lucro");
    linhaLucroOuDespesa.textContent = `${
    
    /*
      if (Math.sign(reducedValue) == -1) {
      "[despesa]"} else if (Math.sign(reducedValue) === 0) {
        "[ ]"
      } else {"[Lucro]"}
      */
    Math.sign(reducedValue) == -1 ? "[Despesa]" : "[Lucro]"
    
    }`;

  }

  const createRow = (merchandise) => {
    
    valorTotalFinal.push(valorComReplace);
    let reducedValue = valorTotalFinal.reduce((total, atual) => total + atual);
  
    let valorToLocaleString;
    
  };