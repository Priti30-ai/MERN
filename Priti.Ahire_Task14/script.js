// Find sum of first n natural numbers
function sumNumbers(n) {
    let total = 0;

    for (let i = 1; i <= n; i++) {
        total = total + i;
    }

    return total;
}


// Print multiplication table
function printTable(num) {
    console.log("Multiplication table of " + num);

    for (let i = 1; i <= 10; i++) {
        console.log(num + " x " + i + " = " + (num * i));
    }
}


// Check prime number
function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}


// Find factors
function getFactors(num) {
    let result = [];

    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            result.push(i);
        }
    }

    return result;
}


// Find sum of digits
function digitSum(num) {
    let total = 0;

    while (num > 0) {
        let digit = num % 10;
        total = total + digit;
        num = Math.floor(num / 10);
    }

    return total;
}


// Check Armstrong number using power 3
function isArmstrong(num) {
    let original = num;
    let total = 0;

    while (num > 0) {
        let digit = num % 10;

        total = total + Math.pow(digit, 3);

        num = Math.floor(num / 10);
    }

    return total === original;
}


// Reverse a number
function reverseNum(num) {
    let reverse = 0;

    while (num > 0) {
        let digit = num % 10;

        reverse = reverse * 10 + digit;

        num = Math.floor(num / 10);
    }

    return reverse;
}


// Run all operations
function runProgram() {

    let n = 10;

    console.log("SUM OF FIRST N NATURAL NUMBERS");
    console.log("Number:", n);
    console.log("Sum:", sumNumbers(n));


    let nums = [153, 17, 51, 123, 200];

    console.log(" ");
    console.log("NUMBER OPERATIONS");


    for (let i = 0; i < nums.length; i++) {

        let num = nums[i];

        console.log(" ");
        console.log("Number:", num);

        // Prime check
        if (isPrime(num)) {
            console.log("Prime: Yes");
        } else {
            console.log("Prime: No");
        }

        // Factors
        console.log("Factors:", getFactors(num));

        // Sum of digits
        console.log("Sum of digits:", digitSum(num));

        // Armstrong check
        if (isArmstrong(num)) {
            console.log("Armstrong: Yes");
        } else {
            console.log("Armstrong: No");
        }

        // Reverse
        console.log("Reverse:", reverseNum(num));

        // Table
        printTable(num);
    }
}