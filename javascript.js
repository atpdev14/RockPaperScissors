var config = {
    apiKey: "AIzaSyCvQrBaJ62p6smjlowyYUia08qvezEqVN4",
    authDomain: "rock-paper-scissors-a8d65.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-a8d65.firebaseio.com",
    projectId: "rock-paper-scissors-a8d65",
    storageBucket: "",
    messagingSenderId: "529638228111"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var choices = ["Rock", "Paper", "Scissors"];
var p2Turn = false;
var p1Selection;
var p2Selection;
var p1Wins = 0;
var p2Wins = 0;

// ==================================
// 		PRINT BUTTONS
// ==================================
for(i = 0; i < choices.length; i++){
	var button = $("<button>");
	button.text(choices[i]);
	button.attr("value", choices[i]);
	button.addClass("userSelection");
	$("#player1").append(button);
}

// ======================================
// 		USER SELECTION & UPDATE DATABASE
// ======================================
$(".userSelection").on("click", function(){
	if (p2Turn === false) {
		p1Selection = $(this).val();
		p2Turn = true;
		$("#gamePrompt").text("Player 2- Make a Selection");
		$("#player").text("Player Two");
		

		database.ref("/p1").set({
			p1Selection: p1Selection,
			p2Turn: p2Turn
		});
	} else if (p2Turn === true) {
		p2Selection = $(this).val();
		p2Turn = false;

		database.ref("/p2").set({
			p2Selection: p2Selection,
			p2Turn: p2Turn
		});
	} else {
		alert("Both Players have already made a selection!");
	}
});


// ==================================
// 		VALUE CHANGE LISTENER
// ==================================
database.ref().on("value", function(snapshot) {
	p1Selection = database.ref().p1Selection;
	p2Selection = database.ref().p2Selection;

	console.log("P1: " + snapshot.child("p1/p1Selection").val());
	console.log("P2: " + snapshot.child("p2/p2Selection").val());

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// snapshot.child(‘players/two/name/’).val()








// -Player one makes a selection and updates that 
// variable value to the database
// -Change booelan value of p2Turn in database
// -Retrieve that value from the database
// and set it equal to the local variable
// -Retrieve boolean value and update it locally
// -Use boolean value for player 2 to make a selection
// -compare selections and determine winner
// -Update win boolean to database
// -retrieve win boolean
// -use win boolean to display winner and update win values










