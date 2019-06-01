let calendarsWrapper = document.querySelector(".calendars-wrapper");

function initializeCalendars() {
    calendarsWrapper.innerHTML = "";
    let monthNameEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"];
    for (var i = 0; i < 12; i++) {
        let weeksQ = 5;
        let calendarDiv = document.createElement("div");
        calendarDiv.classList.add("calendar");
        let monthName = document.createElement("div");
        monthName.classList.add("month-name");
        let dateMonth = new Date();
        let newMonth = dateMonth.getMonth() + i;
        if (newMonth < 0) {
            newMonth += 12;
            dateMonth.setFullYear(dateMonth.getFullYear() - 1);
        }
        dateMonth.setMonth(newMonth);

        monthName.innerText = monthNameEn[dateMonth.getMonth()];
        calendarDiv.appendChild(monthName);
        let datesWrapper = document.createElement("div");
        datesWrapper.classList.add("dates-wrapper");
        for (var k = 0; k < 7; k++) {
            let weekDaysEn = ["M", "T", "W", "T", "F", "S", "S"];
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
                let dayNumber = new Date(currentDate.getTime() - (currentDate.getDay() - k) * dayInMs).getDate();
                dayNumber = Number(dayNumber);
                if (d === 0 && dayNumber > 7) {
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