/**
 * Created by Gary on 11/3/2016.
 */
function MazeGame (rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.matrix = createMatrix.call(this);
	this.maze = chargeMaze.call(this);
  this.progressBar = new ProgressBar();

	this.startGame = function () {
		setTimeout(this.hideButtonStart, 500);
		this.restartGame();
    this.progressBar.activeAnimation();
	}

	this.restartGame = function () {
		document.getElementById('popup-start').classList.add('hide');
		document.getElementById('btn-pause').classList.remove('hide');
		document.getElementById('progress-bar-container').classList.remove('hide');
	}

	this.pauseGame = function () {
		document.getElementById('btn-pause').classList.add('hide');
		document.getElementById('progress-bar-container').classList.add('hide');
		document.getElementById('popup-start').classList.remove('hide');
	}

	this.endGame = function () {
		document.getElementById('btn-start').classList.remove('hide');
		document.getElementById('btn-restart').classList.add('hide');
		this.pauseGame();
	}

	this.hideButtonStart = function () {
		document.getElementById('btn-start').classList.add('hide');
		document.getElementById('btn-restart').classList.remove('hide');
	}

	function createMatrix(){
		var matrix = new Array(this.rows);
		for(var i=0; i<this.rows; i++) {
			matrix[i] = new Array(this.columns);
			for(var j=0; j<this.columns; j++) {
				if((i+j)%2===0){
					matrix[i][j] = 1;
				} else {
					matrix[i][j] = 0;
				}
			}
		}
		return matrix;
	}

	 function chargeMaze (){
		var maze = new Array(this.rows);
		for(var i=0; i<this.rows; i++) {
			maze[i] = new Array(this.columns);
			for(var j=0; j<this.columns; j++) {
				 if(this.matrix[i][j]===0){
        //if(true){
					maze[i][j] = new Cube(i,j);
				}
			}
		}
		return maze;
	}

}
