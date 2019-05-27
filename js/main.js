let hideElements = Array.from(document.querySelectorAll("[data-hide]"));

let defaultHeights = {};

function initializeHide() {
    console.log(hideElements);
    for (var i = 0; i < hideElements.length; i++) {
        defaultHeights[i] = {};
        defaultHeights[i]['element'] = hideElements[i];
        let attr = hideElements[i].getAttribute("data-hide");
        let element = document.querySelector("[data-name='" + attr + "']");
        if (element) {
            defaultHeights[i]['toggleElement'] = element;
            defaultHeights[i]['height'] = element.offsetHeight;
            element.style.height = "0px";
            element.style.visibility = "visible";
            hideElements[i].removeAttribute("data-hide");
            hideElements[i].addEventListener("click", toggleSlide);
        } else throw "Unknown error";
    }
    // console.log(defaultHeights);
}

window.onload = function () {
    initializeHide();
};

let ready = true;

function toggleSlide(event, to, duration = 500) {
    let clickedElement = event.target, elementToChange; // на что нажал
    for (var key in defaultHeights) { // проходит по всем элементам в объекте
        if (defaultHeights[key]['element'] == clickedElement) { // если в ключе этот элемент
            if (to == null) // если не указано
                to = defaultHeights[key]['height']; // ставит дефолтную высоту
            elementToChange = defaultHeights[key]['toggleElement']; // элемент который нужно менять
        }
    }
    if (elementToChange.offsetHeight === to)
        to = 0; // если высота такая же - скрыть
    var difference = to - elementToChange.offsetHeight;
    var perTick = difference / duration * 10;
    setTimeout(function () {
        elementToChange.style.height = elementToChange.offsetHeight + perTick + "px";
        if (elementToChange.offsetHeight === to) {
            return;
        }
        toggleSlide(event, to, duration - 10);
    }, 10);
}

let passedTimeHolder = document.querySelector(".passed-time");
let passedTimeCounter = function (date) {
    date = new Date(date);
    let dateNow = new Date();
    let difference = dateNow.getTime() - date.getTime();
    difference = new Date(difference);
    let days = Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours = Math.round((difference / (1000 * 60 * 60)) % 24),
        minutes = difference.getMinutes(),
        seconds = difference.getSeconds();
    passedTimeHolder.innerText = days + " days " + ((hours < 10) ? "0" : "") + hours + ":" + ((minutes < 10) ? "0" : "") + minutes + ":" + ((seconds < 10) ? "0" : "") + seconds;
    passedTimeHolder.style.animationPlayState = "running";
};
setInterval(passedTimeCounter, 1000, "2019/05/19 19:55 GMT+0300");
