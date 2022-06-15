

onload = () => {
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