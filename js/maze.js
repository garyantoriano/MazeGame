/**
 * Created by Gary on 11/26/2016.
 */
const MAZE_WITH = 700;
const THICKNESS_PLATFORM = 20;

const VISITED = 1;
const WALL = 0;
const NON_VISITED = 2;
const FUTURE_VISIT = 3;

const CSS_WALL_BRICK = 'wall';
const CSS_FLOOR_GRASS = 'floor';
const CSS_START_POSITION = 'start-position';
const CSS_END_POSITION = 'end-position'

function Maze(rows, columns){
  this.rows = rows;
  this.columns = columns;
  this.cubeSize = MAZE_WITH/this.columns;
  this.maze = [];
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;
  this.zoom = 1;
  this.createPlatform();
  this.createMaze();
  this.showMaze();
  this.drawStartAndEndPoint();
  this.mazeHtml = document.getElementById('cube-container');
}

Maze.prototype.createPlatform = function (){
  var posX = -this.cubeSize;
  var posY = -this.cubeSize;
  var posZ = -this.cubeSize/2;
  var width =  (this.columns+2)*this.cubeSize;
  var height = (this.rows+2)*this.cubeSize;

  new Cube(posX, posY, posZ, width, height, THICKNESS_PLATFORM, CSS_FLOOR_GRASS);
};

Maze.prototype.delete = function (){
  while(this.mazeHtml.hasChildNodes()) {
    this.mazeHtml.removeChild(this.mazeHtml.lastChild);
  }
};

//*********************** IMPLEMENTATION OF PRIM ALGORITHM ********************************
Maze.prototype.createMaze = function() {
  var nonVisitedNodes = [];
  var wallNodes = [];

  this.maze = new Array(this.columns);

  for(var i=0; i<this.columns; i++) {
    this.maze[i] = new Array(this.rows);
    for(var j=0; j<this.rows; j++) {
      if(i%2 == 0 && j%2 == 0) {
        this.maze[i][j] = NON_VISITED; //Not visited
        nonVisitedNodes.push({x: i, y: j});
        // console.log(nonVisitedNodes);
      }
      else {
        this.maze[i][j] = WALL; //Wall
        wallNodes.push({x: i, y: j});
      }
    }
  }

  var futureVisitNodes = [];
  var node = this.popRandomNode(nonVisitedNodes);

  this.deleteWall(node);
  this.markAsVisited(futureVisitNodes, node);

  while(futureVisitNodes.length > 0) {
    node = this.popRandomNode(futureVisitNodes);
    this.deleteWall(node);
    this.markAsVisited(futureVisitNodes, node);
  }
};

Maze.prototype.deleteWall = function(node) {
  if(node.x-2 >= 0 && this.maze[node.x-2][node.y] == VISITED) {
    this.maze[node.x-1][node.y] = VISITED;
    return;
  }
  if(node.x+2 < this.columns && this.maze[node.x+2][node.y] == VISITED) {
    this.maze[node.x+1][node.y] = VISITED;
    return;
  }
  if(node.y-2 >= 0 && this.maze[node.x][node.y-2] == VISITED) {
    this.maze[node.x][node.y-1] = VISITED;
    return;
  }
  if(node.y+2 < this.rows && this.maze[node.x][node.y+2] == VISITED) {
    this.maze[node.x][node.y+1] = VISITED;
  }
};

Maze.prototype.markAsVisited = function(futureVisitNodes, node) {
  this.maze[node.x][node.y] = VISITED; //Visited
  this.markFutureVisits(futureVisitNodes, node);

};

Maze.prototype.markFutureVisits = function (futureVisitNodes, node) {
  //Left
  if(node.x-2>= 0) {
    this.addFutureVisit(futureVisitNodes, {x: node.x-2, y: node.y});
  }
  //Right
  if(node.x + 2 < this.columns) {
    this.addFutureVisit(futureVisitNodes, {x: node.x+2, y: node.y});
  }

  //Top
  if(node.y - 2 >= 0) {
    this.addFutureVisit(futureVisitNodes, {x: node.x, y: node.y-2});
  }

  //Bottom
  if(node.y + 2 < this.rows) {
    this.addFutureVisit(futureVisitNodes, {x: node.x, y: node.y+2});
  }
};

