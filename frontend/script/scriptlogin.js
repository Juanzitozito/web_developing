let btnLogar = null

onload = async () => {
    btnLogar = document.getElementById("btnLogar")

    btnLogar.addEventListener('click', async () => {
        const inputEmail = document.getElementById('email').value
        const inputSenha = document.getElementById('senha').value
    
        const body = new FormData()
        body.append('email', inputEmail)
        body.append('senha', inputSenha)

        console.log(body)
    
        const response = await fetch(`../backend/autenticar.php`, {
          method: "POST",
          body
        })

        const data = await response.json();
    
        if (data.error) {
          document.getElementById('alert').classList.toggle('d-none')
          setTimeout(() => {
            document.getElementById('alert').classList.toggle('d-none')
          }, 2000)
          logout(false)
        }else {
          const {token, usuario} = data
          localStorage.setItem('token', token)
          localStorage.setItem('usuario', JSON.stringify(usuario))
          location.href="//localhost/pw3/web_developing/frontend/index.html";
        }
      })



}