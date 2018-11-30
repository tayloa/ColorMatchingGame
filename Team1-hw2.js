(function( $ ) {
  $.fn.hexed = function() {
    ///////////////////////////////////////////////////////////////////////////
		///////////////////////// Helper Functions ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Generate an object with 3 random numbers between 0 and 255, one for each RGB value.
    function randomColor(color) {
      color.R = Math.floor(Math.random() * 256);
      color.G = Math.floor(Math.random() * 256);
      color.B = Math.floor(Math.random() * 256);
    }
    
    // Given an expected color object, an actual color object, a difficulty, and an amount of time spent, calculates a score for the game.
    function calcScore (expected,actual,difficult,timespent) {
      var valR = (Math.abs(expected['R']-actual['R'])/255)*100;
      var valG = (Math.abs(expected['G']-actual['G'])/255)*100;
      var valB = (Math.abs(expected['B']-actual['B'])/255)*100;
      var avg_poff = (valR+valG+valB)/3;
			
			console.log(valR + "+" + valG + "+" + valB + "/3 = " + avg_poff);

      var result = ((15-difficult-avg_poff)/(15-difficult))*(15000-timespent);
      if (result<0) {
          result = 0;
      }
			
			console.log("((15-" + difficult + "-" + avg_poff + ")/(15-" + difficult + "))*(15000-" + timespent + ") = " + result);
			
      return parseFloat(result.toFixed(2));
    }
    
    // Given a name, difficulty, number of turns, and score, add a new score to the local leaderboard using Web Storage
    function addNewScore(name, difficulty, turns, score) {
      var newScore = { "name" : name, "difficulty" : difficulty, "turns" : turns, "score" : score, "timestamp" : new Date().getTime() };
      
      var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
      
      // Create a new leaderboard object if one does not exist.
      if (leaderboard === null) {
        leaderboard = { "scores" : [ newScore ] };
      } else {
        leaderboard.scores.push(newScore);
        
        // Sort leaderboard now, first by timestamp then by score. Method for sorting found here.
        leaderboard.scores.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
        
        leaderboard.scores.sort(function(a, b) {
          return b.score - a.score;
        });
      }
      
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
    
    ///////////////////////////////////////////////////////////////////////////
		///////////////////////// Game Initialization /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
		// The game state, assigned with default values to start
    var gameState = {
      userName : "",
      difficulty : 5,
      curRound : 0,
      totalRounds : 5,
      lastScore : 0,
      totalScore : 0,
      startTime : 0,
      endTime : 0,
			actualRGB : {
				R : 0,
				G : 0,
				B : 0
			},
			expectedRGB : {
				R : 0,
				G : 0,
				B : 0
			}
    }
		
		//Create the HTML document structure needed to format the classes and ids in the game/plugin
		var main = $("<div></div>");
		main.attr("id","main-game");

		var gameStart = $("<div></div>");
    gameStart.attr("id", "game-start");

		var nameInput = 
    "<p> \
      <label id=\"name-label\" for=\"name\">Name: </label> \
      <input id=\"name\" type=\"text\" placeholder=\"Enter name here\" /> \
    </p>";
    
		var difficulty=
		"<p> \
      <label id=\"difficulty-label\" for=\"difficulty\">Difficulty: </label> \
      <select id=\"difficulty\" name=\"difficulty\"> \
        <option value=1>1</option> \
        <option value=2>2</option> \
        <option value=3>3</option> \
        <option value=4>4</option> \
        <option value=5 selected>5</option> \
        <option value=6>6</option> \
        <option value=7>7</option> \
        <option value=8>8</option> \
        <option value=9>9</option> \
        <option value=10>10</option> \
      </select> \
    </p>";

		var rounds =
		"<p> \
      <label id=\"round-label\" for=\"round\">Rounds: </label> \
      <input id=\"rounds\" type=\"number\" value=\"10\" /> \
    </p>";

		var startGameButton = '<button id="start_game">Start Game</button>';

		var gameInfo =
		"<div id=\"game-info\"> \
      <p><strong>Player:</strong> <span id=\"player\" /></p> \
      <p><strong>Round:</strong> <span id=\"round-num\" /></p> \
      <p><strong>Total Score:</strong> <span id=\"score\" /></p> \
      <p><strong>Last Round's Score:</strong> <span id=\"lastScore\" /></p> \
    </div>";
    
    var timer = "<div id=\"timer\">0</div>";

		var colorDisplays = 
    "<div id=\"colors\" class=\"center\"> \
      <div> \
        <div class=\"color-label\">Expected</div> \
        <div class=\"color-label\">Actual</div> \
      </div> \
      <div id=\"game-color\" class=\"circle\"></div> \
      <div id=\"color-display\" class=\"circle\"></div> \
      <div> \
        <div id=\"expected-color\" class=\"color-label\"></div> \
        <div id=\"actual-color\" class=\"color-label\"></div> \
      </div> \
    </div>";

		var sliders =
		'<div class="center"> \
			<div class="sliders"> \
				<div> \
						<label class=\"sliderLabel\" for="red">Red</label> \
						<input type="number" id="redNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="red"> \
				</div> \
				<div> \
						<label class=\"sliderLabel\" for="green">Green</label> \
						<input type="number" id="greenNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="green"> \
				</div> \
				<div> \
						<label class=\"sliderLabel\" for="blue">Blue</label> \
						<input type="number" id="blueNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="blue"> \
				</div> \
			</div>';

			var submitButton = "<button id=\"submit\">Got it</button>";
			
			var nextRoundButton = '<button id="next_round">Next Round</button>';
      
      var resetButton = '<button id="reset">Try Again</button>';

      // Add the HTML elements to the page.
			gameStart.append(nameInput);
      gameStart.append(difficulty);
      gameStart.append(rounds);
      gameStart.append(startGameButton);
      
      main.append(gameStart);
      main.append(gameInfo);
      main.append(timer);
      main.append(colorDisplays);
      main.append(sliders);
			main.append(submitButton);
			main.append(nextRoundButton);
      main.append(resetButton);
			$("body").append(main);

			$("#game-info").hide();
      $("#timer").hide();
			$("#colors").hide();
			$(".sliders").hide();
			$("#submit").hide();
			$("#next_round").hide();
      $("#reset").hide();

			//Remove load game button
			$("#load_game").remove();
      
      ///////////////////////////////////////////////////////////////////////////
      //////////////////////// Gameplay Handling ////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////

      // Once the start_game button is clicked, take in the values the user specified, show the game elements, and start the first round.
			$("#start_game").click(function(){
        if ($("#rounds").val() < 1) {
          alert("Please specify a positive number of rounds");
          return;
        }
				// Show appropriate information, instantiate game state variables
				$("#game-info").show();
				$("#colors").show();
				$(".sliders").show();
				$("#submit").show();
        $("#game-start").hide();
        colorDisplay();
        colorSliders();
				
				gameState.userName = $("#name").val();
				gameState.totalRounds = parseInt($("#rounds").val());
				gameState.difficulty = parseInt($("#difficulty").val());
				
        $("#player").html(gameState.userName);
        $("#score").html(gameState.totalScore);
				$("#lastScore").html(gameState.lastScore);
				
				playRound();
			});
			
      // Function to play a round of the game. Stores the starting time, increments the round counter, shows the timer and resets it, and generate the random color.
			function playRound() {
				gameState.startTime = new Date().getTime();
				gameState.curRound++;
        $("#round-num").html(gameState.curRound + " out of " + gameState.totalRounds);
        $("#timer").html("0");
        $("#timer").show();
				
				randomColor(gameState.expectedRGB);
				$("#game-color").css("background-color",  "rgb(" + gameState.expectedRGB['R'] + ", " + gameState.expectedRGB['G'] + ", " + gameState.expectedRGB['B'] + ")");
        
        // Function that controls the timer, shows how much time has passed since the round started
        var timer = setInterval(function() {
          var currTime = new Date().getTime();
          
          var diff = currTime - gameState.startTime;
          
          var seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          $("#timer").html(seconds);
        }, 1000);
			}
			
      // When an answer is submitted, calculate the score, show the hex values of the colors, and either submit their score or allow them to move to the next round.
			$("#submit").click(function() {
        $("#timer").hide();
				gameState.endTime = new Date().getTime();
				gameState.actualRGB['R'] = parseInt($("#redNum").val());
				gameState.actualRGB['G'] = parseInt($("#greenNum").val());
				gameState.actualRGB['B'] = parseInt($("#blueNum").val());
        
        $("#expected-color").html("#" + gameState.expectedRGB['R'].toString(16) + gameState.expectedRGB['G'].toString(16) + gameState.expectedRGB['B'].toString(16));
        $("#actual-color").html("#" + gameState.actualRGB['R'].toString(16) + gameState.actualRGB['G'].toString(16) + gameState.actualRGB['B'].toString(16));
				
				var score = calcScore(gameState.expectedRGB, gameState.actualRGB, gameState.difficulty, gameState.endTime - gameState.startTime);
				gameState.lastScore = score;
				gameState.totalScore += score;
        $("#score").html(gameState.totalScore);
				$("#lastScore").html(gameState.lastScore);
				$("#submit").hide();
				if (gameState.curRound == gameState.totalRounds) {
					// Submit Score, allow them to play again
          addNewScore(gameState.userName, gameState.difficulty, gameState.totalRounds, gameState.totalScore);
          $("#reset").show();
				} else {
					$("#next_round").show();
				}
			});
			
      // When the next_round button is pressed, start the next round
			$("#next_round").click(function() {
				$("#submit").show();
				$("#next_round").hide();
				playRound();
			});
      
      // Allow the user to play again without refreshing the page
      $("#reset").click(function() {
        gameState.difficulty = 0;
        gameState.totalRounds = 5;
        gameState.curRound = 0;
        gameState.userName = '';
        gameState.totalScore = 0;
        gameState.lastScore = 0;
        
        $("#game-info").hide();
				$("#colors").hide();
				$(".sliders").hide();
				$("#submit").hide();
        $("#reset").hide();
        $("#game-start").show();
      });
	
    ///////////////////////////////////////////////////////////////////////////
		/////////////////////// Color Slider handling /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Change color displayed
    function colorDisplay() {
      $("#color-display").css("background-color", "rgb(" + $("#redNum").val() + ", " + $("#greenNum").val() + ", " + $("#blueNum").val() + ")");
    }
    
    // Change slider background colors and label background colors
    function colorSliders() {
      $("label[for=red]").css("background-color", "rgb(" + $("#redNum").val() + ", 0, 0)");
      $("label[for=green]").css("background-color", "rgb(0, " + $("#greenNum").val() + ", 0)");
      $("label[for=blue]").css("background-color", "rgb(0, 0, " + $("#blueNum").val() + ")");

      $("#red").css("background-color", "rgb(" + $("#redNum").val() + ", 0, 0)");
      $("#green").css("background-color", "rgb(0, " + $("#greenNum").val() + ", 0)");
      $("#blue").css("background-color", "rgb(0, 0, " + $("#blueNum").val() + ")");
    }
    
    // When red slider is used, change the value of the red number input, change the displayed color and the color of the sliders
		$("#red").on("input", function() {
        $("#redNum").val($(this).val());
        colorDisplay();
        colorSliders();
    });

    // When green slider is used, change the value of the green number input, change the displayed color and the color of the sliders
    $("#green").on("input", function()  {
        $("#greenNum").val($(this).val());
        colorDisplay();
        colorSliders();
    });

    // When blue slider is used, change the value of the blue number input, change the displayed color and the color of the sliders
    $("#blue").on("input", function()  {
        $("#blueNum").val($(this).val());
        colorDisplay();
        colorSliders();
    });
		
    // When red number input is changed, change the value of the red slider, changed the displayed color and the color of the sliders
		$("#redNum").on("change", function() {
			// make sure numbers are entered between 0 to 255
			if($(this).val() > 255){
					alert('cannot enter numbers greater than 255');
					$(this).val($("#red").val());
			} else if($(this).val() < 0) {
					alert('cannot enter numbers less than 0');
					$(this).val($("#red").val());
			} else {
					$("#red").val($(this).val());
          colorDisplay();
          colorSliders();
			}
		});
		
    // When green number input is changed, change the value of the green slider, changed the displayed color and the color of the sliders
		$("#greenNum").on("change", function() {
			// make sure numbers are entered between 0 to 255
			if($(this).val() > 255){
					alert('cannot enter numbers greater than 255');
					$(this).val($("#green").val());
			} else if($(this).val() < 0) {
					alert('cannot enter numbers less than 0');
					$(this).val($("#green").val());
			} else {
					$("#green").val($(this).val());
          colorDisplay();
          colorSliders();
			}
		});
		
    // When blue number input is changed, change the value of the blue slider, changed the displayed color and the color of the sliders
		$("#blueNum").on("change", function() {
			// make sure numbers are entered between 0 to 255
			if($(this).val() > 255){
					alert('cannot enter numbers greater than 255');
					$(this).val($("#blue").val());
			} else if($(this).val() < 0) {
					alert('cannot enter numbers less than 0');
					$(this).val($("#blue").val());
			} else {
					$("#blue").val($(this).val());
          colorDisplay();
          colorSliders();
			}
		});

  };
  
  $.fn.displayLeaderboard = function() {
    ///////////////////////////////////////////////////////////////////////////
		///////////////// CHALLENGE: Leaderboard handling /////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
		// Pull the leaderboard from the browser's local storage
		var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
		
		// Create a div for the leaderboard, along with a heading for the page and the navigation bar.
    var nav = 
    "<div id=\"nav\"> \
      <a href=\"index.html\">Game</a> \
      <a href=\"Team1Scores.html\">Leaderboard</a> \
    </div>";
		$("body").append("<div id=\"localScores\"></div>");
		$("#localScores").append("<h1>Local Leaderboard</h1>");
    $("#localScores").append(nav);
    
		
		// If there was no leaderboard in local storage, provide a message for the user. Otherwise, create a table
		if (leaderboard === null) {
			$("#localScores").append("There are currently no scores saved locally. Please play the game to have your scores saved.");
		} else {
			// Create the table and heading row. 
			var table = "<table class='leaderboard'>";
			table += "<tr>";
			table += "<th class='col1'>Name</th>";
			table += "<th class='col2'>Difficulty</th>";
			table += "<th class='col3'>Number of Turns</th>";
			table += "<th class='col4'>Score</th>";
			table += "<th class='col5'>Date</th>";
			table += "</tr>";
			
			// Create a row for each score on the leaderboard
			leaderboard.scores.forEach(function(score) {
			var date = new Date(score.timestamp);
				table += "<tr>";
				table += "<td>" + score.name + "</td>";
				table += "<td>" + score.difficulty + "</td>";
				table += "<td>" + score.turns + "</td>";
				table += "<td>" + score.score + "</td>";
				table += "<td>" + date.toLocaleString("en-US") + "</td>";
				table += "</tr>";
			});
			
			table += "</table>";
			
			// Append the table to the page.
			$("#localScores").append(table);
		}
	};
  
  return this;

})( jQuery );


function load_game(){
  $("body").hexed();
};

$(document).ready(function() {
  if (document.title === "Hexxed! Leaderboard") {
    $("body").displayLeaderboard();
  }
});
