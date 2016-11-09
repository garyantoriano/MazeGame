/**
 * Created by Gary on 11/3/2016.
 */
var mazeGame;
function startGame() {
	mazeGame = new MazeGame(10 ,4);
	mazeGame.startGame();

}

function pauseGame() {
	mazeGame.pauseGame();
}

function restartGame() {
	mazeGame.restartGame();
}