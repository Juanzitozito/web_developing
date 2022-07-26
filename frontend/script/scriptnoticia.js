const frontendUrl = '//localhost/pw3/web_developing/frontend/'

let btnInserir = null
let btnLogout = null
let btnPerfil = null

onload = async () => {

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
    localStorage.removeItem('usuario')
    location.reload();
  });

  const btnLogin = document.createElement('BUTTON')
  btnLogin.setAttribute('type', 'button')
  btnLogin.setAttribute('class', 'btn')
  btnLogin.innerHTML = 'Login';
  btnLogin.addEventListener('click', () => {
    location.href = 'http://localhost/pw3/web_developing/frontend/login.html';
  });

  const btnPerfil = document.createElement('BUTTON')
  btnPerfil.setAttribute('type', 'button')
  btnPerfil.setAttribute('class', 'btn')
  btnPerfil.innerHTML = 'Ver Perfil'
  btnPerfil.addEventListener('click', () => {
    location.href = 'http://localhost/pw3/web_developing/frontend/profile.html'
});
  

if(token){
  navbar.appendChild(btnPerfil)
  navbar.appendChild(btnLogout)

}else{
  navbar.appendChild(btnLogin)
}



document.querySelectorAll('.not').forEach(item => {
      item.addEventListener('click', () => {
        location.replace('noticia.html')
      })
    })
}