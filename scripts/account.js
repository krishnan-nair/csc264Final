firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var user = firebase.auth().currentUser;
        console.log(user.email);
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
        };
    }
});

