document.addEventListener("DOMContentLoaded", ready);

function ready() {
    let worksWrapper = document.querySelector(".works-wrapper");
    let aArrays = Array.from(worksWrapper.querySelectorAll("a"));
    for (var i = 0; i < aArrays.length; i++) {
        aArrays[i].addEventListener("mouseenter", linkOver);
        aArrays[i].addEventListener("mouseout", linkOut);
        let random = Math.floor(Math.random() * (35 - 7)) + 7;
        aArrays[i].style.fontSize = random + "px";
    }
    document.removeEventListener("DOMContentLoaded", ready);
}

function linkOver(e) {
    let element = e.target;
    element.style.fontSize = "30px";
    element.style.color = "cornflowerblue";
}

function linkOut(e) {
    let element = e.target;
    let random = Math.floor(Math.random() * (35 - 15)) + 15;
    element.style.fontSize = random + "px";
    element.style.color = "red";
    setTimeout(function (e) {
        // if (!e.parentElement.querySelector(":hover")) {
            e.style.color = "white";
        // } else {
        //     console.log()
        // }
    }, 200, element);
}