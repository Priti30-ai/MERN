// Input values
let P = 100000;
let r = 10;
let n = 1;
let t = 3;

// Convert rate to decimal
r = r / 100;

// Calculate amount
let A = P * Math.pow((1 + r / n), n * t);

// Calculate compound interest
let compoundInterest = A - P;
let result = compoundInterest.toFixed(2);

// Show result in console
console.log("Compound Interest after " + t + " years is ₹" + result);

// Show result on webpage
document.getElementById("result").innerHTML =
    "Compound Interest = ₹" + result;