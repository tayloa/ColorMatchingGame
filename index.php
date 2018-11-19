<?php
	// if (isset($_POST["preferences"])) {
	// 	// Get input values from form
	// 	// TODO: make input strings safe
	// 	$message = $_POST["course1"];
	// 	echo "<script type='text/javascript'>alert('$message');</script>";
	// 	// $email = $_POST["email"];
	// 	// $first_name = $_POST["first_name"];
	// 	// $last_name = $_POST["last_name"];
	// 	// $password = $_POST["password"];
	// 	// $school = $_POST["school"];
	// 	//
	// 	// // TODO: Ensure all fields are filled out
	// 	// if (createUser($email, $first_name, $last_name, $password, $school)) {
	// 	// 	// TODO: Redirect new user to dashboard and have them signed in.
	// 	// }
	// 	if(isset($_POST['update'])) {
  //       $dbhost = 'localhost:3036';
  //       $dbuser = 'root';
  //       $dbpass = 'rootpassword';
  //
  //       $conn = mysql_connect($dbhost, $dbuser, $dbpass);
  //
  //       if(! $conn ) {
  //          die('Could not connect: ' . mysql_error());
  //       }
  //
  //       $emp_id = $_POST['emp_id'];
  //       $emp_salary = $_POST['emp_salary'];
  //
  //       $sql = "UPDATE employee ". "SET emp_salary = $emp_salary ".
  //          "WHERE emp_id = $emp_id" ;
  //       mysql_select_db('test_db');
  //       $retval = mysql_query( $sql, $conn );
  //
  //       if(! $retval ) {
  //          die('Could not update data: ' . mysql_error());
  //       }
  //       echo "Updated data successfully\n";
  //
  //       mysql_close($conn);
	// }
?>

<style>
<?php include 'resources/css/style.css'; ?>
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
            <div id="game-color" class="circle">

            </div>
            <div id="choice-color" class="circle">

            </div>
          </div>
				</div>
        <div class="center">
          <input type="submit" name="choices" value="Got it!" />
        </div>
			</form>
    </div>
  </body>
</html>
