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

const PROGRESS_BAR_MAX = 100;
const CONTROLS_VELOCITY = 10;

const CSS_PLAYER = 'player';
const TIME_VELOCITY = 500;
const MAX_TIME_GAME = 50;

function MazeGame (rows, columns, ia) {
  this.rows = rows;
  this.columns = columns;
  this.ia = ia;
	this.maze = new Maze(rows, columns);
	this.player = this.createPlayer();
  this.progressBar = new ProgressBar(PROGRESS_BAR_MAX);
  this.pause = true;
  this.level = 0;
  this.levelHtml = document.getElementById('level-number');
  this.levelHtml.textContent = this.level;
  this.timeHtml = document.getElementById('time');
  this.timeHtml.textContent = '00:00';
  this.time = MAX_TIME_GAME;
  this.maxTime = MAX_TIME_GAME;

	this.startGame = function (){
    this.setIconsNormal();
    this.pause = false;
    setTimeout(this.hideButtonStart, 500);
    this.resumeGame();

    var that = this;
    this.intervalId = setInterval(function (){
      if (that.time == 0) {
        that.gameOver();
      }
      if (that.time < that.maxTime / 2) {
        that.enemyIconHappy();
        that.playerIconSick();
      }
      if (that.pause === false) {
        that.progressBar.incrementValue();
        that.timeHtml.textContent = that.getNexTime();
      }
    }, TIME_VELOCITY);
  };

	this.getNexTime = function (){
	  if(this.time >0) {
      this.time -= 1;
      var minutes = Math.floor(this.time/60);
      var seconds = this.time%60;
      return minutes + ':' + seconds;
    }
    return '0:0';
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

	this.hideButtonStart = function () {
		document.getElementById('btn-start-human').classList.add('hide');
    document.getElementById('btn-start-ia').classList.add('hide');
		document.getElementById('btn-resume').classList.remove('hide');
	};

	//hear keyboard events
	document.addEventListener('keypress', this.move.bind(this), false);
}

MazeGame.prototype.enemyIconHappy = function (){
  document.getElementById('enemy-icon').classList.add('happy');
};

MazeGame.prototype.playerIconSick = function (){
  document.getElementById('player-icon').classList.add('sick');
};

MazeGame.prototype.setIconsNormal = function (){
  document.getElementById('enemy-icon').classList.remove('happy');
  document.getElementById('player-icon').classList.remove('sick');

  document.getElementById('image-popup').classList.remove('sick');
  document.getElementById('image-popup').classList.remove('normal');
};
MazeGame.prototype.gameOver = function (){
  document.getElementById('btn-resume').classList.add('hide');
  window.clearInterval(this.intervalId);
  this.pause = true;
  document.getElementById('image-popup').classList.add('sick');

  document.getElementById('information-content').classList.add('hide');
  document.getElementById('progress-bar-container').classList.add('hide');
  document.getElementById('popup-start').classList.remove('hide');

};

MazeGame.prototype.nextLevel = function (){
  this.maze.delete();
  this.progressBar.reset();
  this.setIconsNormal();

  this.time = this.maxTime;
  this.timeHtml.textContent = '0:0';

  var increment = this.level%2 === 0 ? this.level : this.level+1;
  this.level++;
  this.levelHtml.textContent = this.level;

  this.maze = new Maze(this.rows+increment, this.columns+increment);
  this.player = this.createPlayer();
  this.progressBar = new ProgressBar(PROGRESS_BAR_MAX);
};


MazeGame.prototype.createPlayer = function() {
	return new Cube(0, 0, 0, this.maze.cubeSize, this.maze.cubeSize, this.maze.cubeSize, CSS_PLAYER);
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
    this.nextLevel();
  }
};

MazeGame.prototype.move = function(e) {
	if(this.pause === false && this.ia == false) {
	  // console.log(e.keyCode);
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
		}
	}

	switch (e.keyCode) {
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
};







