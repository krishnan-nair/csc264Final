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
    

            for (i in companyArray){
                for (j in keywordArray){
                    db.collection("postquestions").where("company", "==", companyArray[i]).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            var data = doc.data(); 
                            let dbkeyword = data.keyword;

                            var dbkeywordArray = []
                            if (dbkeyword.includes(',')){
                                dbkeywordArray = keywords.split(', ');
                            }
                            else{
                                dbkeywordArray[0] = dbkeyword;
                            }
                            console.log(dbkeywordArray);
                            console.log(companyArray);
                            
                            qList = document.getElementById('question-list');
                            
                            while (qList.hasChildNodes()) {  
                                qList.removeChild(qList.firstChild);
                            }

                            for (k in dbkeywordArray){
                                if (dbkeywordArray[k]===keywordArray[j]){
                                    let li = document.createElement('li');
                                    let question = document.createElement('li');
                                    let keywords = document.createElement('li');
                                    let company = document.createElement('li');

                                    keywords.classList.add('indent');
                                    company.classList.add('indent');

                                    li.setAttribute('id', doc.id);
                                    question.setAttribute('id','question');
                                    keywords.setAttribute('id','keywords');
                                    company.setAttribute('id','company');


                                    var data = doc.data();
                                    let dbquestion = data.question;
                                    let dbkeyword = data.keyword;
                                    let dbcompany = data.company;
                        

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

                                    li.appendChild(question);
                                    li.appendChild(keywords);
                                    li.appendChild(company);
                            
                                    document.querySelector('#question-list').appendChild(li);                                    
                                }
                            }
                
                        });
                    })
                }
            }
        })
    };
});
            
        

