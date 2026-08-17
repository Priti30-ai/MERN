// Function to calculate the sum of first n natural numbers
function sumOfFirstN(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum = sum + i;
    }

    return sum;
}


// Function to print multiplication table
function multiplicationTable(number) {
    console.log("Table of " + number + ":");

    for (let i = 1; i <= 10; i++) {
        console.log(number + " x " + i + " = " + (number * i));
    }
}


// Function to check whether a number is prime
function checkPrime(number) {
    if (number < 2) {
        return false;
    }

    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}


// Function to find all factors
function findFactors(number) {
    let factors = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    return factors;
}


// Function to find sum of digits
function sumOfDigits(number) {
    let sum = 0;

    while (number > 0) {
        let digit = number % 10;
        sum = sum + digit;
        number = Math.floor(number / 10);
    }

    return sum;
}


// Function to check Armstrong number
function checkArmstrong(number) {
    let originalNumber = number;
    let temp = number;
    let digitCount = 0;
    let sum = 0;

    // Count number of digits
    while (temp > 0) {
        digitCount++;
        temp = Math.floor(temp / 10);
    }

    temp = number;

    // Calculate Armstrong sum
    while (temp > 0) {
        let digit = temp % 10;
        sum = sum + Math.pow(digit, digitCount);
        temp = Math.floor(temp / 10);
    }

    return sum === originalNumber;
}


// Function to reverse a number
function reverseNumber(number) {
    let reverse = 0;

    while (number > 0) {
        let digit = number % 10;
        reverse = reverse * 10 + digit;
        number = Math.floor(number / 10);
    }

    return reverse;
}


// Main function
function runProgram() {

    // Sum of first n numbers
    let n = 10;

    console.log("========== SUM OF FIRST N NUMBERS ==========");
    console.log("n =", n);
    console.log("Sum of first " + n + " numbers =", sumOfFirstN(n));


    // Five different numbers
    let number1 = 153;
    let number2 = 17;
    let number3 = 51;
    let number4 = 123;
    let number5 = 200;

    let numbers = [number1, number2, number3, number4, number5];


    console.log(" ");
    console.log("========== NUMBER OPERATIONS ==========");


    // Perform operations on all five numbers
    for (let i = 0; i < numbers.length; i++) {

        let number = numbers[i];

        console.log(" ");
        console.log("=================================");
        console.log("Number:", number);
        console.log("=================================");


        // Check Prime
        if (checkPrime(number)) {
            console.log("Prime Number: Yes");
        } else {
            console.log("Prime Number: No");
        }


        // Print factors
        console.log("Factors:", findFactors(number));


        // Sum of digits
        console.log("Sum of digits:", sumOfDigits(number));


        // Armstrong check
        if (checkArmstrong(number)) {
            console.log("Armstrong Number: Yes");
        } else {
            console.log("Armstrong Number: No");
        }


        // Reverse number
        console.log("Reverse:", reverseNumber(number));


        // Multiplication table
        multiplicationTable(number);
    }
}