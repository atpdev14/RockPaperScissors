// var config = {
//     apiKey: "AIzaSyCvQrBaJ62p6smjlowyYUia08qvezEqVN4",
//     authDomain: "rock-paper-scissors-a8d65.firebaseapp.com",
//     databaseURL: "https://rock-paper-scissors-a8d65.firebaseio.com",
//     projectId: "rock-paper-scissors-a8d65",
//     storageBucket: "",
//     messagingSenderId: "529638228111"
//   };
//   firebase.initializeApp(config);

var choices = ["Rock", "Paper", "Scissors"];
var p1Selected = 0;
var p1Selection;
var p2Selection;

for(i = 0; i < choices.length; i++){
	var button = $("<button>");
	button.text(choices[i]);
	button.attr("value", choices[i]);
	button.addClass("userSelection");
	$("#player1").append(button);
	$("#player2").append(button.clone());
}


$(".userSelection").on("click", function(){
	if (p1Selected === 0) {
		p1Selection = $(this).val();
		p1Selected++;
		console.log("P1: " + p1Selection);
	} else if (p1Selected === 1) {
		p2Selection = $(this).val();
		console.log("P2: " + p2Selection);
		p1Selected++;
	} else {
		alert("Both Players have already made a selection!");
	}
});








// use the p1Selected variable to enable the
// first player to select a value for Player 1
// then update the boolean value within the database.
// Then allow the second player to make a selection.