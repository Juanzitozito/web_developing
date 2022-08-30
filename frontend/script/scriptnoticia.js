const frontendUrl = "//localhost/web_developing/frontend/";
const backendUrl = "//localhost/web_developing/backend/";

let btnInserir = null;
let btnLogout = null;
let btnPerfil = null;

onload = async () => {
  const para = new URLSearchParams(window.location.search);

  const pass = para.get("id");

  console.log(pass);

  const btnInserir = document.getElementById("inserirNoticia");
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

  const response = await fetch(backendUrl + "noticias/noticia.php", {
    method: "POST",
    body,
  });

  const noticia = await response.json();

  console.log(noticia);

  const MostraNoticia = () => {
    const divTitulo = document.getElementById("titulo");
    const divImagem = document.getElementById("divImagem");
    const divConteudo = document.getElementById("conteudo");
    const divAutor = document.getElementById("autor");
    const divAcoes = document.getElementById("acoesnot");

    const titulo = document.createElement("h5");
    titulo.innerHTML = noticia.titulo;

    const img = document.createElement("img");
    img.setAttribute("class", "img-fluid rounded");
    img.setAttribute("id", "imagemNoticia");
    img.src = noticia.imagem;

    const conteudoNot = document.createElement("p");
    conteudoNot.innerHTML = noticia.conteudo;

    const autor = document.createElement("strong");
    autor.innerHTML =
      "Autor: " +
      noticia.autor +
      ",<br> publicado em " +
      moment(noticia.dataPublicacao).format("DD/MM/YYYY");

    const botaoExcluir = document.createElement("button");
    botaoExcluir.setAttribute("class", "btn btn-danger");
    botaoExcluir.innerHTML = "excluir";
    botaoExcluir.addEventListener('click', async () => {
      const body = new FormData()
      body.append(noticia.id)

      const response = await fetch(`${backendUrl}removerNoticia.php`, {method: 'POST', body})

    })

    const botaoAlterar = document.createElement("button");
    botaoAlterar.setAttribute("class", "btn btn-info");
    botaoAlterar.innerHTML = "alterar";

    divTitulo.appendChild(titulo);
    divImagem.appendChild(img);
    divConteudo.appendChild(conteudoNot);
    divAutor.appendChild(autor);
    if (token) {
      if (
        decodedToken.dados.id == noticia.idAutor ||
        decodedToken.dados.cargo == "administrador" ||
        decodedToken.dados.cargo == "criador"
      ) {
        divAcoes.appendChild(botaoExcluir);
        divAcoes.appendChild(botaoAlterar);
      }
    }
  };

  MostraNoticia();
};
