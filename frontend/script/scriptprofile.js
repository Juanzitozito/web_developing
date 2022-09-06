const frontendUrl = "//localhost/arquivosphp/web_developing/frontend/";
const backendUrl = "//localhost/arquivosphp/web_developing/backend/";

let btnInserir = null;
let btnLogout = null;
let btnPerfil = null;
let modal_noticia = null;

onload = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("sem premissão");
    window.location.href = "index.html";
  }

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

  const btnLogout = document.getElementById("logout");

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  const body = new FormData();
  body.append("id", decodedToken.dados.id);

  const response = await fetch(`${backendUrl}usuario/index.php`, {
    method: "POST",
    body,
  });

  const usuario = await response.json();

  console.log(usuario);

  //mostrar dados
  const divDados = document.getElementById("dados");

  const nick = document.createElement("p");
  nick.innerHTML = "Nick: <strong>" + usuario.nick;
  +"</strong>";

  const nome = document.createElement("p");
  nome.innerHTML = "Nome: <strong>" + usuario.nome;
  +"</strong>";

  const dtnasc = document.createElement("p");
  dtnasc.innerHTML =
    "Data de Nascimento: <strong>" +
    moment(usuario.dtnasc).format("DD/MM/yyyy") +
    "</strong>";

  const cargo = document.createElement("p");
  cargo.innerHTML = "Cargo: <strong>" + usuario.cargo;
  +"</strong>";

  divDados.appendChild(nick);
  divDados.appendChild(nome);
  divDados.appendChild(dtnasc);
  divDados.appendChild(cargo);

  const btnExcluir = document.getElementById("excluir");
  btnExcluir.addEventListener("click", async () => {
    const body = new FormData();
    body.append(decodedToken.dados.id);
    const response = await fetch(`${backendUrl}removerUsuario.php`, {
      method: "POST",
      body,
    });
  });

  document.getElementById("nomeForm").value = usuario.nome;
  document.getElementById("nickForm").value = usuario.nick;
  document.getElementById("emailForm").value = usuario.email;
  document.getElementById("senhaForm").value = usuario.senha;

  const btnAlterar = document.getElementById("alterarUsuario");
  btnAlterar.addEventListener("click", async () => {
    const nome = document.getElementById("nomeForm").value 
    const nick =document.getElementById("nickForm").value 
    const email =document.getElementById("emailForm").value
    const senha =document.getElementById("senhaForm").value 
    const body = new FormData();
    body.append('id', decodedToken.dados.id)
    body.append('nome' , nome);
    body.append('nick' , nick);
    body.append('email' , email);
    body.append('senha' , senha);

    const response = await fetch(`${backendUrl}alterarUsuario.php`, {
        method: "POST",
        body,
      });

      await response.json()

      if(!response.error){
        window.location.reload()
      }
  });
};
