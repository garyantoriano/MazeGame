/**
 * Created by Gary on 11/26/2016.
 */
const CUBE_SIZE = 35;
const VISITED = 0;
const WALL = 1;
const NON_VISITED = 2;
const FUTURE_VISIT = 3;
const CSS_WALL_BRICK = 'wall';
const CSS_FLOOR_GRASS = 'floor';
const THICKNESS_PLATFORM = 10;

function Maze(rows, columns){
  this.rows = rows;
  this.columns = columns;
  this.maze = [];
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;
  this.createPlatform();
  this.createMaze();
  this.showMaze();
  this.mazeHtml = document.getElementById('cube-container');
}

Maze.prototype.createPlatform = function (){
  var posX = -CUBE_SIZE;
  var posY = CUBE_SIZE*Math.floor(this.rows/2);
  var posZ = -2;
  var width =  (this.columns+2)*CUBE_SIZE;
  var height = THICKNESS_PLATFORM;
  var thickness = (this.rows+2)*CUBE_SIZE;
  var styleClass = CSS_FLOOR_GRASS;
  new Cube(posX, posY, posZ, width, height, thickness, styleClass);
};

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

Maze.prototype.deleteWall = function (node){
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

Maze.prototype.markAsVisited = function (futureVisitNodes, node){
  this.maze[node.x][node.y] = VISITED; //Visited
  this.markFutureVisits(futureVisitNodes, node);

};

Maze.prototype.markFutureVisits = function (futureVisitNodes, node){
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

//********************** SHOW MAZE *********************************************
Maze.prototype.showMaze = function (){
  for(var i=0; i<this.columns; i++) {
    for(var j=0; j<this.rows; j++) {
      if(this.maze[i][j]===WALL){
        new Cube(i*CUBE_SIZE, j*CUBE_SIZE, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_WALL_BRICK);
      }
    }
  }

  //Drawing borders
  for(i=-1; i<=this.columns; i++) {
    new Cube(i*CUBE_SIZE,-1*CUBE_SIZE, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_WALL_BRICK); //draw top border
    new Cube(i*CUBE_SIZE, this.rows*CUBE_SIZE, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_WALL_BRICK); //draw down border
  }
  for(i=-1; i<=this.rows; i++) {
    new Cube(-1*CUBE_SIZE, i*CUBE_SIZE, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_WALL_BRICK); //draw left border
    new Cube(this.columns*CUBE_SIZE, i*CUBE_SIZE, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_WALL_BRICK); //draw right border
  }
};

Maze.prototype.isValidPosition = function(x, y) {
  if(x >= 0 && x < this.columns && y >= 0 && y < this.rows)
  {
    return this.maze[x][y] === 0;
  }
  return false;
};

Maze.prototype.rotateX = function(x) {
  this.rotationX += x;
  this.mazeHtml.style.transform='rotateX('+this.rotationX+'deg) rotateY('+this.rotationY+'deg) rotateZ('+this.rotationZ+'deg)';
};

Maze.prototype.rotateY = function(y) {
  this.rotationY += y;
  this.mazeHtml.style.transform='rotateX('+this.rotationX+'deg) rotateY('+this.rotationY+'deg) rotateZ('+this.rotationZ+'deg)';
};

Maze.prototype.rotateZ = function(z) {
  this.rotationZ += z;
  this.mazeHtml.style.transform='rotateX('+this.rotationX+'deg) rotateY('+this.rotationY+'deg) rotateZ('+this.rotationZ+'deg)';
};
