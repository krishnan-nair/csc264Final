firebase.auth().onAuthStateChanged(function(user) {
    if (user!=null) {
        // Getting questions from database
        db.collection("postquestions").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
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

				

                var data = doc.data();
                let dbquestion = data.question;
                let dbkeyword = data.keyword;
                let dbcompany = data.company;
                let email = data.email;
				
				
				question.innerHTML = '&#10077;' + dbquestion + '&#10078;';
				keywords.innerHTML = 'Keywords: ' + dbkeyword;
				company.innerHTML = dbcompany + ' asked...';
				


                // Getting username from submitted question
                db.collection("users").where("email", "==", email).get().then(function(querySnapshot) {
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
                });
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    };
});

