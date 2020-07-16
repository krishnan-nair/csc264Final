// signup
const form = document.querySelector('#sign-up');


form.addEventListener('submit',(e) => {
    e.preventDefault();

    // get user info
    const email = form['email'].value;
    const password = form['password'].value;
    
    // sign up the user
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        db.collection('users').add({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            major: form.major.value,
            year: form.year.value,
            username: form.username.value,
            email: form.email.value
        }).then(function(){
            alert('You have successfully joined our team!');
            open('viewQuestions.html',"_self");
        }).catch(function(error){
            alert(error.message);
        });
    }).catch(function(error){
        alert(error.message);
    })


})
