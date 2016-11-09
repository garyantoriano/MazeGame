/**
 * Created by Gary on 11/3/2016.
 */
function ProgressBar(){
  this.activeAnimation = function (){
    var progressBar = document.getElementById('progress-bar');
    var value = 0;
    var playerIcon = document.getElementById('player-icon');
    var positionPlayerIcon = parseInt(playerIcon.offsetLeft, 10);
    console.log(playerIcon.offsetLeft);

    setInterval(function (){
      value = value + 1;
      positionPlayerIcon = positionPlayerIcon + 1;
      progressBar.value = value;
      playerIcon.style.left = positionPlayerIcon + 'px';
    }, 300);
  }
}