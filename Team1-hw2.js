(function( $ ){
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

		var contentDiv = $("<div></div>");
		var content = $("<p></p>");

		var nameInput = "<input id=\"name\" type=\"text\" placeholder=\"Enter name here\"> </input>";
		var difficulty=
		'<label id="difficulty-label" for="difficulty">Difficulty:</label> \
		<select id="difficulty" name="difficulty"> \
			<option value=1>1</option> \
			<option value=2>2</option> \
			<option value=3>3</option> \
			<option value=4>4</option> \
			<option value=5>5</option> \
			<option value=6>6</option> \
			<option value=7>7</option> \
			<option value=8>8</option> \
			<option value=9>9</option> \
			<option value=10>10</option> \
		</select>';

		var round=
		'<label id="round-label" for="round">Rounds:</label> \
		<select id="rounds" name="rounds"> \
			<option value=1>1</option> \
			<option value=2>2</option> \
			<option value=3>3</option> \
			<option value=4>4</option> \
			<option value=5>5</option> \
			<option value=6>6</option> \
			<option value=7>7</option> \
			<option value=8>8</option> \
			<option value=9>9</option> \
			<option value=10>10</option> \
		</select>';

		var startGameButton = '<button id="start_game">Start Game</button>';

		var gameInfo=
		'<div id="game-info"> \
			<span id="score">Score: </span> \
			<span id="round-num">Round: </span> \
		</div>';

		var colorDisplays = '<div id="colors" class="center"> \
			<div id="game-color" class="circle"></div> \
			<div id="color-display" class="circle"></div> \
		</div>';

		var sliders =
		'<div class="center"> \
			<div class="sliders"> \
				<div> \
						<label for="red">Red</label> \
						<input type="number" id="redNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="red"> \
				</div> \
				<div> \
						<label for="green">Green</label> \
						<input type="number" id="greenNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="green"> \
				</div> \
				<div> \
						<label for="blue">Blue</label> \
						<input type="number" id="blueNum" value="255"> \
						<input value="255" type="range" min="0" max="255" id="blue"> \
				</div> \
			</div>';

			var submitButton =
			'<div class="center"> \
				<button id="submit">Got it</button> \
			</div>';
			
			var nextRoundButton = '<button id="next_round">Next Round</button>';

			content.append(nameInput);
			content.append(difficulty);
			content.append(round);
			content.append(startGameButton);

			content.append(gameInfo);
			content.append(colorDisplays);
			content.append(sliders);

			contentDiv.append(content);
			main.append(contentDiv);
			main.append(submitButton);
			main.append(nextRoundButton);
			$("body").append(main);

			$("#game-info" ).hide();
			$("#colors" ).hide();
			$(".sliders" ).hide();
			$("#submit" ).hide();
			$("#next_round" ).hide();

			//Remove load game button
			$("#load_game").remove();
      
      ///////////////////////////////////////////////////////////////////////////
      //////////////////////// Gameplay Handling ////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////

			$("#start_game").click(function(){
				// Show appropriate information, instantiate game state variables
				$("#game-info" ).show();
				$("#colors" ).show();
				$(".sliders" ).show();
				$("#submit" ).show();
        colorDisplay();
        colorSliders();
				
				gameState.userName = $("#name").val();
				gameState.totalRounds = parseInt($("#rounds").val());
				gameState.difficulty = parseInt($("#difficulty").val());
				
				$("#difficulty-label").html("Difficulty: " + gameState.difficulty);
				$("#round-label").html("Rounds: " + gameState.totalRounds);
				$("#difficulty").remove();
				$("#rounds").remove();
				$("#start_game").remove();
				
				playRound();
			});
			
			function playRound() {
				gameState.startTime = new Date().getTime();
				gameState.curRound++;
				
				randomColor(gameState.expectedRGB);
				$("#game-color").css("background-color",  "rgb(" + gameState.expectedRGB['R'] + ", " + gameState.expectedRGB['G'] + ", " + gameState.expectedRGB['B'] + ")");
			}
			
			$("#submit").click(function() {
				gameState.endTime = new Date().getTime();
				gameState.actualRGB['R'] = parseInt($("#redNum").val());
				gameState.actualRGB['G'] = parseInt($("#greenNum").val());
				gameState.actualRGB['B'] = parseInt($("#blueNum").val());
				
				var score = calcScore(gameState.expectedRGB, gameState.actualRGB, gameState.difficulty, gameState.endTime - gameState.startTime);
				gameState.lastScore = score;
				gameState.totalScore += score;
				console.log(gameState);
				$("#submit").hide();
				if (gameState.curRound == gameState.totalRounds) {
					// Submit Score, allow them to play again
          addNewScore(gameState.userName, gameState.difficulty, gameState.totalRounds, gameState.totalScore);
				} else {
					$("#next_round").show();
				}
			});
			
			$("#next_round").click(function() {
				$("#submit").show();
				$("#next_round").hide();
				playRound();
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

  }
  return this;

})( jQuery );

function load_game(){
  $("body").hexed();
};
