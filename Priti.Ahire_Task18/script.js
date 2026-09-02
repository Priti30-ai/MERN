let heading = document.getElementById("heading");
let name = document.getElementById("name");
let button = document.getElementById("button");

let boxes = document.querySelectorAll(".box");

button.addEventListener("click", function () {

    if (name.value != "") {
        heading.innerText = "Hello, " + name.value;
    }

});

boxes.forEach(function (box) {

    box.addEventListener("click", function () {

        let color = box.getAttribute("data-color");

        box.style.backgroundColor = color;

    });

});
