/**
 * Created by Gary on 11/3/2016.
 */
var mazeGame;
function startGame() {
	mazeGame = new MazeGame(3, 3);
	mazeGame.startGame();
}

function pauseGame() {
	mazeGame.pauseGame();
}

function resumeGame() {
	mazeGame.resumeGame();
}

// startGame();