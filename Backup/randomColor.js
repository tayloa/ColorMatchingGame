
/*function randomly choses letter/number from choice variable*/

function getRandomColor() {
  var choice = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += choice[Math.floor(Math.random() * 16)];
  }
  return color;
}

/*function sets background color of circle with random color created with above function*/

function setRandomColor() {
  $("#circle2").css("background-color", getRandomColor());
}


/*Used function on Stacks Overflow as example when creating this one*/
