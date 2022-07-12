let modal_noticia = null
let btnInserir = null

onload = () => {

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