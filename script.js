var origBoard;
const human = 'O';
const computer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');

// console.log(cells)
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	
	origBoard = Array.from(Array(9).keys());
	
	// console.log(origBoard)
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		document.getElementById(i).style.color = "black";
		cells[i].addEventListener('click', turnClick);
	}
}

function turnClick(event) {
	
	// console.log(event)
	if (typeof (origBoard[event.target.id] ) === 'number') {
		if(turn(event.target.id, human)){
			if (!checkTie()) turn(bestSpot(), computer);
		}
	}
}

function turn(squareId, player) {
	// console.log(origBoard)
	origBoard[squareId] = player;
	// console.log(origBoard)
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) {
		gameOver(gameWon)
		return false;
	}
	return true;
}

function checkWin(board, player) {
	let plays = 
	board.reduce((a, e, i) =>  (e === player) ? a.concat(i) : a, []);
	
	let gameWon = null;
	
	for (let [index, win] of winCombos.entries()) {
		console.log(index," index ", win,"win")
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor 
		= gameWon.player == human ? "blue" : "red";


		document.getElementById(index).style.color = "white";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick);
	}
	declareWinner(gameWon.player == human ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	// console.log(origBoard)
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
