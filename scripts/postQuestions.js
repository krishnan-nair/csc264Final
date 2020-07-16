// signup
const form = document.querySelector('#post-question');

firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        form.addEventListener('submit',(e) => {
            e.preventDefault();
            db.collection('postquestions').add({
                email: user.email,
                question: form.question.value,
                keyword: form.keywords.value,
                company: form.company.value,
            });  
            alert('Your question was successfully uploaded!');
        })
        .catch(function(error){
            alert(error.message);
        })
    
    }
});
