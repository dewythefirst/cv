document.querySelector(".links a[name='portfolio']").addEventListener("click", portfolioHolder);

function portfolioHolder(e) {
    e.preventDefault();
    let holder = document.querySelector(".works-holder");
    let maxHeight = 300;
    let currentHeight = holder.offsetHeight;
    let step = 1;
    let interval = 1000;
    slideElement(holder, 300, 500)
}

function slideElement(element, height, time) {
    console.log("here");
    if (!element)
        return;
    if (time == null) {
        time = 1000;
    }
    if (height < 0) {
        height = 0;
    }
    let currentHeight = element.offsetHeight;
    let step = Math.floor((currentHeight - height) / time);
    console.log(step);
    if (height > currentHeight)
        step *= -1;
    console.log(currentHeight, height);
    if (currentHeight !== height)
        setTimeout(function (element, height, time, step) {
            let currentHeight = element.offsetHeight;
            element.style.height = currentHeight + step + "px";
            slideElement(element, height, time);
        }, 1, element, height, time, step);
}

/*
function portfolioHolder(e) {
    e.preventDefault();
    let holder = document.querySelector(".works-holder .works");
    if (holder.classList.contains("active")) {
        holder.classList.remove("active");
        setTimeout(function (element) {
            element.style.display = "none";
        }, 100, holder)
    } else {
        holder.style.display = "block";
        setTimeout(function (element) {
            element.classList.add("active");
        }, 100, holder);
    }
}
*/
