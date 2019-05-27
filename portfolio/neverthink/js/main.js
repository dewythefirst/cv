let boxesHolder = document.querySelector(".boxes-holder");
let intervalColor, ready;

window.onresize = function () {
    windowResize();
};

function generateBoxes() {
    ready = false;
    boxesHolder.innerHTML = "";
    let boxesSize, boxesCount = 35;
    boxesSize = boxesHolder.offsetWidth / boxesCount;
    for (var k = 0; k < (boxesHolder.offsetHeight) / boxesSize - 1; k++) {
        for (var i = 0; i < boxesCount; i++) {
            boxesSize = boxesHolder.offsetWidth / boxesCount;
            let divEl = document.createElement("div");
            divEl.style.width = boxesSize + "px";
            divEl.style.height = boxesSize + "px";
            // setTimeout(function () {
            boxesHolder.appendChild(divEl);
            // });
        }
        // setTimeout(function () {
        //     let divEl = document.createElement("div");
        //     divEl.classList.add("new-line");
        //     boxesHolder.appendChild(divEl);
        // });
    }
    intervalColor = setInterval(colorBoxes, 200);
    ready = true;
}

generateBoxes();
let colors = ["#5f9bc3", "#5589ca", "#ff4842", "#ff9242", "#fff342", "#fa80c8", "#ff3150", "#a7ea31", "#95dcff", "#f4fdaf", "#fdf76a", "#ed2b2c", "#f27630", "#f9d84b", "#31a06b", "#2b55f7"];

function colorBoxes() {
    let boxes = Array.from(boxesHolder.querySelectorAll("div"));
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = colors[Math.round(Math.random() * (colors.length - 1))];
        // boxes[i].style.backgroundColor = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
    }
}

function windowResize() {
    console.log(ready);
    if (ready) {
        clearInterval(intervalColor);
        generateBoxes();
    } else {
        setTimeout(function () {
            windowResize();
        }, 500);
    }
}