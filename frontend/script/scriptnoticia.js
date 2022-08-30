const frontendUrl = '//localhost/arquivosphp/web_developing/frontend/'
const backendUrl = "//localhost/arquivosphp/web_developing/backend/"

let btnInserir = null
let btnLogout = null
let btnPerfil = null

onload = async () => {

  const para = new URLSearchParams(window.location.search)

  const pass = para.get('id')

  console.log(pass)

const btnInserir = document.getElementById('inserirNoticia')
const navbar = document.getElementById('acoes')
  
  const token = localStorage.getItem('token')


const btnLogout = document.createElement('BUTTON')
  btnLogout.setAttribute('type', 'button')
  btnLogout.setAttribute('class', 'btn')
  btnLogout.setAttribute('style', 'background-color: red')
  btnLogout.innerHTML = 'Logout';
 
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.reload();
  });

  const btnLogin = document.createElement('BUTTON')
  btnLogin.setAttribute('type', 'button')
  btnLogin.setAttribute('class', 'btn')
  btnLogin.innerHTML = 'Login';
  btnLogin.addEventListener('click', () => {
    location.href = frontendUrl +'login.html';
  });

  const btnPerfil = document.createElement('BUTTON')
  btnPerfil.setAttribute('type', 'button')
  btnPerfil.setAttribute('class', 'btn')
  btnPerfil.innerHTML = 'Ver Perfil'
  btnPerfil.addEventListener('click', () => {
    location.href = frontendUrl +'profile.html'
});
  

if(token){
  navbar.appendChild(btnPerfil)
  navbar.appendChild(btnLogout)

}else{
  navbar.appendChild(btnLogin)
}

const body = new FormData()
body.append('id', pass)

   const response = await fetch(backendUrl + "noticias/noticia.php", {method: 'POST', body});

   const noticia = await response.json()

   console.log(noticia)

   
}