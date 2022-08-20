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

//função decode token
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return decodedToken = JSON.parse(jsonPayload);
};

 if(token){
parseJwt(token);

console.log(decodedToken.dados)
 } else {
  console.log('vem nada boi')
 }


//botões que mudam de acordo com o estado de login do usuário
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
  const idAutor = decodedToken.dados.id
  const titulo = document.getElementById('titulo').value
  const descricao = document.getElementById('descricao').value
  const imagem = document.getElementById('imagem').value
  const conteudo = document.getElementById('conteudo').value

  const body = new FormData()
  body.append('titulo', titulo)
  body.append('idAutor', idAutor)
  body.append('descricao', descricao)
  body.append('imagem', imagem)
  body.append('conteudo', conteudo)

  const response = await fetch(`../../backend/inserirNot.php`, {
    method: "POST",
    body
  })

  console.log(response)
    
})
  


if(token){
  navbar.appendChild(btnPerfil)
  navbar.appendChild(btnLogout)

}else if(!token || token == null){
  navbar.appendChild(btnLogin)
}




/* const noticias = document.querySelectorAll('.not')

noticias.forEach(item => {
      item.addEventListener('click', () => {
         location.replace('noticia.html') 
      })
    }) */



  const mainNewsCol = document.getElementById('mainNewsCol')
  const header = document.createElement('h1')
  header.setAttribute('class', 'header')
  header.innerHTML = 'Principais Notícias'
  mainNewsCol.appendChild(header)


const MainNews = async () => {
  const response = await fetch('//localhost/arquivosphp/web_developing/backend/noticias/index.php');
  const noticias = await response.json();

  noticias.forEach(not => {
    
  console.log(not)

  const rowNot = document.createElement('div')
  rowNot.setAttribute('class', 'row rowNot')
  
  const divItem = document.createElement('div')
  divItem.setAttribute('class', 'card mb-4 not g')

  const rowItem = document.createElement('div')
  rowItem.setAttribute('class','row g-0')

  const idNoticia = document.createElement('input')
  idNoticia.setAttribute('type', 'hidden')
  idNoticia.setAttribute('id', 'notID')
  idNoticia.setAttribute('name', 'notID')
  idNoticia.setAttribute('value', not.id)

  const divImg = document.createElement('div')
  divImg.setAttribute('class', 'col-md-4 img')

  const image = document.createElement('img')
  image.setAttribute('class', 'img-fluid rounded')
  /* image.src = not.imagem */

  const cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'col-md-8 card-body')

  const newsHeader = document.createElement('h5')
  newsHeader.setAttribute('class', 'card-title')
  newsHeader.innerHTML = not.titulo

  const newsText = document.createElement('p')
  newsText.setAttribute('class', 'card-text')
  newsText.innerHTML = not.descricao

  mainNewsCol.appendChild(rowNot)
  rowNot.appendChild(divItem)
  divItem.appendChild(rowItem)
  rowItem.appendChild(divImg)
  rowItem.appendChild(cardBody)
  rowItem.appendChild(idNoticia)
  divImg.appendChild(image)
  cardBody.appendChild(newsHeader)
  cardBody.appendChild(newsText)

  })
  
}

  MainNews();
}

