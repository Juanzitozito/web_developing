const frontendUrl = "//localhost/web_developing/frontend/";
const backendUrl = "//localhost/web_developing/backend/";

let btnInserir = null;
let btnLogout = null;
let btnPerfil = null;
let modal_noticia = null;

onload = async () => {
  const para = new URLSearchParams(window.location.search);
  modal_noticia = new bootstrap.Modal(document.getElementById("noticiaModal"));

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
    botaoExcluir.addEventListener("click", async () => {
      const body = new FormData();
      body.append("id", noticia.id);

      const response = await fetch(`${backendUrl}removerNoticia.php`, {
        method: "POST",
        body,
      });

      console.log(response);

      if (response.status === 200) {
        location.href = "index.html";
      }
    });

    document.getElementById("tituloForm").value = noticia.titulo;
    document.getElementById("descricaoForm").value = noticia.descricao;
    document.getElementById("imagemForm").filename = noticia.imagem;
    document.getElementById("conteudoForm").value = noticia.conteudo;

    const botaoAlterar = document.createElement("button");
    botaoAlterar.setAttribute("class", "btn btn-info");
    botaoAlterar.innerHTML = "alterar";
    botaoAlterar.setAttribute("data-bs-toggle", "modal");
    botaoAlterar.setAttribute("data-bs-target", "#noticiaModal");

    const botaoAlteraNot = document.getElementById('alterarNoticia')

    botaoAlteraNot.addEventListener('click', async () => {
    const idAutorForm = decodedToken.dados.id;
    const tituloForm = document.getElementById("tituloForm").value;
    const descricaoForm = document.getElementById("descricaoForm").value;
    const imagemForm = document.getElementById("imagemForm").files[0];
    const conteudoForm = document.getElementById("conteudoForm").value;

    const body = new FormData();
    body.append("titulo", tituloForm);
    body.append("descricao", descricaoForm);
    body.append("imagem", imagemForm);
    body.append("conteudo", conteudoForm);
    body.append('id', noticia.id)
    
      const response = await fetch(`${backendUrl}alterarNoticia.php`, {method: 'POST', body})

      const status = await response.json()
      
      if(status.error){
        alert(status.message)
      
      }else{
        window.location.reload() 
      }

       
      
    })

    

    divTitulo.appendChild(titulo);
    divImagem.appendChild(img);
    divConteudo.appendChild(conteudoNot);
    divAutor.appendChild(autor);
    if (token) {
      if (
        decodedToken.dados.id == noticia.idAutor ||
        decodedToken.dados.cargo == "administrador" 
      ) {
        divAcoes.appendChild(botaoExcluir);
        divAcoes.appendChild(botaoAlterar);
      }
    }
  };

  const mainNewsCol = document.getElementById("latest");
  const header = document.createElement("h1");
  header.setAttribute("class", "header");
  header.innerHTML = "Ultimas Notícias";
  mainNewsCol.appendChild(header);

  const LatestNews = async () => {
    const response = await fetch(backendUrl + "noticias/index.php");
    const noticias = await response.json();
    console.log(noticias);

    if (noticias != "") {
      noticias.forEach((not) => {
        console.log(not);
         
         if(not.id != noticia.id){ 

           const divCard = document.createElement('DIV')
           divCard.setAttribute('class', 'card not')
           
           const imgCard = document.createElement('img')
           imgCard.setAttribute('class', 'card-img-top')
           imgCard.src = not.imagem

           const divBody = document.createElement('div')
           divBody.setAttribute('class', 'card-body')

           const cardTitle = document.createElement('h5')
           cardTitle.setAttribute('class', 'card-title')
           cardTitle.innerHTML = not.titulo

           const cardText = document.createElement('p')
           cardText.setAttribute('class', 'card-text')
           cardText.innerHTML = not.descricao

           const botaoIr = document.createElement('button')
           botaoIr.setAttribute('class', 'btn ir')
           botaoIr.setAttribute("value", not.id);
           botaoIr.innerHTML = "ver notícia";


           mainNewsCol.appendChild(divCard)
           divCard.appendChild(imgCard)
           divCard.appendChild(divBody)
           divCard.appendChild(botaoIr)
           divBody.appendChild(cardTitle)
           divBody.appendChild(cardText)

         }
        
      });
    } else {
      const span = document.createElement("span");
      span.innerHTML = "não há notícias";
      mainNewsCol.appendChild(span);
    }
  };

  MostraNoticia();

  await LatestNews();

  const botoes = document.querySelectorAll(".ir");

  botoes.forEach((bt) => {
    console.log(bt.value);

    bt.addEventListener("click", async () => {
      const para = new URLSearchParams();

      para.append("id", bt.value);

      location.href =
        "//localhost/web_developing/frontend/noticia.html?" + para.toString();
    });
  });
};
