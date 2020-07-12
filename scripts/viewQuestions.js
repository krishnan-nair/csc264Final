firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        // Getting questions from database
        db.collection("postquestions").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let li = document.createElement('li');
                let question = document.createElement('li')
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
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        // Getting username from submitted question
        var user = firebase.auth().currentUser;
        dbemail = user.email;
        db.collection("users").where("email", "==", dbemail).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                let dbusername = data.username;
                let dbmajor = data.major;

                let username = document.createElement('li');
                let major = document.createElement('li');

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

                let questionList = document.querySelector('#company')
                questionList.appendChild(username);
                questionList.appendChild(major);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    };
});