Maze.prototype.addFutureVisit = function(futureVisitNodes, node) {
  if (this.maze[node.x][node.y] === NON_VISITED ) {
    this.maze[node.x][node.y] = FUTURE_VISIT;
    futureVisitNodes.push(node);
  }
};

Maze.prototype.popRandomNode = function(nodes) {
  var index = Math.floor(Math.random()*nodes.length);
  var node = nodes[index];
  nodes.splice(index, 1); //Quitamos el nodo
  return node;
};
//************************ END OF PRIM ALGORITHM **********************************

//Draw Start and End point
Maze.prototype.drawStartAndEndPoint = function() {
  new Cube(0, 0, -THICKNESS_PLATFORM/2, this.cubeSize, this.cubeSize, this.cubeSize, CSS_START_POSITION);
  new Cube((this.columns-1)*this.cubeSize, (this.rows-1)*this.cubeSize, -THICKNESS_PLATFORM/2, this.cubeSize, this.cubeSize, this.cubeSize, CSS_END_POSITION);
  this.startPoint = {x: 0, y: 0};
  this.endPoint = {x: this.columns-1, y: this.rows-1};
};

//********************** SHOW MAZE *********************************************
Maze.prototype.showMaze = function() {
  for(var i=0; i<this.columns; i++) {
    for(var j=0; j<this.rows; j++) {
      if(this.maze[i][j]===WALL){
        new Cube(i*this.cubeSize, j*this.cubeSize, 0, this.cubeSize, this.cubeSize, this.cubeSize, CSS_WALL_BRICK);
      }
    }
  }

  //Drawing borders
  for(i=-1; i<=this.columns; i++) {
    new Cube(i*this.cubeSize,-1*this.cubeSize, 0, this.cubeSize, this.cubeSize, this.cubeSize, CSS_WALL_BRICK); //draw top border
    new Cube(i*this.cubeSize, this.rows*this.cubeSize, 0, this.cubeSize, this.cubeSize, this.cubeSize, CSS_WALL_BRICK); //draw down border
  }
  for(i=-1; i<=this.rows; i++) {
    new Cube(-1*this.cubeSize, i*this.cubeSize, 0, this.cubeSize, this.cubeSize, this.cubeSize, CSS_WALL_BRICK); //draw left border
    new Cube(this.columns*this.cubeSize, i*this.cubeSize, 0, this.cubeSize, this.cubeSize, this.cubeSize, CSS_WALL_BRICK); //draw right border
  }
};

Maze.prototype.isValidPosition = function(x, y) {
  if(x >= 0 && x < this.columns && y >= 0 && y < this.rows) {
    return this.maze[x][y] === VISITED;
  }
  return false;
};

Maze.prototype.isOnEndPoint = function(cube) {
  return cube.x == this.endPoint.x && cube.y  == this.endPoint.y;
};
// ******************************* MOTION *************************************
Maze.prototype.rotateX = function(x) {
  this.rotationX += x;
  this.applyTransformations();
};

Maze.prototype.rotateY = function(y) {
  this.rotationY += y;
  this.applyTransformations();
};

Maze.prototype.rotateZ = function(z) {
  this.rotationZ += z;
  this.applyTransformations();
};

Maze.prototype.zoomCamera = function (zoom){
  this.zoom += zoom;
  this.mazeHtml.style.transform=
    'rotateX('+this.rotationX+'deg) ' +
    'rotateY('+this.rotationY+'deg) ' +
    'rotateZ('+this.rotationZ+'deg) ' +
    'translateZ('+this.zoom+'px)';
};

Maze.prototype.applyTransformations = function (){
  this.mazeHtml.style.transform=
    'rotateX('+this.rotationX+'deg) ' +
    'rotateY('+this.rotationY+'deg) ' +
    'rotateZ('+this.rotationZ+'deg) ' +
    'translateZ('+this.zoom+'px)';
};
