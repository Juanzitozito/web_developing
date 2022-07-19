let modal_noticia = null
let btnInserir = null
btnLogout = null

onload = async () => {
  
  const token = localStorage.getItem('token')
  /* if (token === null){
    location.href = "../frontend/login.html"
} */

const btnLogout = document.createElement('BUTTON')
  btnLogout.setAttribute('type', 'button')
  btnLogout.setAttribute('class', 'btn')
  const navbar = document.getElementById('acoes')

if(token){

  navbar.appendChild(btnLogout)
  

  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  })
  
}



  

modal_noticia = new bootstrap.Modal(document.getElementById('noticiaModal'))
const btnInserir = document.getElementById('inserirNoticia')

const btnPerfil = document.getElementById('perfil')

btnPerfil.addEventListener('click', () => {
      window.location.href = 'profile.html'
})

document.querySelectorAll('.not').forEach(item => {
      item.addEventListener('click', () => {
        location.replace('noticia.html')
      })
    })

  

}