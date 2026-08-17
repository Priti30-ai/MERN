function checkNumber() {

    let inputValue = document.getElementById("numberInput").value;
    let number = Number(inputValue);
    let remainder = number % 2;
    let message = "";

    if (number % 2 === 0) {
        message = number + " is an Even Number";
    } else {
        message = number + " is an Odd Number";
    }

    console.log(message);

    document.getElementById("result").textContent = message;
}