function addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany) {
    // adding questions to main question list
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
            (questionDetails[i][0]).innerText = questionDetails[i][1];
        }
        else{
            console.log("error");
        }
    }

    h5.appendChild(question);
    h5.appendChild(keywords);
    h5.appendChild(company);

    document.querySelector('#question-list').appendChild(h5); 
}

function updateFilterList(keyword,company){
    // adding keywords and companies to filtered tags list
    let inputKeywords = document.createElement('li');
    let inputCompanies = document.createElement('li');

    // inputKeywords.classList.add('btn btn-secondary');
    // inputCompanies.classList.add('btn btn-secondary');

    inputKeywords.innerText = keyword;
    inputCompanies.innerText = company;

    var keywordFilter = document.querySelector('#keyword-list');
    var companyFilter = document.querySelector('#company-list');

    if (keyword!=''){
        keywordFilter.appendChild(inputKeywords);
    }
    if (company!=''){
        companyFilter.appendChild(inputCompanies);
    }   
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
                    updateFilterList(keywordArray[0],companyArray[i]);
                }
            }
            // case where there is only an input for keyword
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
                    updateFilterList(keywordArray[k],companyArray[0]);
                }
            }
            // case where there is an inputed keyword and company
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
                        updateFilterList(keywordArray[j],companyArray[i]);
                    }
                }
            }
        });
    }
});
            
        
form.addEventListener('reset',(e) => {
    e.preventDefault();

    // gets list of keywords from DOM
    keywordList = document.getElementById('keyword-list');

    // removes current questions shown on the page
    while (keywordList.hasChildNodes()) {  
        keywordList.removeChild(keywordList.firstChild);
    } 

    // gets list of companies from DOM
    companyList = document.getElementById('company-list');

    // removes current companies shown on the page
    while (companyList.hasChildNodes()) {  
        companyList.removeChild(companyList.firstChild);
    } 

    // makes the input fields empty after submitting
    document.getElementById('keywords').value = '';
    document.getElementById('companies').value = '';

    // refreshes the page to apply changes and show original list of questions
    location.reload();

});