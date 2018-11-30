(function( $ ){
  $.fn.hexed = function() {
  //Create the HTML document structure needed to format the classes and ids in the game/plugin
  var main = $("<div></div>");
  main.attr("id","main-game");

  var contentDiv = $("<div></div>");
  var content = $("<p></p>");

  var nameInput = "<input type=\"text\" placeholder=\"Enter name here\"> </input>";
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
          <input type="number" id="redNum"> \
          <input value="180" type="range" min="0" max="255" id="red"> \
      </div> \
      <div> \
          <label for="green">Green</label> \
          <input type="number" id="greenNum"> \
          <input value="130" type="range" min="0" max="255" id="green"> \
      </div> \
      <div> \
          <label for="blue">Blue</label> \
          <input type="number" id="blueNum"> \
          <input value="160" type="range" min="0" max="255" id="blue"> \
      </div> \
    </div>';

    var submitButton =
    '<div class="center"> \
      <button id="submit">Got it</button> \
    </div>';

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
  $("body").append(main);

  $( "#game-info" ).hide();
  $( "#colors" ).hide();
  $( ".sliders" ).hide();
  $( "#submit" ).hide();

 	//Remove load game button
	$("#load_game").remove();

  $("#start_game").click(function(){
    $( "#game-info" ).show();
    $( "#colors" ).show();
    $( ".sliders" ).show();
    $( "#submit" ).show();
    $( "#difficulty-label").html("Rounds:" + $("#difficulty").val());
    $( "#round-label").html("Difficulty:" + $("#rounds").val());
    $( "#difficulty").remove();
    $( "#rounds").remove();
  });

  // select RGB inputs
  let red = qs('#red'), green = qs('#green'), blue = qs('#blue');
  // selet num inputs
  let redNumVal = qs('#redNum'), greenNumVal = qs('#greenNum'), blueNumVal = qs('#blueNum');
  // select Color Display
  let colorDisplay = qs('#color-display');
  // select labels
  let redLbl = qs('label[for=red]'), greenLbl = qs('label[for=green]'), blueLbl = qs('label[for=blue]');

  // init display Colors
  displayColors();
  // init Color Vals
  colorNumrVals();
  // init ColorSliderVals
  initSliderColors();
  // init Change Range Val
  changeRangeNumVal();
  // init Colors controls
  colorSliders();

  function qs(selectEl){
      return document.querySelectorAll(selectEl)[0];
  }

  // display colors
  function displayColors(){
      colorDisplay.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
  }

  // initial color val numbers when DOM is loaded
  function colorNumrVals(){
      redNumVal.value = red.value;
      greenNumVal.value = green.value;
      blueNumVal.value = blue.value;
  }

  // initial colors when DOM is loaded
  function initSliderColors(){
      // label bg colors
      redLbl.style.background = `rgb(${red.value},0,0)`;
      greenLbl.style.background = `rgb(0,${green.value},0)`;
      blueLbl.style.background = `rgb(0,0,${blue.value})`;

      // slider bg colors
      red.style.background = `rgb(${red.value},0,0)`;
      green.style.background = `rgb(0,${green.value},0)`;
      blue.style.background = `rgb(0,0,${blue.value})`;
  }

  // change range values by number input
  function changeRangeNumVal(){
      redNumVal.addEventListener('change', ()=>{
          // make sure numbers are entered between 0 to 255
          if(redNumVal.value > 255){
              alert('cannot enter numbers greater than 255');
              redNumVal.value = red.value;
          } else if(redNumVal.value < 0) {
              alert('cannot enter numbers less than 0');
              redNumVal.value = red.value;
          } else {
              red.value = redNumVal.value;
              initSliderColors();
              displayColors();
          }
      });
      greenNumVal.addEventListener('change', ()=>{
          // make sure numbers are entered between 0 to 255
          if(greenNumVal.value > 255){
              alert('cannot enter numbers greater than 255');
              greenNumVal.value = green.value;
          } else if(greenNumVal.value < 0) {
              alert('cannot enter numbers less than 0');
              greenNumVal.value = green.value;
          } else {
              green.value = greenNumVal.value;
              initSliderColors();
              displayColors();
          }
      });

      blueNumVal.addEventListener('change', ()=>{
          // make sure numbers are entered between 0 to 255
          if (blueNumVal.value > 255) {
              alert('cannot enter numbers greater than 255');
              blueNumVal.value = blue.value;
          } else if (blueNumVal.value < 0) {
              alert('cannot enter numbers less than 0');
              blueNumVal.value = blue.value;
          } else {
              blue.value = blueNumVal.value;
              initSliderColors();
              displayColors();
          }
      });
  }

  // Color Sliders controls
  function colorSliders(){
    red.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumrVals();
    });

    green.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumrVals();
    });

    blue.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumrVals();
    });
  }
}

  return this;

})( jQuery );

function load_game(){
  $("body").hexed();
};
