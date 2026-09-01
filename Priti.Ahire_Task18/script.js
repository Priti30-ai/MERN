// Get the required elements from HTML

const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const greetButton = document.getElementById("greetButton");


// Get all color boxes

const colorBoxes = document.querySelectorAll(".color-box");


// Change greeting when button is clicked

greetButton.addEventListener("click", function () {

    const name = nameInput.value;

    if (name.trim() !== "") {
        greeting.textContent = "Hello, " + name;
    } else {
        greeting.textContent = "Hello";
    }

});


// Change box background color when a box is clicked

colorBoxes.forEach(function (box) {

    box.addEventListener("click", function () {

        // Get the color stored in the data-color attribute
        const color = box.dataset.color;

        // Change the background color using DOM
        box.style.backgroundColor = color;

    });

});