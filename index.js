var possibleRuns = [0, 1, 2, 4, 6, 8]; //All the possible runs in the game
var team1 = {
	//Team 1 Details
	name: "CSK",
	runs: [],
	score: 0
};
var team2 = {
	//Team 2 Details
	name: "Mumbai Indians",
	runs: [],
	score: 0
};

var turn; // strike deciding variable
var confetti;

window.addEventListener("load", () => {
	selectTurn(); // Decide strike of team
	updateButtonText(); // Update the text of button according to strike
	updateScore(); // Initialize the score board with 0
	updateNames(); // Update the team names

	// Confetti Config
	var confettiSettings = {
		target: "confetti-canvas",
		props: ["square", "triangle", "line"],
		clock: 70
	};
	confetti = new ConfettiGenerator(confettiSettings);
});

// Event listener for handling strike button click
var handleStrikeButtonClick = () => {
	// select a random run from list of possible runs
	var run = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
	run = run === 8 ? "W" : run; // if run is 8 then mark it as wicket

	// check which team is on strike
	if (turn === 1) {
		team1.runs.push(run); //Update runs
		team1.score = calculateScore(team1.runs); //Update team score
	} else {
		team2.runs.push(run);
		team2.score = calculateScore(team2.runs);
	}

	// Update the button text
	updateButtonText();
	// Update the scoreboard
	updateScore();
};

// Function to assign a random strike to a team at start of the match
var selectTurn = () => {
	turn = Math.round(Math.random()) + 1;
};

// Function to update the strike button text
var updateButtonText = () => {
	var button = document.getElementById("strike-button"); // strike button element
	var result = document.getElementById("result"); // element used to display the win message
	result.style.visibility = ""; // keep the result hidden until game is over

	// Check if game is over
	if (team1.runs.length == 6 && team2.runs.length == 6) {
		button.remove(); // delete the strike button from game screen

		// Check if match is a draw
		result.textContent =
			team1.score === team2.score
				? `Its a draw`
				: // The match has a winner
				  `${team1.score > team2.score ? team1.name : team2.name} Wins`;

		//Display confetti
		confetti.render();
		document.getElementById("confetti-canvas").style.zIndex = "1";
	} else {
		// Check if strike of a team is over
		turn = team1.runs.length === 6 ? 2 : team2.runs.length === 6 ? 1 : turn;

		// Update the strike button text
		button.textContent = `Strike (${turn === 1 ? team1.name : team2.name})`;
	}
};

//Function to update the score
var updateScore = () => {
	//Update the total score of team 1
	document.getElementById("team-1-score").textContent = team1.score;
	//Update the total score of team 2
	document.getElementById("team-2-score").textContent = team2.score;
	updateRuns(); //Update the scoreboard
};

// Function to update names of the teams
var updateNames = () => {
	document.getElementById("team-1-name").textContent = team1.name; // Update name of team 1
	document.getElementById("team-2-name").textContent = team2.name; // Update name of team 2
};

// Function to update runs on scoreboard
var updateRuns = () => {
	var teamOneRunsElement = document.getElementById("team-1-round-runs")
		.children;
	var teamTwoRunsElement = document.getElementById("team-2-round-runs")
		.children;

	// Update runs on scoreboard for team 1
	team1.runs.forEach((run, index) => {
		teamOneRunsElement[index].textContent = run;
	});

	// Update runs on scoreboard for team 2
	team2.runs.forEach((run, index) => {
		teamTwoRunsElement[index].textContent = run;
	});
};

// Function to calculate total score
var calculateScore = runs => {
	// Change W in runs array to 0 and then calculate total score
	return runs
		.map(num => {
			return num == "W" ? 0 : num;
		})
		.reduce((total, num) => total + num);
};
