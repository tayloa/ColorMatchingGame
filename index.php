<?php
	if (isset($_POST["choices"])) {
		// Get input values from form
		// TODO: make input strings safe
		$message = $_POST["difficulty"];
    $message = $_POST["score"];
		echo "<script type='text/javascript'>alert('$message');</script>";
	}
?>

<style>
<?php include 'resources/css/style.css'; ?>
<?php include 'resources/css/slider.css'; ?>
</style>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Hexxed!</title>
  </head>
  <body class="center">
    <div class="center">
      <h1>Hexxed!</h1>
      <h2>A Color Matching Game</h2>
    </div>

    <div id="main-game">
      <form id="choices" method="POST">
				<div>
					<p>
						<label for="difficulty">Difficulty:</label>
						<select id="difficulty" name="difficulty">
						  <option value=1>1</option>
							<option value=2>2</option>
              <option value=3>3</option>
							<option value=4>4</option>
              <option value=5>5</option>
							<option value=6>6</option>
              <option value=7>7</option>
							<option value=8>8</option>
              <option value=9>9</option>
							<option value=10>10</option>
						</select>
            <label for="round">Rounds:</label>
						<select id="rounds" name="rounds">
              <option value=1>1</option>
							<option value=2>2</option>
              <option value=3>3</option>
							<option value=4>4</option>
              <option value=5>5</option>
							<option value=6>6</option>
              <option value=7>7</option>
							<option value=8>8</option>
              <option value=9>9</option>
							<option value=10>10</option>
						</select>
					</p>
          <div>
            <span id="score">Score: </span>
            <span id="round-num">Round: </span>
          </div>
          <div id="colors" class="center">
            <div id="game-color" class="circle"></div>
						<div id="color-display" class="circle"></div>
          </div>

					<div class="center">
						<div class="sliders">
							<div>
									<label for="red">Red</label>
									<input type="number" id="redNum">
									<input value="180" type="range" min="0" max="255" id="red">
							</div>
							<div>
									<label for="green">Green</label>
									<input type="number" id="greenNum">
									<input value="130" type="range" min="0" max="255" id="green">
							</div>
							<div>
									<label for="blue">Blue</label>
									<input type="number" id="blueNum">
									<input value="160" type="range" min="0" max="255" id="blue">
							</div>
						</div>
					</div>


				</div>
        <div class="center">
          <input type="submit" name="choices" value="Got it!" />
        </div>
			</form>
    </div>
		<script src="slider.js"></script>
  </body>
</html>
