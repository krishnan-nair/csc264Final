// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        open('index.html','_self')
        alert('User has signed out!')
    })
})