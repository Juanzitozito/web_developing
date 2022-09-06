const frontendUrl = "//localhost/arquivosphp/web_developing/frontend/";
const backendUrl = "//localhost/arquivosphp/web_developing/backend/";

let modal_noticia = null;

onload = async () => {
  const para = new URLSearchParams(window.location.search);
  /* const modal_noticia = new bootstrap.Modal(
    document.getElementById("noticiaModal")
  ); */
  const mainProductsCol = document.getElementById("prodRelacionados");

  const pass = para.get("id");

  console.log(pass);

  const navbar = document.getElementById("acoes");

  const token = localStorage.getItem("token");

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return (decodedToken = JSON.parse(jsonPayload));
  }

  if (token) {
    parseJwt(token);
    console.log(decodedToken);
  }

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

  const body = new FormData();
  body.append("id", pass);

  const response = await fetch(backendUrl + "produtos/produto.php", {
    method: "POST",
    body,
  });

  const produto = await response.json();

  console.log(produto);

  const MostraNoticia = () => {
    const divDados = document.getElementById("dadosProduto");
    const divImagem = document.getElementById("divimgProduto");
    const divConteudo = document.getElementById("descricao");
    const divAcoes = document.getElementById("divAcoes");

    const nomeProd = document.createElement("h2");
    nomeProd.innerHTML = produto.nome + "<br>";

    const precoProd = document.createElement("h3");
    precoProd.setAttribute("class", "price");
    precoProd.innerHTML = "<u>R$" + produto.preco + "</u>";

    const img = document.createElement("img");
    img.setAttribute("class", "img-fluid rounded");
    img.setAttribute("id", "imgProduto");
    img.src = produto.imagem;

    const descricaoProd = document.createElement("p");
    descricaoProd.innerHTML =
      "<h2>Especificações do produto</h2><br>" + produto.especificacoes;

    const botaoloja = document.createElement("button");
    botaoloja.setAttribute("class", "btn");
    botaoloja.setAttribute("id", "loja");
    botaoloja.innerHTML = "Ir para o site da loja";
    botaoloja.addEventListener("click", () => {
      window.location.href = produto.siteProduto;
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.setAttribute("class", "btn btn-danger");
    botaoExcluir.innerHTML = "excluir";
    botaoExcluir.addEventListener("click", async () => {
      const body = new FormData();
      body.append("id", produto.id);

      const response = await fetch(`${backendUrl}removerProduto.php`, {
        method: "POST",
        body,
      });

      console.log(response);

      if (response.status === 200) {
        location.href = "recommend.html";
      }
    });

    const nome = (document.getElementById("nomeForm").value = produto.nome);
    const descricao = (document.getElementById("descricaoForm").value =
      produto.descricao);
    const especificacoes = (document.getElementById(
      "especificacoesForm"
    ).value = produto.especificacoes);
    document.getElementById("siteProdutoForm").value = produto.siteProduto;
    document.getElementById("precoForm").value = produto.preco;

    const botaoAlterar = document.createElement("button");
    botaoAlterar.setAttribute("class", "btn btn-info");
    botaoAlterar.innerHTML = "alterar";
    botaoAlterar.setAttribute("data-bs-toggle", "modal");
    botaoAlterar.setAttribute("data-bs-target", "#produtoModal");

    const botaoAlteraNot = document.getElementById("alterarProduto");

    botaoAlteraNot.addEventListener("click", async () => {
      const nomeForm = document.getElementById("nomeForm").value;
      const especificacoesForm = document.getElementById("especificacoesForm").value;
      const descricaoForm = document.getElementById("descricaoForm").value;
      const imagemForm = document.getElementById("imagemForm").files[0];
      const siteProdutoForm = document.getElementById("siteProdutoForm").value;
      const precoForm = document.getElementById("precoForm").value;

      const body = new FormData();
      body.append("id", produto.id);
      body.append("nome", nomeForm);
      body.append("especificacoes", especificacoesForm);
      body.append("imagem", imagemForm);
      body.append("siteProduto", siteProdutoForm);
      body.append("descricao", descricaoForm);
      body.append("preco", precoForm);

      const response = await fetch(`${backendUrl}alterarProduto.php`, {
        method: "POST",
        body,
      });

      const status = await response.json();

      if (status.error) {
        alert(status.message);
      }

      window.location.reload();
    });

    divImagem.appendChild(img);
    divDados.appendChild(nomeProd);
    divDados.appendChild(precoProd);
    divConteudo.appendChild(descricaoProd);
    divDados.appendChild(botaoloja);

    if (token) {
      if (
        decodedToken.dados.cargo == "administrador" ||
        decodedToken.dados.cargo == "criador"
      ) {
        divAcoes.appendChild(botaoExcluir);
        divAcoes.appendChild(botaoAlterar);
      }
    }
  };

  const Products = async () => {
    const response = await fetch(backendUrl + "produtos/indexlimit.php");
    const produtos = await response.json();
    console.log(produtos);

    produtos.forEach((prod) => {
      console.log(prod);

      if (produto.id != prod.id) {
        const divItem = document.createElement("div");
        divItem.setAttribute("class", "col-lg-3");

        const divCard = document.createElement("DIV");
        divCard.setAttribute("class", "card prodList");

        const imgCard = document.createElement("img");
        imgCard.setAttribute("class", "card-img-top");
        imgCard.src = prod.imagem;

        const divBody = document.createElement("div");
        divBody.setAttribute("class", "card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        if (prod.nome.length > 38) {
          cardTitle.innerHTML = prod.nome.substring(0, 35) + "...";
        } else {
          cardTitle.innerHTML = prod.nome;
        }

        const cardPrice = document.createElement("h4");
        cardPrice.setAttribute("class", "price");
        cardPrice.innerHTML = "R$ " + prod.preco;

        const cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        if (prod.descricao.length > 53) {
          cardText.innerHTML = prod.descricao.substring(0, 53);
        } else {
          cardText.innerHTML = prod.descricao;
        }

        const botaoIr = document.createElement("button");
        botaoIr.setAttribute("class", "btn ir");
        botaoIr.setAttribute("value", prod.id);
        botaoIr.innerHTML = "ver produto";

        mainProductsCol.appendChild(divItem);
        divItem.appendChild(divCard);
        divCard.appendChild(imgCard);
        divCard.appendChild(divBody);
        divCard.appendChild(botaoIr);
        divBody.appendChild(cardTitle);
        divBody.appendChild(cardPrice);
        divBody.appendChild(cardText);
      }
    });
  };

  await MostraNoticia();
  await Products();
};
