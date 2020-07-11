var user = firebase.auth().currentUser;
document.getElementsByClassName("first-name").innerHTML = "Hi";
console.log(user);
if (user!=null) {
    email = user.email;
    console.log(email);
    auth = db.collection("students").where("email", "==", email);
    auth.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var firstName = document.getElementsByClassName("first-name");
            var lastName = document.getElementsByClassName("last-name");
            var username = document.getElementsByClassName("username");
            var major = document.getElementsByClassName("major");
            var year = document.getElementsByClassName("year");

            var dbfirstName = auth.firstName.value;
            var dblastName = auth.lastName.value;
            var dbusername = auth.username.value;
            var dbmajor = auth.major.value;
            var dbyear = auth.year.value;

            var userDetails = {dbfirstName:firstName,dblastName:lastName,
                dbusername:username,dbmajor:major,
                dbyear:year,email:email}
            for (element in userDetails) {
                if (element){
                    element.innerHTML = userDetails[element]
                }
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
};
