(function( $ ) {
  $.fn.hexed = function () {

    // Defalut settings
    var gameState = {
      userName : "",
      difficulty : 5,
      curRound : 0,
      totalRound : 5,
      lastScore : 0,
      totalScore : 10,
      maxScore : 0,
      startingTime : 0,
      endingTime : 0
    }

    var expectedRGB = {
      R : '',
      G : '',
      B : ''
    }

    var actualRGB = {
      R : '',
      G : '',
      B : ''
    }

    function randomColor(color) {
      var choice = '0123456789ABCDEF';
      color.R = choice[Math.floor(Math.random() * 16)] + choice[Math.floor(Math.random() * 16)];
      color.G = choice[Math.floor(Math.random() * 16)] + choice[Math.floor(Math.random() * 16)];
      color.B = choice[Math.floor(Math.random() * 16)] + choice[Math.floor(Math.random() * 16)];
    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }

    function calcScore (expect,actual,difficult,timespent) {
      var hexE = "#"+expect['R']+expect['G']+expect['B'];
      var hexA = "#"+actual['R']+actual['G']+actual['B'];
      var rgbE = hexToRgb(hexE);
      var rgnA = hexToRgb(hexA);
      var valR = (Math.abs(rgbE.r-rgbA.r)/255)*100;
      var valG = (Math.abs(rgbE.g-rgbA.g)/255)*100;
      var valB = (Math.abs(rgbE.b-rgbA.b)/255)*100;
      var avg_poff = (valR+valG+valB)/3;

      var result = ((15-difficult-avg_poff)/(15-difficult))*(15000-timespent);
      if (result<0) {
          result = 0;
      }
      return result.toPrecision(2);
    }
  }
}
