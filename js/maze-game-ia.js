/**
 * Created by Gary on 12/4/2016.
 */

function MazeGameIA(rows, columns){
  this.rows = rows;
  this.columns = columns;
  this.mazeGame = new MazeGame(rows, columns, true)
  this.mazeGame.startGame();
}

MazeGameIA.prototype.startGameIA = function (){
  var graph = new Graph(this.mazeGame.maze.maze);
  var start = graph.grid[0][0];
  var end = graph.grid[this.rows-1][this.rows-1];
  var result = astar.search(graph, start, end, true);
  console.log(result);

};

MazeGameIA.prototype.pauseGame = function (){

};

MazeGameIA.prototype.resumeGame = function (){

};