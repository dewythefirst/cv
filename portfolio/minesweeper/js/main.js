var wrapper = document.getElementById("wrapper");

wrapper.addEventListener("click", leftClick);
wrapper.addEventListener("contextmenu", rightClick);
let globalCols, globalRows;

function leftClick(e) {
    // var element = e.target.parentElement.nextElementSibling;
    // console.log(element);
    if (e.target.id === "generateButton") {
        globalCols = document.getElementById("cols");
        globalRows = document.getElementById("rows");
        if ((globalCols.value === "") || (globalRows.value === "") ||
            (globalRows.value < 8 || globalRows.value > 25) || (globalCols.value < 8 || globalCols.value > 25) ||
            !Number.isInteger(parseInt(globalRows.value)) || !Number.isInteger(parseInt(globalCols.value))) {
            alert("Введите значения в поля. Минимум - 8х8. Максимум 25х25.");
            globalCols.value = 8;
            globalRows.value = 8;
            return;
        } else {
            generateField(parseInt(globalRows.value), parseInt(globalCols.value));
        }
    } else if (e.target.tagName === "TD") {
        openCell(e.target);
    }
}

function rightClick(e) {
    let element = e.target;
    if (element.tagName === "TD") {
        e.preventDefault();
        if (element.classList.contains("open"))
            return;
        if (element.classList.contains("flag")) {
            element.classList.remove("flag");
            element.classList.add("question");
            bombs.deduct();
            return;
        }
        if (element.classList.contains("question")) {
            element.classList.remove("question");
        } else {
            element.classList.add("flag");
            bombs.add();
        }
    }
}

let firstMoveFlag;

function generateField(rows, cols) {
    firstMoveFlag = true;
    score.reset();
    timer.stop();
    timer.reset();
    openCells = 0;
    var tableHolder = document.getElementById("tableHolder");
    tableHolder.innerHTML = ""; // очистка для генерации новой таблицы
    var table = document.createElement("table");
    var tr, td;
    for (var i = 0; i < rows; i++) {
        tr = document.createElement("tr");
        table.appendChild(tr); // генерация строк
        for (var j = 0; j < cols; j++) {
            td = document.createElement("td");
            tr.appendChild(td); // генерация столбцов
        }
    }
    tableHolder.appendChild(table);
    generateBombs(rows, cols);
    // cols.value = "";
    // rows.value = "";
}

let bombsArray = [];

let bombsNumber;

function generateBombs(rows, cols) {
    bombsNumber = Math.floor((rows * cols) * 0.15);
    let isMatch = false;
    for (var i = 0; i < bombsNumber; i++) {
        let rowIndex = Math.round(Math.random() * (rows - 1));
        let cellIndex = Math.round(Math.random() * (cols - 1));
        for (var j = 0; j < bombsArray.length; j++) {
            if (bombsArray[j] == `${cellIndex}; ${rowIndex}`)
                isMatch = true;
        }
        if (!isMatch)
            bombsArray[i] = `${cellIndex}; ${rowIndex}`;
        else {
            i--;
            isMatch = false;
        }
    }
    bombs.create();
    // console.log(bombsArray);
}

let openCells;

function openCell(element) {
    if (firstMoveFlag) {
        firstMoveFlag = !firstMoveFlag;
        timer.start();
        openCells = 0;
    }
    let table = document.querySelector("#tableHolder table");
    if (element.classList.contains("flag") || element.classList.contains("question"))
        return;
    if (isBomb(element)) {
        element.classList.add("bomb", "active");
        table.innerHTML += '<div class="game-over"><span>GAME OVER!</span></div>';
        timer.stop();
        showBombs(bombsArray);
    } else {
        if (!element.classList.contains("open")) {
            openCells++;
            score.add();
            element.classList.add("open");
            checkBombsAround(element);
        }
    }
    if (openCells == ((globalCols.value * globalRows.value) - bombsNumber)) {
        table.innerHTML += '<div class="win"><span>YOU WIN!</span><img src="../images/win.png" style="object-fit: contain" width="100" height="100"></div>';
        timer.stop();
        showBombs(bombsArray, true);
    }
}

function isBomb(element) {
    let x = element.cellIndex;
    let y = element.parentElement.rowIndex;
    for (var i = 0; i < bombsArray.length; i++) {
        let coords = bombsArray[i].split("; ");
        // console.log(coords, x, y);
        if (x == coords[0] && y == coords[1]) {
            return true;
            break;
        }
    }
    return false;
}

