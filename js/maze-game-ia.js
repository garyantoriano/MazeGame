/**
 * Created by Gary on 12/4/2016.
 */
const UP_DIRECTION = 1;
const DOWN_DIRECTION = 2;
const RIGHT_DIRECTION = 3;
const LEFT_DIRECTION = 4;
const IA_VELOCITY = 300;

function MazeGameIA(rows, columns){
  this.rows = rows;
  this.columns = columns;
  this.mazeGame = new MazeGame(rows, columns, true)
  this.mazeGame.startGame();
}

MazeGameIA.prototype.startGameIA = function (){
  var graph = new Graph(this.mazeGame.maze.maze);
  var start = graph.grid[0][0];
  var end = graph.grid[this.mazeGame.maze.columns-1][this.mazeGame.maze.rows-1];
  var result = astar.search(graph, start, end, true);

  var that = this;
  var key = 0;
  this.intervalId = setInterval(function(){
    if(key<result.length) {
      that.movePlayer(that.mazeGame.player, result[key]);
      key++;
    }
  }, IA_VELOCITY);
};

MazeGameIA.prototype.isGameEnd = function (node){
  var player = this.mazeGame.player;
  var endNode = this.mazeGame.maze.endPoint;
  if(player.x === endNode.x && player.y === endNode.y) {
    this.mazeGame.verifyEndGame();
    window.clearInterval(this.intervalId);
    this.startGameIA();
  }
};

MazeGameIA.prototype.movePlayer = function(player, node) {
  var direction = this.movementDirection(player, node);
  switch(direction) {
    case RIGHT_DIRECTION:
      player.moveRight();
      this.isGameEnd(node);
      break;

    case LEFT_DIRECTION:
      player.moveLeft();
      this.isGameEnd(node);

      break;

    case UP_DIRECTION:
      player.moveUp();
      this.isGameEnd(node);

      break;

    case DOWN_DIRECTION:
      player.moveDown();
      this.isGameEnd(node);

  }
};

MazeGameIA.prototype.movementDirection = function (player, node){
  if(player.x < node.x) {
    return RIGHT_DIRECTION;
  }
  if(player.x > node.x) {
    return LEFT_DIRECTION;
  }
  if(player.y >  node.y) {
    return UP_DIRECTION;
  }
  if(player.y < node.y) {
    return DOWN_DIRECTION;
  }
};

MazeGameIA.prototype.pauseGame = function (){

};

MazeGameIA.prototype.resumeGame = function (){

};