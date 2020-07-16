function addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany) {
    let h5 = document.createElement('h5');
    let question = document.createElement('p');
    let keywords = document.createElement('p');
    let company = document.createElement('p');

    keywords.classList.add('indent');
    company.classList.add('indent');

    h5.setAttribute('id', doc.id);
    question.setAttribute('id','question');
    keywords.setAttribute('id','keywords');
    company.setAttribute('id','company');



    var questionDetails = {1:[question,dbquestion],
        2:[keywords,'Keywords: ' + dbkeyword],
        3:[company,'Company: ' + dbcompany],
    }

    for (i in questionDetails) {
        if (i){
            (questionDetails[i][0]).textContent = questionDetails[i][1];
        }
        else{
            console.log("error");
        }
    }

    h5.appendChild(question);
    h5.appendChild(keywords);
    h5.appendChild(company);

    return document.querySelector('#question-list').appendChild(h5); 
}

function removeExistingQuestions() {
    // gets list of questions from DOM
    qList = document.getElementById('question-list');
    
    // removes current questions shown on the page
    while (qList.hasChildNodes()) {  
        qList.removeChild(qList.firstChild);
    }     
}

const form = document.querySelector('#filter');

firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        // Getting questions from database
        form.addEventListener('submit',(e) => {
            e.preventDefault();

            // get submitted keywords and companies
            const keywords = form['keywords'].value;
            const companies = form['companies'].value;

            var keywordArray = [];
            var companyArray = [];

            // separates the user input by commas
            if (keywords.includes(',')){
                keywordArray = keywords.split(', ');
            }
            else{
                keywordArray[0] = keywords;
            }
    
            if (companies.includes(',')){
                companyArray = companies.split(', ');
            }
            else{
                companyArray[0] = companies;
            }    

            // returns to the user their search inquiry

            // if the user only filters by company name 
            if (keywordArray[0] == "" && companyArray[0] != ""){
                for (i in companyArray){

                    removeExistingQuestions();
                    // loops through each company in the database to see if it matches the input
                    db.collection("postquestions").where("company", "==", companyArray[i]).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            dbquestion = doc.data().question;
                            dbcompany = doc.data().company;
                            dbkeyword = doc.data().keyword;
                            addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany);
                        });
                    })
                }
            }
            else if (keywordArray[0] != "" && companyArray[0] == ""){
                for (k in keywordArray){
                    removeExistingQuestions();
                    // loops through each keyword in the database to see if it matches the input
                    db.collection("postquestions").where("keyword", "array-contains", keywordArray[k]).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            dbquestion = doc.data().question;
                            dbcompany = doc.data().company;
                            dbkeyword = doc.data().keyword;
                            addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany);
                        });
                    })
                }
            }
            else{
                for (i in companyArray){
                    for (j in keywordArray){
                        removeExistingQuestions();
                        db.collection("postquestions").where("company", "==", companyArray[i]).get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                db.collection("postquestions").where("keyword", "array-contains", keywordArray[j]).get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                        dbquestion = doc.data().question;
                                        dbkeywordArray = doc.data().keyword;
                                        dbcompany = doc.data().company;
                                        
                                        if (dbcompany == companyArray[i]){
                                            for (k in dbkeywordArray){
                                                if (dbkeywordArray[k]===keywordArray[j]){
                                                    addFilteredQuestion(doc,dbquestion,keywordArray[j],companyArray[i]);                
                                                }
                                            }
                                        }
                                        
            
                                    });
                                });
                            });
                        })
                    }
                }
            }
        });
    }
});
            
        

