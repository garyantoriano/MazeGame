/**
 * Created by Gary on 11/3/2016.
 */
function Cube(x, y, z, width, height, thickness, styleClass) {
	this.x = x;
	this.y = y;
  this.z = z;
  this.width = width;
  this.height = height;
  this.thickness = thickness;
  this.styleClass = styleClass;
  this.elementHtml = this.createCube();
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationDirectionX = 1;
  this.rotationDirectionY = 1;
}

Cube.prototype.createCube = function() {
  var top = document.createElement("div");
  top.style.width = this.width + 'px';
  top.style.height = this.thickness + 'px';

  var bottom = top.cloneNode(true);
  bottom.style.transform = 'rotateX(-90deg) translateZ('+((this.thickness/2)*-1)+'px)';
  bottom.classList.add('bottom');
  top.style.transform = 'rotateX(90deg) translateZ('+((this.thickness/2)-this.height)+'px)';
  top.classList.add('top');

  var left = document.createElement("div");
  left.style.width = this.thickness + 'px';
  left.style.height = this.height + 'px';
  var right = left.cloneNode(true);

  left.style.transform = 'rotateY(-90deg) translateZ('+(this.thickness/2)+'px)';
  left.classList.add('left');

  right.style.transform = 'rotateY(90deg) translateZ('+(this.width-(this.thickness/2))+'px)';
  right.classList.add('right');

  var front = document.createElement("div");
  front.style.width = this.width + 'px';
  front.style.height = this.height + 'px';
  var back = front.cloneNode(true);

  front.style.transform = 'translateZ('+(this.thickness/2)+'px)';
  front.classList.add('front');

  back.style.transform = 'rotateY(180deg) translateZ('+(this.thickness/2)+'px)';
  back.classList.add('back');


  var cube = document.createElement("div");
  cube.appendChild(top);
  cube.appendChild(bottom);
  cube.appendChild(left);
  cube.appendChild(right);
  cube.appendChild(front);
  cube.appendChild(back);
  cube.classList.add('cube');
  cube.classList.add(this.styleClass);
  cube.style.top = (this.y) + 'px';
  cube.style.left = (this.x) + 'px';

  cube.style.transformOrigin = this.height/2+'px '+this.width/2+'px';
  cube.style.transform = 'translateZ('+((this.z))+'px)';

  var container = document.getElementById('cube-container');
  container.appendChild(cube);
  return cube;
};

Cube.prototype.moveLeft = function () {
  this.x -= 1;
  this.rotationY -= 90*this.rotationDirectionY;
  this.rotationDirectionX *= -1;
  this.applyTransformations();
};

Cube.prototype.moveRight = function () {
  this.x += 1;
  this.rotationY += 90*this.rotationDirectionY;
  this.rotationDirectionX *= -1;
  this.applyTransformations();
};

Cube.prototype.moveUp = function () {
  this.y -= 1;
  this.rotationX += 90*this.rotationDirectionX;
  this.rotationDirectionY *= -1;
  this.applyTransformations();
};

Cube.prototype.moveDown = function () {
  this.y += 1;
  this.rotationX -= 90*this.rotationDirectionX;
  this.rotationDirectionY *= -1;
  this.applyTransformations();
};

Cube.prototype.applyTransformations = function (){

  this.elementHtml.style.left = (this.x * this.width) + 'px';
  this.elementHtml.style.top = (this.y * this.width) + 'px';
  this.elementHtml.style.transform = 'rotateX('+this.rotationX+'deg) rotateY('+this.rotationY+'deg)';
};