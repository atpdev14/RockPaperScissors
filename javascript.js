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
var turnCounter = 0;

function winConditions() {
	$("#p1Wins").text(p1Selection);
	$("#p2Wins").text(p2Selection);

	if(p1Selection === "Rock" && p2Selection === "Rock"){
		$("#gamePrompt").text("You tied!");
	} else if (p1Selection === "Rock" && p2Selection === "Paper") {
		$("#gamePrompt").text("Player 2 Wins");
		p2Wins++;
	} else if(p1Selection === "Rock" && p2Selection === "Scissors") {
		$("#gamePrompt").text("Player 1 Wins");
		p1Wins++;
	} else if(p1Selection === "Paper" && p2Selection === "Paper") {
		$("#gamePrompt").text("You tied!");
	} else if(p1Selection === "Paper" && p2Selection === "Scissors") {
		$("#gamePrompt").text("Player 2 Wins");
		p2Wins++;
	} else if(p1Selection === "Paper" && p2Selection === "Rock") {
		$("#gamePrompt").text("Player 1 Wins");
		p1Wins++;
	} else if(p1Selection === "Scissors" && p2Selection === "Scissors") {
		$("#gamePrompt").text("You tied!");
	} else if(p1Selection === "Scissors" && p2Selection === "Rock") {
		$("#gamePrompt").text("Player 2 Wins");
		p2Wins++;
	} else if(p1Selection === "Scissors" && p2Selection === "Paper") {
		$("#gamePrompt").text("Player 1 Wins");
		p1Wins++;
	}
}

// Initialize p2Turn boolean in database to control turns
database.ref("/p1").set({
	p2Turn: p2Turn
		});

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
		turnCounter++;
		$("#gamePrompt").text("Player 2- Make a Selection");
		$("#player").text("Player Two");
		

		database.ref("/p1").set({
			p1Selection: p1Selection,
			p2Turn: p2Turn
		});

	} else if (p2Turn === true) {
		p2Selection = $(this).val();
		p2Turn = false;
		turnCounter++;

		database.ref("/p2").set({
			p2Selection: p2Selection,
			p2Turn: p2Turn
		});
		winConditions();
	}
});


// ==================================
// 		VALUE CHANGE LISTENER
// ==================================
database.ref().on("value", function(snapshot) {
	console.log("P1: " + snapshot.child("p1/p1Selection").val());
	console.log("P2: " + snapshot.child("p2/p2Selection").val());

	p1Selection = snapshot.child("p1/p1Selection").val();
	p2Selection = snapshot.child("p2/p2Selection").val();
	p2Turn = snapshot.child("p1/p2Turn").val();
	console.log(typeof(p2Turn));

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});



// -add a reset function to start the game over
// 	-reset p2Turn boolean, html text
// 	-add win counters to database and display them in html










