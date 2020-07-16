// initializes tag list
var availableTags = [];

// gets the company name from every entry in database and stores to array
db.collection("postquestions").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        dbcompany = doc.data().company;
        availableTags.push(dbcompany);
    });
});

// function that autocompletes the database valuess
$( function() {
    $( "#tags" ).autocomplete({
      source: availableTags
    });
});