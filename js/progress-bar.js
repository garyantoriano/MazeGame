/**
 * Created by Gary on 11/3/2016.
 */
function ProgressBar(maxValue){
  this.value = 0;
  this.maxValue = maxValue;
  this.progressBarHtml = document.getElementById('progress-bar');
  this.progressBarHtml.setAttribute('value', '0');
  this.progressBarHtml.setAttribute('max', ''+this.maxValue);
  this.playerIcon = document.getElementById('player-icon');

  // this.pauseAnimation = function (){
  //   this.isPaused = true;
  // }
  //
  // this.resumeAnimation = function (){
  //   this.isPaused = false;
  // }
  //
  // this.restarAnimation = function (){
  //   this.stopAnimation();
  //   this.activeAnimation();
  // }
  //
  // this.stopAnimation = function (){
  //   window.clearInterval(this.animationId);
  // }
}

ProgressBar.prototype.incrementValue = function() {
  if(this.value  <= this.maxValue) {
    this.value++;
    this.progressBarHtml.value = this.value;

    var withProgressBar = this.progressBarHtml.offsetWidth;
    var newPositionPlayerIcon = (withProgressBar / this.maxValue) * this.value;
    this.playerIcon.style.left = newPositionPlayerIcon + 'px';
  }
}