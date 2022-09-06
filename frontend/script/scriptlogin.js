const frontendUrl = "//localhost/web_developing/frontend/";

let btnLogar = null;

onload = async () => {
  btnLogar = document.getElementById("btnLogar");

  btnLogar.addEventListener("click", async () => {
    const inputEmail = document.getElementById("email").value;
    const inputSenha = document.getElementById("senha").value;

    const body = new FormData();
    body.append("email", inputEmail);
    body.append("senha", inputSenha);

    const response = await fetch(`../backend/autenticar.php`, {
      method: "POST",
      body,
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById("alert").classList.toggle("d-none");
      setTimeout(() => {
        document.getElementById("alert").classList.toggle("d-none");
      }, 2000);
    } else {
      const { token, usuario } = data;
      localStorage.setItem("token", token);
      location.href = frontendUrl + "index.html";
    }
  });
};
