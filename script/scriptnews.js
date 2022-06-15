

onload = () => {
const btnPerfil = document.getElementById('perfil')
const noticia = document.getElementsByClassName('noticia')

btnPerfil.addEventListener('click', () => {
      window.location.href = 'profile.html'
})

noticia.addEventListener('click', () => {
      window.location.href = 'noticia.html'
})
}