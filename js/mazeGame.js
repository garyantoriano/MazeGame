/**
 * Created by Gary on 11/3/2016.
 */
const K_MOVE_UP = 119;
const K_MOVE_DOWN = 115;
const K_MOVE_LEFT = 97;
const K_MOVE_RIGHT = 100;

const K_ROTATE_X1 = 56;
const K_ROTATE_X2 = 53;
const K_ROTATE_Y1 = 54;
const K_ROTATE_Y2 = 52;
const K_ROTATE_Z1 = 55;
const K_ROTATE_Z2 = 57;

const PROGRESS_BAR_MAX = 500;
const ROTATION_VELOCITY = 5;

const CSS_PLAYER = 'player';
function MazeGame (rows, columns) {
	this.maze = new Maze(rows, columns);
	this.player = this.createPlayer();
  this.progressBar = new ProgressBar(PROGRESS_BAR_MAX);

	this.startGame = function () {
		setTimeout(this.hideButtonStart, 500);
		this.resumeGame();

		var that = this;
		setInterval( function (){
			that.progressBar.incrementValue();
		}, 200);
	};

	this.resumeGame = function () {
		document.getElementById('popup-start').classList.add('hide');
		document.getElementById('btn-pause').classList.remove('hide');
		document.getElementById('progress-bar-container').classList.remove('hide');
	};

	this.pauseGame = function () {
		document.getElementById('btn-pause').classList.add('hide');
		document.getElementById('progress-bar-container').classList.add('hide');
		document.getElementById('popup-start').classList.remove('hide');
	};

	this.endGame = function () {
		document.getElementById('btn-start').classList.remove('hide');
		document.getElementById('btn-restart').classList.add('hide');
		this.pauseGame();
	};

	this.hideButtonStart = function () {
		document.getElementById('btn-start').classList.add('hide');
		document.getElementById('btn-resume').classList.remove('hide');
	};

	document.addEventListener('keypress', this.move.bind(this), false);
}

MazeGame.prototype.createPlayer = function() {
	return new Cube(0, 0, 0, CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, CSS_PLAYER);
};

MazeGame.prototype.isValidPosition = function (x, y) {
	return this.maze.isValidPosition(x, y);
};

MazeGame.prototype.rotateX = function (x) {
	this.maze.rotateX(x);
};

MazeGame.prototype.rotateY = function (y) {
	this.maze.rotateY(y);
};

MazeGame.prototype.rotateZ = function (z) {
	this.maze.rotateZ(z);
};

MazeGame.prototype.move = function(e) {
	//console.log(e.keyCode);
	switch (e.keyCode){
		// CONTROLS FOR PLAYER
		case K_MOVE_LEFT:
			if(this.isValidPosition(this.player.x-1, this.player.y))
				this.player.moveLeft();
			break;

		case K_MOVE_RIGHT:
			if(this.isValidPosition(this.player.x+1,this.player.y))
				this.player.moveRight();
			break;

		case K_MOVE_UP:
			if(this.isValidPosition(this.player.x, this.player.y-1))
				this.player.moveUp();
			break;

		case K_MOVE_DOWN:
			if(this.isValidPosition(this.player.x, this.player.y+1))
				this.player.moveDown();
			break;

		// ROTATIONS
		case K_ROTATE_X1:
			this.maze.rotateX(ROTATION_VELOCITY);
			break;

		case K_ROTATE_X2:
			this.maze.rotateX(-ROTATION_VELOCITY);
			break;

		case K_ROTATE_Y1:
			console.log(e);
			this.maze.rotateY(ROTATION_VELOCITY);
			break;

		case K_ROTATE_Y2:
			this.maze.rotateY(-ROTATION_VELOCITY);
			break;

		case K_ROTATE_Z1:
			this.maze.rotateZ(-ROTATION_VELOCITY);
			break;

		case K_ROTATE_Z2:
			this.maze.rotateZ(ROTATION_VELOCITY);
			break;
	}
};







