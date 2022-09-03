const frontendUrl = "//localhost/arquivosphp/web_developing/frontend/";

let btnLogin = null;
let btnLogout = null;
let btnPerfil = null;

onload = async () => {
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
};
