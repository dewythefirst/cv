let calendarsWrapper = document.querySelector(".calendars-wrapper");
let arrowLeft = document.querySelector(".arrows img[alt='left']");
let arrowRight = document.querySelector(".arrows img[alt='right']");
arrowLeft.addEventListener("click", slideCalendars);
arrowRight.addEventListener("click", slideCalendars);
let monthNameEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekDaysFullEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function initializeCalendars() {
    calendarsWrapper.innerHTML = "";
    for (var i = 0; i < 12; i++) {
        let weeksQ = 5;
        let calendarDiv = document.createElement("div");
        calendarDiv.classList.add("calendar");
        let monthName = document.createElement("div");
        monthName.classList.add("month-name");
        let dateMonth = new Date();
        let newMonth = dateMonth.getMonth() + i;
        // if (newMonth < 0) {
        //     newMonth += 12;
        //     dateMonth.setFullYear(dateMonth.getFullYear() - 1);
        // }
        dateMonth.setMonth(newMonth, 1);

        monthName.innerText = monthNameEn[dateMonth.getMonth()];
        calendarDiv.appendChild(monthName);
        let datesWrapper = document.createElement("div");
        datesWrapper.classList.add("dates-wrapper");
        for (var k = 0; k < 7; k++) {
            let weekDaysEn = ["M", "T", "W", "T", "F", "S", "S"];
            // let weekDaysEn = ["S", "M", "T", "W", "T", "F", "S"];
            let colDiv = document.createElement("div");
            colDiv.classList.add("col");
            let weekDay = document.createElement("span");
            weekDay.classList.add("week-day");
            weekDay.innerText = weekDaysEn[k];
            colDiv.appendChild(weekDay);
            for (var d = 0; d < weeksQ; d++) {
                let dateDiv = document.createElement("div");
                dateDiv.classList.add("date");
                let dayInMs = 86400000;
                let currentDate = new Date(dateMonth.getTime() + dayInMs * 7 * d);
                let currentDateDayNumber = currentDate.getDay();
                if (currentDateDayNumber === 0)
                    currentDateDayNumber = 7;
                let dayNumber = new Date(currentDate.getTime() - (currentDateDayNumber - k - 1) * dayInMs);
                let theRealDate = dayNumber;
                dayNumber = Number(dayNumber.getDate());
                if (d === 0 && dayNumber > 8) {
                    dateDiv.classList.add("extra"); // лишний (из другого месяца)
                }
                if ((d >= 4 && dayNumber < 14)) {
                    dateDiv.classList.add("extra"); // лишний (из другого месяца)
                }
                if (theRealDate.getDate() === new Date().getDate()) {
                    if (theRealDate.getMonth() === new Date().getMonth())
                        if (theRealDate.getFullYear() === new Date().getFullYear())
                            if (!dateDiv.classList.contains("extra"))
                                dateDiv.classList.add("today");
                }
                dateDiv.innerText = "" + dayNumber;
                theRealDate = `${theRealDate.getFullYear()}-${theRealDate.getMonth() + 1}-${theRealDate.getDate()}`;
                dateDiv.setAttribute("data-date", theRealDate);
                // dateDiv.addEventListener("click", clickOnDate);
                colDiv.appendChild(dateDiv);
                if (d === 4 && k === 0 && (dayNumber + 7 <= lastDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()))) { // если не хватает строк для окончания месяца- добавить
                    weeksQ++;
                }
            }
            datesWrapper.appendChild(colDiv);
        }
        calendarDiv.appendChild(datesWrapper);
        calendarsWrapper.appendChild(calendarDiv);
    }
    calendarsWrapper.innerHTML = calendarsWrapper.innerHTML + "<div style='min-width: 1px; height: 1px;'></div>";
    setEventListenerForDateDiv();
}

initializeCalendars();


function lastDayOfMonth(Year, Month) {
    return new Date((new Date(Year, Month, 1)) - 1);
}

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
    /*if (currentMonthNumber === 11) {
        scrollTo(calendarsWrapper, leftValues[currentMonthNumber] - 30);
    } else
        scrollTo(calendarsWrapper, leftValues[currentMonthNumber]);*/
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
    let divs = Array.from(document.querySelectorAll(".col .date"));
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", clickOnDate);
    }
}

let flagAddingTask = false;

function clickOnDate(e) {
    let element = e.target;
    if (!flagAddingTask) {
        if (!element.classList.contains("extra")) {
            element.classList.add("done");
            flagAddingTask = true;
            showTicks(true);
            showDialog(true);
        }
    }
    /*let circle = element.querySelector(".circle");
    let circleDiv = document.createElement("div");
    circleDiv.innerText = "1";
    circleDiv.classList.add("circle");
    if (circle) {
        element.replaceChild(circleDiv, circle);
    } else
        element.appendChild(circleDiv);*/
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
            // toggleTick(tickDiv);
            tickDiv.remove();
        }
    }
}

function toggleTick(e) {
    let element = e;
    if (!e.nodeType) {
        element = window.event.target;
    }
    console.log(element);
    let textWrapper = element.parentElement.querySelector(".task-text");
    if (element.classList.contains("gray")) {
        element.classList.remove("gray");
        textWrapper.classList.add("green");
        element.classList.add("green");
    } else {
        element.classList.remove("green");
        textWrapper.classList.remove("green");
        element.classList.add("gray");
    }
}

function showDialog(flag) {
    let event = window.event;
    let tasksWrapper = document.querySelector(".tasks-wrapper");
    let dialogWrapper = document.querySelector(".dialog-wrapper");
    if (!flag) {
        dialogWrapper.remove();
    } else {
        let dialogWrapperDiv = document.createElement("div");
        dialogWrapperDiv.classList.add("dialog-wrapper", "active");
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        let date = event.target.getAttribute('data-date');
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
        dialogWrapperDiv.appendChild(taskListDiv);
        let buttonsWrapperDiv = document.createElement("div");
        buttonsWrapperDiv.classList.add("buttons-wrapper");
        let acceptDiv = document.createElement("div");
        acceptDiv.classList.add("accept");
        acceptDiv.innerText = "Accept";
        let dismissDiv = document.createElement("div");
        dismissDiv.classList.add("dismiss");
        dismissDiv.innerText = "Dismiss";
        buttonsWrapperDiv.appendChild(acceptDiv);
        buttonsWrapperDiv.appendChild(dismissDiv);
        dialogWrapperDiv.appendChild(buttonsWrapperDiv);
        document.querySelector(".main-wrapper").insertBefore(dialogWrapperDiv, tasksWrapper);
        tasksWrapper.style.animation = "bloom ease 1s infinite alternate";
    }
}