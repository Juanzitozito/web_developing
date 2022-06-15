onload = () => {
    const btnPerfil = document.getElementById('perfil')
    
    btnPerfil.addEventListener('click', () => {
          window.location.href = 'profile.html'
    })

    document.querySelectorAll('.prod').forEach(item => {
        item.addEventListener('click', () => {
          window.location.href = 'produto.html'
        })
      })
  
}