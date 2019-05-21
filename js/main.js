document.querySelector(".links a[name='portfolio']").addEventListener("click", portfolioHolder);

function portfolioHolder(e) {
    e.preventDefault();
    let holder = document.querySelector(".works-holder");
    changeHeight(holder, 30, 500)
}

function changeHeight(element, to, duration) {
    if (duration <= 0) return;
    // console.log(element.offsetHeight, to);
    if (element.offsetHeight === to)
        to = 0;
    var difference = to - element.offsetHeight;
    var perTick = difference / duration * 10;
    // console.log(difference, perTick, duration);
    setTimeout(function () {
        element.style.height = element.offsetHeight + perTick + "px";
        if (element.offsetHeight === to) return;
        changeHeight(element, to, duration - 10);
    }, 10);
}

let passedTimeHolder = document.querySelector(".passed-time");
let passedTimeCounter = function (date) {
    date = new Date(date);
    // console.log(date);
    let dateNow = new Date();
    let difference = new Date(dateNow - date);
    let days = Math.floor((dateNow.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)),
        hours = difference.getHours(),
        minutes = difference.getMinutes(),
        seconds = difference.getSeconds();
    passedTimeHolder.innerText = days + " days " + ((hours < 10) ? "0" : "") + hours + ":" + ((minutes < 10) ? "0" : "") + minutes + ":" + ((seconds < 10) ? "0" : "") + seconds;
};
setInterval(passedTimeCounter, 1000, "2019-05-19 19:55 GMT+3");