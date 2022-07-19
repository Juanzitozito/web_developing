
const logout = (redirect = true) => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    if (redirect)
        location.href='localhost/pw3/web_developing/frontend/produto.html'
}