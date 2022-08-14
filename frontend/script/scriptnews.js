const frontendUrl = '//localhost/arquivosphp/web_developing/frontend/'

let modal_noticia = null
let btnInserir = null
let btnLogout = null
let btnPerfil = null

onload = async () => {

modal_noticia = new bootstrap.Modal(document.getElementById('noticiaModal'))
const btnInserir = document.getElementById('inserirNoticia')
const navbar = document.getElementById('acoes')
  
  const token = localStorage.getItem('token')
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  console.log(usuario)

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
    location.href = frontendUrl+'login.html';
  });

  const btnPerfil = document.createElement('BUTTON')
  btnPerfil.setAttribute('type', 'button')
  btnPerfil.setAttribute('class', 'btn')
  btnPerfil.innerHTML = 'Ver Perfil'
  btnPerfil.addEventListener('click', () => {
    location.href = 'http://localhost/pw3/web_developing/frontend/profile.html'
});



btnInserir.addEventListener('click', async () => {
  const autor = usuario.nick
  const titulo = document.getElementById('titulo').value
  const descricao = document.getElementById('descricao').value
  const imagem = document.getElementById('imagem').value
  const conteudo = document.getElementById('conteudo').value

  const body = new FormData()
  body.append('titulo', titulo)
  body.append('autor', autor)
  body.append('descricao', descricao)
  body.append('imagem', imagem)
  body.append('conteudo', conteudo)

  const response = await fetch(`../../backend/inserirNot.php`, {
    method: "POST",
    body
  })
      
})
  

if(token){
  navbar.appendChild(btnPerfil)
  navbar.appendChild(btnLogout)

}else{
  navbar.appendChild(btnLogin)
}


const noticias = document.querySelectorAll('.not')

noticias.forEach(item => {
      item.addEventListener('click', () => {
         location.replace('noticia.html') 
      })
    })




}

