/**
 * Created by Gary on 11/3/2016.
 */
function Cube(x, y) {
	this.x = x;
	this.y = y;
	this.elementHtml = this.createCube();
}

Cube.prototype.createCube = function() {
  var cubeModel = document.getElementById('cube-model');
  var newCube = cubeModel.cloneNode(true);
  newCube.removeAttribute('id');
  newCube.classList.remove('hide');
  newCube.style.top = this.y*60 + 'px';
  newCube.style.left = this.x*60 + 'px';

  var container = document.getElementById('cube-container');
  container.appendChild(newCube);
}