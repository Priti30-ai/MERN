// Dummy array for testing
const numbers = [4, 8, 2, 11, 6, 7, 10];


// Find the maximum number
const findMaximum = (arr) => {
    let maximum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }

    return maximum;
};


// Calculate the sum of all numbers
const findSum = function (arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    return sum;
};


// Count the odd numbers
function countOddNumbers(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            count++;
        }
    }

    return count;
}


// Calling the functions
console.log("Array:", numbers);
console.log("Maximum number:", findMaximum(numbers));
console.log("Sum of all elements:", findSum(numbers));
console.log("Count of odd numbers:", countOddNumbers(numbers));