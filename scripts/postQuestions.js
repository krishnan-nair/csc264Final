// signup
const form = document.querySelector('#post-question');

firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        form.addEventListener('submit',(e) => {
            e.preventDefault();

            var keywordVals = form.keywords.value;
            var keywordArray = [];
            
            if (keywordVals.includes(',')){
                keywordArray = keywordVals.split(', ');
            }
            else{
                keywordArray[0] = keywordVals;
            }
            
            db.collection('postquestions').add({
                email: user.email,
                question: form.question.value,
                keyword: keywordArray,
                company: form.company.value,

            }).catch(function(error){
                alert(error.message);
            });  
            alert('Your question was successfully uploaded!');
        })
    
    }
});
