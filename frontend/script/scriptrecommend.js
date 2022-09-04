const frontendUrl = "//localhost/arquivosphp/web_developing/frontend/";
const backendUrl = "//localhost/arquivosphp/web_developing/backend/";

let btnLogin = null;
let btnLogout = null;
let btnPerfil = null;

onload = async () => {
  const btnInserir = document.getElementById('inserirProduto')
  const mainProductsCol = document.getElementById('rowItens')
  
  const navbar = document.getElementById("acoes");

  const token = localStorage.getItem("token");

  const btnLogout = document.createElement("BUTTON");
  btnLogout.setAttribute("type", "button");
  btnLogout.setAttribute("class", "btn");
  btnLogout.setAttribute("style", "background-color: red");
  btnLogout.innerHTML = "Logout";

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });

  const btnLogin = document.createElement("BUTTON");
  btnLogin.setAttribute("type", "button");
  btnLogin.setAttribute("class", "btn");
  btnLogin.innerHTML = "Login";
  btnLogin.addEventListener("click", () => {
    location.href = frontendUrl + "login.html";
  });

  const btnPerfil = document.createElement("BUTTON");
  btnPerfil.setAttribute("type", "button");
  btnPerfil.setAttribute("class", "btn");
  btnPerfil.innerHTML = "Ver Perfil";
  btnPerfil.addEventListener("click", () => {
    location.href = frontendUrl + "profile.html";
  });

  if (token) {
    navbar.appendChild(btnPerfil);
    navbar.appendChild(btnLogout);
  } else {
    navbar.appendChild(btnLogin);
  }

  document.querySelectorAll(".prod").forEach((item) => {
    item.addEventListener("click", () => {
      window.location.replace("produto.html");
    });
  });

  btnInserir.addEventListener("click", async () => {
    /* const idAutor = decodedToken.dados.id; */
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").files[0];
    const especificacoes = document.getElementById("especificacoes").value;
    const siteProduto = document.getElementById("siteProduto").value;
    const preco = document.getElementById("preco").value;

    const body = new FormData();
    body.append("nome", nome);
    /* body.append("idAutor", idAutor); */
    body.append("descricao", descricao);
    body.append("imagem", imagem);
    body.append("especificacoes", especificacoes);
    body.append("siteProduto", siteProduto);
    body.append("preco", preco);

    const response = await fetch(`../backend/inserirProd.php`, {
      method: "POST",
      body 
    });

    const resposta = await response.json();

    console.log(btnInserir)

    if (resposta.error) {
      alert(resposta.message);
    }else{
      window.location.reload();
    }

     
  });

  const Products = async () => {
    const response = await fetch(backendUrl + "produtos/index.php");
    const produtos = await response.json();
    console.log(produtos);

    
      produtos.forEach((prod) => {
        console.log(prod);
         
         
           //divcard

           //img

           //divbody
           // -> title
           // -> text

           const divItem = document.createElement('div')
           divItem.setAttribute('class', 'col-lg-3')

           const divCard = document.createElement('DIV')
           divCard.setAttribute('class', 'card prod')
           
           const imgCard = document.createElement('img')
           imgCard.setAttribute('class', 'card-img-top')
           imgCard.src = prod.imagem

           const divBody = document.createElement('div')
           divBody.setAttribute('class', 'card-body')

           const cardTitle = document.createElement('h5')
           cardTitle.setAttribute('class', 'card-title')
           cardTitle.innerHTML = prod.nome

           const cardPrice = document.createElement('h4')
           cardPrice.setAttribute('class', 'price')
           cardPrice.innerHTML = prod.preco

           const cardText = document.createElement('p')
           cardText.setAttribute('class', 'card-text')
           cardText.innerHTML = prod.descricao

           const botaoIr = document.createElement('button')
           botaoIr.setAttribute('class', 'btn ir')
           botaoIr.setAttribute("value", prod.id);
           botaoIr.innerHTML = "ver produto";


           mainProductsCol.appendChild(divItem)
           divItem.appendChild(divCard)
           divCard.appendChild(imgCard)
           divCard.appendChild(divBody)
           divCard.appendChild(botaoIr)
           divBody.appendChild(cardTitle)
           divBody.appendChild(cardPrice)
           divBody.appendChild(cardText)
        
      });
   
  };

  await Products();

  const botoes = document.querySelectorAll(".ir");

  botoes.forEach((bt) => {
    console.log(bt.value);

    bt.addEventListener("click", async () => {
      const para = new URLSearchParams();

      para.append("id", bt.value);

      location.href =
        "//localhost/arquivosphp/web_developing/frontend/produto.html?" + para.toString();
    });
  });
};
