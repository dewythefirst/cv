let monthNameEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekDaysFullEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let weekDays3En = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let bigCalendarWrapper = document.querySelector(".big-calendar");

function Calendar(weeksToShow = 2) {
    let colorsArray = ["#FE2712", "#FC600A", "#FB9902", "#FCCC1A", "#FEFE33", "#B2D732", "#66B032", "#347C98", "#0247FE", "#4424D6", "#8601AF", "#C21460"];
    this.getTheWeekStart = function (date) {
        let dayOfTheWeek = date.getDay() === 0 ? 6 : (date.getDay() - 1);
        let dayInMs = 24 * 60 * 60 * 1000;
        return new Date(date - dayOfTheWeek * dayInMs);
    };
    let date = new Date();
    date = this.getTheWeekStart(date);
    let tasksCount = Math.max(1, 10);
    let dayInMs = 24 * 60 * 60 * 1000;
    let clearCalendarWrapper = function () {
        bigCalendarWrapper.innerHTML = "";
    };
    let initializeHeader = function () {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "main");
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell", "main");
        cellDiv.innerText = "Task List";
        rowDiv.appendChild(cellDiv);
        for (let i = 0; i < weeksToShow * 7; i++) { // cells loop
            cellDiv = document.createElement("div");
            if (date.getDate() === new Date().getDate())
                if (date.getMonth() === new Date().getMonth())
                    if (date.getFullYear() === new Date().getFullYear())
                        cellDiv.classList.add("today");
            cellDiv.classList.add("cell", "date");
            let spanDate = document.createElement("span");
            let spanDay = document.createElement("span");
            spanDate.classList.add("date");
            spanDay.classList.add("day");
            spanDate.innerText = date.getDate();
            let weekDay = (date.getDay() === 0) ? 6 : date.getDay() - 1;
            spanDay.innerText = weekDays3En[weekDay];
            cellDiv.appendChild(spanDate);
            cellDiv.appendChild(spanDay);
            rowDiv.appendChild(cellDiv);
            date = new Date(date.getTime() + dayInMs);
            bigCalendarWrapper.appendChild(rowDiv);
        }
    };
    let findToday = function () {
        let findToday = document.querySelector(".row.main");
        findToday = Array.from(findToday.querySelectorAll(".cell.date"));
        for (var i = 0; i < findToday.length; i++) {
            if (findToday[i].classList.contains("today"))
                return i;
        }
    };
    let addTask = function (i) { // сюда передавать ID например, где будет храниться подробная инфа
        let taskRow = document.createElement("div");
        taskRow.classList.add("row");
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("cell", "main");
        let settingsDiv = document.createElement("div");
        settingsDiv.classList.add("settings");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.addEventListener("click", showColors);
        let color = Math.floor(Math.random() * colorsArray.length);
        color = hexToRgb(colorsArray[color], "string");
        colorDiv.setAttribute("data-color", color);
        colorDiv.style.backgroundColor = color;
        settingsDiv.appendChild(colorDiv);
        taskDiv.appendChild(settingsDiv);
        let spanTask = document.createElement("span");
        spanTask.innerText = "Task " + i;
        taskDiv.appendChild(spanTask);
        taskRow.appendChild(taskDiv);
        let today = findToday();
        for (let i = 0; i < weeksToShow * 7; i++) {
            taskDiv = document.createElement("div");
            taskDiv.classList.add("cell", "date");
            if (i === today)
                taskDiv.classList.add("today");
            taskDiv.addEventListener("click", taskClick);
            taskRow.appendChild(taskDiv);
        }
        bigCalendarWrapper.appendChild(taskRow);
    };
    let showInput = function (flag) {
        let e = window.event;
        if (!flag) {
            e.target.closest(".foot").classList.remove("active");
            setTimeout(function () {
                e.target.closest(".foot").querySelector("span").style.display = "block";
            }, 600);
        } else {
            e.target.closest(".foot").classList.add("active");
            e.target.closest(".foot").querySelector("span").style.display = "none";
        }
    };
    let addFooter = function () {
        let footerDiv = document.createElement("div");
        footerDiv.classList.add("row", "foot");
        let spanDiv = document.createElement("span");
        spanDiv.innerText = "Add a new task";
        spanDiv.addEventListener("click", showInput);
        footerDiv.appendChild(spanDiv);
        let inputDiv = document.createElement("div");
        inputDiv.classList.add("wrapper");
        let input = document.createElement("input");
        input.type = "text";
        inputDiv.appendChild(input);
        let button = document.createElement("div");
        button.classList.add("btn", "add");
        button.innerText = "Add";
        inputDiv.appendChild(button);
        button = document.createElement("div");
        button.classList.add("btn", "cancel");
        button.innerText = "X";
        button.addEventListener("click", function () {
            showInput(false);
        });
        inputDiv.appendChild(button);
        footerDiv.appendChild(inputDiv);
        bigCalendarWrapper.appendChild(footerDiv);
    };
    this.init = function () {
        clearCalendarWrapper();
        initializeHeader();
        for (let i = 0; i < 10; i++)
            addTask(i);
        addFooter();
    };
    let copy;
    let setColor = function (e) {
        let colorPicker = e.target.closest(".color-picker");
        let cell = e.target.closest(".cell");
        let color = e.target.style.backgroundColor;
        copy.querySelector(".color").setAttribute("data-color", color);
        copy.querySelector(".color").style.backgroundColor = color;
        colorPicker.remove();
        copy.querySelector(".color").addEventListener("click", showColors);
        cell.replaceWith(copy);
        renewColors(copy, color);
    };
    let showColors = function (e) {
        let element = e.target;
        if (!element) {
            element = e;
        }
        if (document.querySelector(".color-picker"))
            throw new Error("Color picker is already opened");
        let cell = element.closest(".cell");
        copy = cell.cloneNode(true);
        let colorPicker = document.createElement("div");
        colorPicker.classList.add("color-picker");
        for (let c = 0; c < colorsArray.length; c++) {
            let littleColor = document.createElement("div");
            littleColor.classList.add("little-color");
            littleColor.style.backgroundColor = colorsArray[c];
            littleColor.addEventListener("click", setColor);
            colorPicker.appendChild(littleColor);
        }
        cell.appendChild(colorPicker);
    };
}

