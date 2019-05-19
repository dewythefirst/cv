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