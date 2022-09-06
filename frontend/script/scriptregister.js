const frontendUrl = "//localhost/arquivosphp/web_developing/frontend/";
const backendUrl = "//localhost/arquivosphp/web_developing/backend/";

onload = async () => {
  const btnRegistrar = document.getElementById("btnRegistrar");
  btnRegistrar.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const nick = document.getElementById("nick").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const dtnasc = document.getElementById("dtnasc").value;

    const body = new FormData();
    body.append("nome", nome);
    body.append("nick", nick);
    body.append("email", email);
    body.append("senha", senha);
    body.append("dtnasc", dtnasc);

    const response = await fetch(`${backendUrl}inserirUsuario.php`, {
      method: "POST",
      body,
    });

     if (!response.error) {
      window.location.href = "login.html";
    } 
  });
};