let calendar = new Calendar();
calendar.init();

function taskClick(e) {
    let element = e.target;
    if (element.classList.contains("done")) {
        element.classList.remove("done");
        element.removeAttribute("style");
    } else
        element.classList.add("done");
    let elementParentRow = element.closest(".row");
    let elementRowColor = elementParentRow.querySelector(".main .color").getAttribute("data-color");
    let color = elementRowColor.match(/\d+/g);
    let allDays = Array.from(elementParentRow.querySelectorAll(".cell.date"));
    let streakArray = [];
    let counter = 0;
    for (let i = 0; i < allDays.length; i++)
        if (allDays[i].classList.contains("done")) {
            if (allDays[i - 1] && allDays[i - 1].classList.contains("done")) {
                if (!checkIfPresent(streakArray, allDays[i - 1]))
                    streakArray[counter++] = allDays[i - 1];
                streakArray[counter++] = allDays[i];
            } else {
                allDays[i].style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.20)`;
            }
        } else {
            if (streakArray.length !== 0) {
                redrawColors(streakArray, color);
                streakArray = [];
                counter = 0;
            }
        }
    if (allDays[allDays.length - 1].classList.contains("done")) {
        if (streakArray.length !== 0) {
            redrawColors(streakArray, color);
        }
    }
}

function redrawColors(array, color) {
    let opacityValue = 100 / array.length;
    opacityValue = opacityValue / 100;
    for (let i = 0; i < array.length; i++) {
        array[i].style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.max(0.20, opacityValue * (i + 1))})`;
    }
}

function renewColors(el, color) {
    el = el.closest(".row");
    color = color.match(/\d+/g);
    console.log(color);
    let array = Array.from(el.querySelectorAll(".done"));
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        let colorN = array[i].style.backgroundColor;
        colorN = colorN.replace(/\(\d+, \d+, \d+/g, `(${color[0]}, ${color[1]}, ${color[2]}`);
        array[i].style.backgroundColor = colorN;
    }
}

function checkIfPresent(array, element) {
    for (let i = 0; array.length; i++) {
        if (array[i] === element)
            return true;
        else continue;
    }
    return false;
}

function lastDayOfMonth(Year, Month) {
    return new Date((new Date(Year, Month, 1)) - 1);
}

