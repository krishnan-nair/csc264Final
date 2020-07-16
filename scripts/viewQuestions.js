firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        // Getting questions from database
        db.collection("postquestions").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let h5 = document.createElement('p');
                let question = document.createElement('p')
                let keywords = document.createElement('p');
                let company = document.createElement('p');

                keywords.classList.add('indent');
                company.classList.add('indent');

                h5.setAttribute('id', doc.id);
                question.setAttribute('id','question');
                keywords.setAttribute('id','keywords');
                company.setAttribute('id','company');


                var data = doc.data();
                let dbquestion = data.question;
                let dbkeyword = data.keyword;
                let dbcompany = data.company;
                let email = data.email;
    

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


                // Getting username from submitted question
                db.collection("users").where("email", "==", email).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var data = doc.data();
                        let dbusername = data.username;
                        let dbmajor = data.major;

                        let username = document.createElement('p');
                        let major = document.createElement('p');

                        username.classList.add('indent');
                        major.classList.add('indent');

                        var questionDetails = {2:[username,'Submitted by: ' + dbusername],
                            3:[major,'Major: ' + dbmajor],
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
                        h5.appendChild(username);
                        h5.appendChild(major);
                
                        document.querySelector('#question-list').appendChild(h5);
                    });          
                });
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    };
});

