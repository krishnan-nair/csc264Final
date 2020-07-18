function addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany,dbemail) {
    let contain = document.createElement('div');
    let head = document.createElement('div');
    let foot = document.createElement('div')
    let question = document.createElement('span');
    let keywords = document.createElement('span');
    let company = document.createElement('span');
    
    
    
    contain.setAttribute('class','question-container');
    question.setAttribute('class','question');
    head.setAttribute('class','head');
    keywords.setAttribute('class','keywords');
    company.setAttribute('class','company');

    
    question.innerHTML = '&#10077;' + dbquestion + '&#10078;';
    keywords.innerHTML = 'Keywords: ' + dbkeyword;
    company.innerHTML = dbcompany + ' asked...';
    


    // Getting username from submitted question
    db.collection("users").where("email", "==", dbemail).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            let dbusername = data.username;
            let dbmajor = data.major;

            let username = document.createElement('span');
            let major = document.createElement('span');

            username.classList.add('foot');
            major.classList.add('foot');

            username.innerText = 'Submitted by: ' + dbusername;
            major.innerText = 'Major: ' + dbmajor;


            head.appendChild(company);
            head.appendChild(keywords);
            foot.appendChild(username);
            foot.appendChild(major);
            contain.appendChild(head);
            contain.appendChild(question);
            contain.appendChild(foot);
            
            document.querySelector('#question-list').appendChild(contain);    
        });
    }).catch(function(error) {
    console.log("Error getting documents: ", error);
    });
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
                            dbemail = doc.data().email;
                            addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany,dbemail);
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
                            dbemail = doc.data().email;
                            addFilteredQuestion(doc,dbquestion,dbkeyword,dbcompany,dbemail);
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
                                        dbemail = doc.data().email;
                                        
                                        if (dbcompany == companyArray[i]){
                                            for (k in dbkeywordArray){
                                                if (dbkeywordArray[k]===keywordArray[j]){
                                                    addFilteredQuestion(doc,dbquestion,keywordArray[j],companyArray[i],dbemail);               
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