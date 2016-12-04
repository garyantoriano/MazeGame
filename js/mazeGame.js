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

const K_ZOOM_1 = 49;
const K_ZOOM_2 = 51;

const PROGRESS_BAR_MAX = 500;
const CONTROLS_VELOCITY = 5;

const CSS_PLAYER = 'player';

function MazeGame (rows, columns) {
  this.rows = rows;
  this.columns = columns;
	this.maze = new Maze(rows, columns);
	this.player = this.createPlayer();
  this.progressBar = new ProgressBar(PROGRESS_BAR_MAX);
	this.pause = true;
  this.level = 0;

	this.startGame = function () {
		this.pause = false;
		setTimeout(this.hideButtonStart, 500);
		this.resumeGame();

		var that = this;
		setInterval( function (){
			that.progressBar.incrementValue();
		}, 200);
	};

	this.resumeGame = function () {
		this.pause = false;
		document.getElementById('popup-start').classList.add('hide');
		document.getElementById('information-content').classList.remove('hide');
		document.getElementById('progress-bar-container').classList.remove('hide');
	};

	this.pauseGame = function () {
		this.pause = true;
		document.getElementById('information-content').classList.add('hide');
		document.getElementById('progress-bar-container').classList.add('hide');
		document.getElementById('popup-start').classList.remove('hide');
	};

	this.endGame = function () {
		document.getElementById('btn-start').classList.remove('hide');
		document.getElementById('btn-resume').classList.add('hide');
		this.nextLevel();
	};

	this.hideButtonStart = function () {
		document.getElementById('btn-start').classList.add('hide');
		document.getElementById('btn-resume').classList.remove('hide');
	};

	//hear keyboard events
	document.addEventListener('keypress', this.move.bind(this), false);
}

MazeGame.prototype.nextLevel = function (){
  this.maze.delete();
  this.progressBar.reset();

  var increment = this.level%2 === 0 ? this.level : this.level+1;
  this.level++;

  this.maze = new Maze(this.rows+increment, this.columns+increment);
  this.player = this.createPlayer();
  this.progressBar = new ProgressBar(PROGRESS_BAR_MAX);
};


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

MazeGame.prototype.verifyEndGame = function (){
  if(this.maze.isOnEndPoint(this.player) === true) {
    this.endGame();
  }
};

MazeGame.prototype.move = function(e) {
	if(this.pause === false) {
		switch (e.keyCode) {
			// CONTROLS FOR PLAYER
			case K_MOVE_LEFT:
				if(this.isValidPosition(this.player.x-1, this.player.y)) {
          this.player.moveLeft();
          this.verifyEndGame();
        }
				break;

			case K_MOVE_RIGHT:
				if(this.isValidPosition(this.player.x+1,this.player.y)) {
          this.player.moveRight();
          this.verifyEndGame();
        }
				break;

			case K_MOVE_UP:
				if(this.isValidPosition(this.player.x, this.player.y-1)) {
          this.player.moveUp();
          this.verifyEndGame();
        }
				break;

			case K_MOVE_DOWN:
				if(this.isValidPosition(this.player.x, this.player.y+1)) {
          this.player.moveDown();
          this.verifyEndGame();
        }
				break;

			// ROTATIONS
			case K_ROTATE_X1:
				this.maze.rotateX(CONTROLS_VELOCITY);
				break;

			case K_ROTATE_X2:
				this.maze.rotateX(-CONTROLS_VELOCITY);
				break;

			case K_ROTATE_Y1:
				this.maze.rotateY(CONTROLS_VELOCITY);
				break;

			case K_ROTATE_Y2:
				this.maze.rotateY(-CONTROLS_VELOCITY);
				break;

			case K_ROTATE_Z1:
				this.maze.rotateZ(-CONTROLS_VELOCITY);
				break;

			case K_ROTATE_Z2:
				this.maze.rotateZ(CONTROLS_VELOCITY);
				break;

			case K_ZOOM_1:
				this.maze.zoomCamera(-CONTROLS_VELOCITY*3);
				break;

			case K_ZOOM_2:
				this.maze.zoomCamera(+CONTROLS_VELOCITY*3);
				break;
		}
	}
};







