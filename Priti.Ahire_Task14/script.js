// Sum of first n natural numbers
function findSum(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

// Multiplication table
function table(n) {
    console.log("Table of " + n);

    for (let i = 1; i <= 10; i++) {
        console.log(n + " * " + i + " = " + n * i);
    }
}

// Check whether number is prime
function checkPrime(n) {
    if (n < 2) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

// Find factors of a number
function findFactors(n) {
    let factors = [];

    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            factors.push(i);
        }
    }

    return factors;
}

// Find sum of digits
function sumOfDigits(n) {
    let sum = 0;

    while (n > 0) {
        let digit = n % 10;
        sum = sum + digit;
        n = Math.floor(n / 10);
    }

    return sum;
}

// Check Armstrong number
function checkArmstrong(n) {
    let original = n;
    let sum = 0;

    while (n > 0) {
        let digit = n % 10;
        sum = sum + digit * digit * digit;
        n = Math.floor(n / 10);
    }

    if (sum == original) {
        return true;
    } else {
        return false;
    }
}

// Reverse a number
function reverseNumber(n) {
    let reverse = 0;

    while (n > 0) {
        let digit = n % 10;
        reverse = reverse * 10 + digit;
        n = Math.floor(n / 10);
    }

    return reverse;
}

// Run the program
function runProgram() {

    let n = 10;

    console.log("Sum of first " + n + " natural numbers:");
    console.log(findSum(n));

    let numbers = [153, 17, 51, 123, 200];

    for (let i = 0; i < numbers.length; i++) {

        let num = numbers[i];

        console.log("--------------------");
        console.log("Number: " + num);

        if (checkPrime(num)) {
            console.log("Prime: Yes");
        } else {
            console.log("Prime: No");
        }

        console.log("Factors: " + findFactors(num));

        console.log("Sum of digits: " + sumOfDigits(num));

        if (checkArmstrong(num)) {
            console.log("Armstrong: Yes");
        } else {
            console.log("Armstrong: No");
        }

        console.log("Reverse: " + reverseNumber(num));

        table(num);
    }
}