function hexToRgb(hex, how) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (how === "string") {
        return "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
    } else
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
}

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');
/*

let currentMonthNumber = 0;

function slideCalendars(side) {
    let leftValues = [];
    let calendars = Array.from(document.querySelectorAll(".calendar"));
    for (var i = 0; i < calendars.length; i++) {
        leftValues[i] = calendars[i].offsetLeft - 20;
    }
    if (side.target === arrowLeft) {
        if (currentMonthNumber !== 0)
            currentMonthNumber--;
    } else {
        if (currentMonthNumber !== 11)
            currentMonthNumber++;
    }
    calendarsWrapper.scrollLeft = leftValues[currentMonthNumber];
    /!*if (currentMonthNumber === 11) {
        scrollTo(calendarsWrapper, leftValues[currentMonthNumber] - 30);
    } else
        scrollTo(calendarsWrapper, leftValues[currentMonthNumber]);*!/
}

function scrollTo(elementToChange, to, duration = 100) {
    var difference = to - elementToChange.scrollLeft;
    var perTick = difference / duration * 10;
    setTimeout(function () {
        elementToChange.scrollLeft = elementToChange.scrollLeft + perTick;
        if (elementToChange.scrollLeft === to) {
            return;
        }
        scrollTo(elementToChange, to, duration - 10);
    }, 10);
}

let addBtn = document.querySelector(".add-task .btn");
addBtn.addEventListener("click", addTask);

function addTask() {
    let taskInput = document.querySelector(".add-task input");
    let underTitle = document.querySelector(".under-title");
    if (taskInput.value !== "") {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        let taskDateSpan = document.createElement("span");
        taskDateSpan.classList.add("task-date");
        taskDateSpan.innerText = `${(new Date().getDate() < 10 ? "0" : "") + new Date().getDate()}.${(new Date().getMonth() < 10 ? "0" : "") + new Date().getMonth()}.${new Date().getFullYear()} @ ${(new Date().getHours() < 10 ? "0" : "") + new Date().getHours()}:${(new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes()}`;
        taskDiv.appendChild(taskDateSpan);
        let taskWrapperDiv = document.createElement("div");
        taskWrapperDiv.classList.add("task-wrapper");
        let taskTextDiv = document.createElement("div");
        taskTextDiv.classList.add("task-text");
        taskTextDiv.innerText = taskInput.value;
        taskWrapperDiv.appendChild(taskTextDiv);
        let taskSettingsDiv = document.createElement("div");
        taskSettingsDiv.classList.add("task-settings");
        let deleteButton = document.createElement("div");
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", deleteTask);
        taskSettingsDiv.appendChild(deleteButton);
        taskWrapperDiv.appendChild(taskSettingsDiv);
        taskDiv.appendChild(taskWrapperDiv);
        underTitle.appendChild(taskDiv);
    }
    taskInput.value = "";
}


let deleteButton = document.querySelector(".task-settings .delete");
deleteButton.addEventListener("click", deleteTask);

// добавить парсинг всех заданий и вешание листнера на них

function deleteTask(e) {
    let element = e.target;
    let underTitleDiv = document.querySelector(".under-title");
    // while (!element.classList.contains("task")) {
    //     element = element.parentElement;
    // }
    underTitleDiv.removeChild(element.closest(".task"));
}

function setEventListenerForDateDiv() {
    let divs = Array.from(document.querySelectorAll(".cell .date"));
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", clickOnDate);
    }
}

let flagAddingTask = false;

let lastClickedDate;

function clickOnDate(e) {
    let element = e.target;
    if (!flagAddingTask)
        lastClickedDate = element;
    if (!flagAddingTask) {
        if (!element.classList.contains("extra")) {
            element.classList.add("done");
            flagAddingTask = true;
            showTicks(true);
            showDialog(true);
        }
    }
    /!*let circle = element.querySelector(".circle");
    let circleDiv = document.createElement("div");
    circleDiv.innerText = "1";
    circleDiv.classList.add("circle");
    if (circle) {
        element.replaceChild(circleDiv, circle);
    } else
        element.appendChild(circleDiv);*!/
}

function showTicks(flag) {
    let tasks = Array.from(document.querySelectorAll(".task-wrapper"));
    for (var i = 0; i < tasks.length; i++) {
        if (flag) {
            let tickDiv = document.createElement("div");
            tickDiv.classList.add("tick", "gray");
            tickDiv.addEventListener("click", toggleTick);
            if (!tasks[i].querySelector(".tick"))
                tasks[i].insertBefore(tickDiv, tasks[i].firstChild);
        } else if (!flag) {
            let tickDiv = tasks[i].querySelector(".tick");
            let textWrapper = tickDiv.parentElement.querySelector(".task-text");
            if (textWrapper.classList.contains("green"))
                textWrapper.classList.remove("green");
            tickDiv.remove();
        }
    }
}

function toggleTick(e) {
    let element = e;
    if (!e.nodeType) {
        element = window.event.target;
    }
    let textWrapper = element.parentElement.querySelector(".task-text");
    if (element.classList.contains("gray")) {
        element.classList.remove("gray");
        textWrapper.classList.add("green");
        element.classList.add("green");
        addTaskToDone(true, textWrapper);
    } else {
        element.classList.remove("green");
        textWrapper.classList.remove("green");
        element.classList.add("gray");
        addTaskToDone(false, textWrapper);
    }
}

function showDialog(flag) {
    let event = window.event;
    let tasksWrapper = document.querySelector(".tasks-wrapper");
    let dialogWrapper = document.querySelector(".dialog-wrapper");
    let historyWrapper = document.querySelector(".history-wrapper");
    if (!flag) {
        dialogWrapper.remove();
        tasksWrapper.classList.remove("animation");
    } else {
        let dialogWrapperDiv = document.createElement("div");
        dialogWrapperDiv.classList.add("dialog-wrapper", "active");
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        let date = event.target.getAttribute('data-date');
        date = date.replace(/-/g, '/');
        // console.log(date);
        date = new Date(date);
        let weekDay;
        if (date.getDay() == 0) {
            weekDay = 6;
        } else {
            weekDay = date.getDay() - 1;
        }
        dateDiv.innerText = `${weekDaysFullEn[weekDay]} ${date.getDate()} ${monthNameEn[date.getMonth()]} ${date.getFullYear()}`;
        dialogWrapperDiv.appendChild(dateDiv);
        let taskListDiv = document.createElement("div");
        taskListDiv.classList.add("task-list");
        let helperDiv = document.createElement("div");
        helperDiv.classList.add("helper");
        helperDiv.innerText = "Choose the tasks from below :)";
        taskListDiv.appendChild(helperDiv);
        dialogWrapperDiv.appendChild(taskListDiv);
        let buttonsWrapperDiv = document.createElement("div");
        buttonsWrapperDiv.classList.add("buttons-wrapper");
        let acceptDiv = document.createElement("div");
        acceptDiv.classList.add("accept");
        acceptDiv.innerText = "Accept";
        let dismissDiv = document.createElement("div");
        dismissDiv.classList.add("dismiss");
        dismissDiv.innerText = "Dismiss";
        dismissDiv.addEventListener("click", cancelAddingTasks);
        buttonsWrapperDiv.appendChild(acceptDiv);
        buttonsWrapperDiv.appendChild(dismissDiv);
        dialogWrapperDiv.appendChild(buttonsWrapperDiv);
        document.querySelector(".main-wrapper").insertBefore(dialogWrapperDiv, tasksWrapper);
        tasksWrapper.classList.add("animation");
        document.querySelector(".add-task").classList.add("inactive");
    }
}

function cancelAddingTasks() {
    showDialog(false);
    showTicks(false);
    lastClickedDate.classList.remove("done");
    flagAddingTask = false;
    document.querySelector(".add-task").classList.remove("inactive");
}

function addTaskToDone(flag, element) {
    let dialogTasks = document.querySelector(".dialog-wrapper .task-list");
    if (flag) {
        let taskTextDiv = document.createElement("div");
        taskTextDiv.classList.add("task-text");
        let tickDiv = document.createElement("div");
        tickDiv.classList.add("tick");
        taskTextDiv.appendChild(tickDiv);
        let textSpan = document.createElement("span");
        textSpan.innerText = element.innerText;
        taskTextDiv.appendChild(textSpan);
        dialogTasks.appendChild(taskTextDiv);
        document.querySelector(".helper").remove();
    }
}*/
