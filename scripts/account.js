firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    if (user!=null) {
        dbemail = user.email;
        db.collection("users").where("email", "==", dbemail).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var firstName = document.getElementsByClassName("firstName");
                var lastName = document.getElementsByClassName("lastName");
                var username = document.getElementsByClassName("username");
                var major = document.getElementsByClassName("major");
                var year = document.getElementsByClassName("year");
                var email = document.getElementsByClassName("email");

                var data = doc.data();
                let dbfirstName = data.firstName;
                let dblastName = data.lastName;
                let dbusername = data.username;
                let dbmajor = data.major;
                let dbyear = data.year;

                var userDetails = {1:[firstName,dbfirstName],
                    2:[lastName,dblastName],
                    3:[username,dbusername],
                    4:[major, dbmajor],
                    5:[year, dbyear],
                    6:[email, dbemail]
                }
    
                for (i in userDetails) {
                    if (i){
                        (userDetails[i][0])[0].innerHTML = userDetails[i][1];
                    }
                    else{
                        console.log("error");
                    }
                }

                firstName[1].innerHTML = dbfirstName + " ";
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        db.collection("postquestions").where("email", "==", dbemail).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let li = document.createElement('li');
                let question = document.createElement('li')
                let keywords = document.createElement('li');
                let company = document.createElement('li');

                keywords.classList.add('indent');
                company.classList.add('indent');

                li.setAttribute('data-id', doc.id);
                question.setAttribute('data-id','question');
                keywords.setAttribute('data-id','keywords');
                company.setAttribute('data-id','company');


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
    };
});