function showBombs(bombsArray, wasted) {
    let table = document.querySelector("#tableHolder table");
    for (var i = 0; i < bombsArray.length; i++) {
        let coords = bombsArray[i].split("; ");
        let rows = Array.from(table.querySelectorAll("tr"));
        let cols = Array.from(rows[coords[1]].querySelectorAll("td"));
        cols[coords[0]].classList.add("bomb");
        if (wasted || cols[coords[0]].classList.contains("flag")) {
            cols[coords[0]].classList.add("wasted");
        }
    }
}

function checkBombsAround(element) {
    let bombsCount = 0;
    let coords = [];
    let table = document.querySelector("#tableHolder table");
    let rows = Array.from(table.querySelectorAll("tr"));
    let cols = Array.from(rows[0].querySelectorAll("td"));
    coords[0] = element.cellIndex; // x
    coords[1] = element.parentElement.rowIndex; // y
    let xToCheck = [], yToCheck = [];
    let i, flag = 0;
    var emptyCellsArray = [];
    for (i = 0; i < 3; i++) {
        let indexY = coords[1] - 1 + i;
        if (indexY >= 0 && indexY < rows.length)
            yToCheck[i - flag] = Array.from(rows[indexY].querySelectorAll("td"));
        else flag++;
    }
    flag = 0;
    for (i = 0; i < 3; i++) {
        let indexX = coords[0] - 1 + i;
        if (indexX >= 0 && indexX < cols.length)
            xToCheck[i - flag] = indexX;
        else flag++;
    }
    let counter = 0;
    for (i = 0; i < yToCheck.length; i++) {
        let row = yToCheck[i];
        for (var j = 0; j < xToCheck.length; j++) {
            let cell = row[xToCheck[j]];
            if (!cell.classList.contains("open"))
                if (isBomb(cell))
                    bombsCount++;
                else {
                    emptyCellsArray[counter++] = cell;
                }
        }
    }

    if (bombsCount == 1) {
        element.classList.add("number", "one");
    }
    if (bombsCount == 2) {
        element.classList.add("number", "two");
    }
    if (bombsCount == 3) {
        element.classList.add("number", "three");
    } else if (bombsCount > 3) {
        element.classList.add("number", "more");
    }
    if (bombsCount == 0) {
        for (i = 0; i < emptyCellsArray.length; i++) {
            if (emptyCellsArray[i].classList.contains("flag")) {
                emptyCellsArray[i].classList.remove("flag");
                bombs.deduct();
            }
            if (emptyCellsArray[i].classList.contains("question"))
                emptyCellsArray[i].classList.remove("question");

            setTimeout(openCell(emptyCellsArray[i]), 1);
        }
    } else {
        element.innerHTML = `<span>${bombsCount}</span>`;
    }
}

function Timer() {
    let timerSpan = document.querySelector(".statistics .time");
    let interval;
    this.start = function () {
        let startTime = new Date().getTime();
        let timeNow, timePassed;
        interval = setInterval(function () {
            timeNow = new Date().getTime();
            timePassed = timeNow - startTime;
            let minutes = new Date(timePassed).getMinutes();
            let seconds = new Date(timePassed).getSeconds();
            timerSpan.innerText = ((minutes < 10) ? "0" : "") + minutes + ":" + ((seconds < 10) ? "0" : "") + seconds;
        });
    };
    this.stop = function () {
        clearInterval(interval);
    };
    this.reset = function () {
        timerSpan.innerText = "00:00";
    };
}

let timer = new Timer();

function Score() {
    let score = document.querySelector(".score span");
    this.add = function () {
        score.innerText = parseInt(score.innerText) + 5;
    };
    this.reset = function () {
        score.innerText = 0;
    }
}

let score = new Score();

function BombsScore() {
    let score = document.querySelector(".bombs-count > span");
    let totalBombs = document.querySelector(".bombs-count > span + span");
    this.create = function () {
        totalBombs.innerText = bombsNumber;
        score.innerText = 0;
    };
    this.add = function () {
        score.innerText = parseInt(score.innerText) + 1;
    };
    this.deduct = function () {
        score.innerText = parseInt(score.innerText) - 1;
    }
}

let bombs = new BombsScore();