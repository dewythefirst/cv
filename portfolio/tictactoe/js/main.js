let gameSpace = document.querySelector(".game-space");
gameSpace.addEventListener("click", gameSpaceClick);
let cover = document.querySelector(".cover");

function gameSpaceClick(e) {
    let target = e.target;
    while (target !== gameSpace) {
        if (target.classList.contains("cover")) {
            game.initialize();
            return;
        }
        target = target.parentNode;
    }
    if (e.target.classList.contains("cell")) {
        game.makeMove(e);
    }
}

function Game() {
    let isRunning = false;
    let moveCounter = 0;
    this.initialize = function () {
        let cover = document.querySelector(".cover");
        if (!isRunning) {
            cover.classList.remove("active");
            isRunning = true;
        } else {
            cover.classList.add("active");
            isRunning = false;
            throw "Game is already running";
        }
        let cells = Array.from(gameSpace.querySelectorAll(".game-space .cell"));
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
            cells[i].classList.remove("open", "won");
        }
        moveCounter = 0;
        changeTurn();
    };
    let increaseCounter = function () {
        moveCounter++;
    };
    this.makeMove = function (e) {
        let element = e.target;
        if (element.classList.contains("open"))
            return;
        if (!playerTurn) {
            element.innerText = "o";
        } else {
            element.innerText = "x";
        }
        element.classList.add("open");
        increaseCounter();
        if (moveCounter >= 5) {
            checkWin();
        } else {
            changeTurn();
        }
    };
    let playerTurn = null;
    let changeTurn = function () {
        if (playerTurn == null) {
            playerTurn = Math.round(Math.random());
            makePlayerActive(playerTurn);
            return;
        }
        playerTurn = !playerTurn;
        makePlayerActive(playerTurn);
    };

    let makePlayerActive = function (player) {
        let player1 = document.querySelector(".player[data-number='1']");
        let player2 = document.querySelector(".player[data-number='2']");
        if (player) {
            player1.classList.add("active");
            player2.classList.remove("active");
        } else {
            player1.classList.remove("active");
            player2.classList.add("active");
        }
        timer.reset();
        timer.start();
    };

    let checkWin = function () {
        if (moveCounter === 9) {
            endGame(1); // draw
        }
        let winLines = [
            ["0", "1", "2"],
            ["3", "4", "5"],
            ["6", "7", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["0", "4", "8"],
            ["2", "4", "6"],
        ];
        let allCells = Array.from(document.querySelectorAll(".game-space .cell"));
        let counterX, counterO;
        let xCellsArray = [], oCellsArray = [];
        for (var i = 0; i < winLines.length; i++) {
            counterX = 0;
            counterO = 0;
            xCellsArray = [];
            oCellsArray = [];
            for (var k = 0; k < winLines[i].length; k++) {
                let cellNumber = +winLines[i][k];
                // console.log(allCells[cellNumber].innerText);
                if (allCells[cellNumber].innerText === "X") {
                    counterX++;
                    xCellsArray.push(allCells[cellNumber]);
                }
                if (allCells[cellNumber].innerText === "O") {
                    counterO++;
                    oCellsArray.push(allCells[cellNumber]);
                }
                if (k === 2 && (counterX === 3 || counterO === 3)) {
                    if (counterX === 3) {
                        for (var x = 0; x < xCellsArray.length; x++) {
                            xCellsArray[x].classList.add("won");
                        }
                        endGame(0, 0);
                        return;
                    }
                    else {
                        for (var o = 0; o < oCellsArray.length; o++) {
                            oCellsArray[o].classList.add("won");
                        }
                        endGame(0, 1);
                        return;
                    }
                }
            }
        }
        changeTurn();
    };
    let endGame = function (isDraw, player) {
        if (isDraw) {
            cover.querySelector("span").innerHTML = "Draw!<br>Click to start";
        } else {
            if (player === 0) {
                cover.querySelector("span").innerHTML = "Player 1 won!<br>Click to start";
            } else {
                cover.querySelector("span").innerHTML = "Player 2 won!<br>Click to start";
            }
        }
        cover.classList.add("active");
        isRunning = false;
        timer.stop();
    };
}

function Timer() {
    let timerHolder = document.querySelector(".timer");
    let interval;
    this.start = function () {
        let endTime = new Date().getTime() + 30000;
        let timeNow, timePassed;
        let self = this;
        interval = setInterval(function (self) {
            timeNow = new Date().getTime();
            timePassed = new Date(endTime - timeNow);
            let seconds = timePassed.getSeconds();
            timerHolder.innerText = ((seconds < 10) ? "0" : "") + seconds;
            // timerHolder.style.animation = "tick ease infinite normal 0.99s";
            if (seconds === 0) {
                self.stop();
                // timerHolder.style.animation = "none";
            }
        }, 990, self);
    };
    this.stop = function () {
        clearInterval(interval);
    };
    this.reset = function () {
        this.stop();
        timerHolder.innerText = "30";
        // timerHolder.style.animation = "none";
    };
}

let game = new Game();
let timer = new Timer();