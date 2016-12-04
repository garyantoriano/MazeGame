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
}

ProgressBar.prototype.incrementValue = function() {
  if(this.value  <= this.maxValue) {
    this.value++;
    this.progressBarHtml.value = this.value;

    var withProgressBar = this.progressBarHtml.offsetWidth;
    var newPositionPlayerIcon = (withProgressBar / this.maxValue) * this.value;
    this.playerIcon.style.left = newPositionPlayerIcon + 'px';
  }
};

ProgressBar.prototype.reset = function (){
  this.value = 0;
  this.playerIcon.style.left = '0px';
};