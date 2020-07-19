// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            open('viewQuestions.html',"_self");
    }).catch(function(error){
        alert(error.message);
    })});
})
