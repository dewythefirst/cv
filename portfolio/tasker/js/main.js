let calendarsWrapper = document.querySelector(".calendars-wrapper");
let arrowLeft = document.querySelector(".arrows img[alt='left']");
let arrowRight = document.querySelector(".arrows img[alt='right']");
arrowLeft.addEventListener("click", slideCalendars);
arrowRight.addEventListener("click", slideCalendars);

function initializeCalendars() {
    calendarsWrapper.innerHTML = "";
    let monthNameEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
                let dayNumber = new Date(currentDate.getTime() - (currentDateDayNumber - k - 1) * dayInMs).getDate();
                dayNumber = Number(dayNumber);
                if (new Date().getDate() == dayNumber) {
                    if (currentDate.getMonth() == new Date().getMonth()) {
                        if (currentDate.getFullYear() == new Date().getFullYear()) {
                            dateDiv.classList.add("today");
                        }
                    }
                }
                if (d === 0 && dayNumber > 8) {
                    dateDiv.classList.add("extra"); // лишний (из другого месяца)
                }
                if ((d >= 4 && dayNumber < 14)) {
                    dateDiv.classList.add("extra"); // лишний (из другого месяца)
                }
                dateDiv.innerText = "" + dayNumber;
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
    if (taskInput.value !== "") {

    }
    taskInput.value = "";
}