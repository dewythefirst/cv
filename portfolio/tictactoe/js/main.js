let gameSpace = document.querySelector(".game-space");
gameSpace.addEventListener("click", gameSpaceClick);

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

function Players() {
    let playerTurn = null;
    this.changeTurn = function () {
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
    this.getPlayerTurn = function () {
        return playerTurn;
    };
}

function Game() {
    let isRunning = false;
    this.initialize = function () {
        let cover = document.querySelector(".cover");
        if (!isRunning) {
            cover.classList.remove("active");
            isRunning = !isRunning;
        } else {
            cover.classList.add("active");
            isRunning = !isRunning;
            throw "Game is already running";
        }
        players.changeTurn();
    };
    let moveCounter = 0;
    this.increaseCounter = function () {
        moveCounter++;
    };
    this.makeMove = function (e) {
        let element = e.target;
        if (element.classList.contains("open"))
            return;
        let playerTurn = players.getPlayerTurn();
        if (!playerTurn) {
            element.innerText = "o";
        } else {
            element.innerText = "x";
        }
        element.classList.add("open");
        game.increaseCounter();
        players.changeTurn();
    }
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
            // timerHolder.style.animationPlayState = "running";
            timerHolder.style.animation = "tick ease infinite normal 0.99s";
            if (seconds === 0) {
                self.stop();
                timerHolder.style.animation = "none";
            }
        }, 990, self);
    };
    this.stop = function () {
        clearInterval(interval);
    };
    this.reset = function () {
        this.stop();
        timerHolder.innerText = "30";
        timerHolder.style.animation = "none";
    };
}

let game = new Game();
let players = new Players();
let timer = new Timer();