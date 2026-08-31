// Function returns a Promise
const divide = (firstNumber, secondNumber) => {
    return new Promise((resolve, reject) => {

        if (secondNumber === 0) {
            reject("Division by zero is not allowed.");
        } else {
            resolve(firstNumber / secondNumber);
        }

    });
};


// Test 5 different cases
const runTests = () => {
    const output = document.getElementById("output");

    output.innerHTML = "";

    const tests = [
        [10, 2],
        [20, 4],
        [15, 3],
        [10, 0],
        [25, 5]
    ];

    tests.forEach((test, index) => {

        const first = test[0];
        const second = test[1];

        divide(first, second)
            .then((result) => {
                output.innerHTML += `
                    <div class="result">
                        Test ${index + 1}: ${first} ÷ ${second} = ${result}
                    </div>
                `;
            })
            .catch((error) => {
                output.innerHTML += `
                    <div class="result">
                        Test ${index + 1}: ${first} ÷ ${second} → Error: ${error}
                    </div>
                `;
            });

    });

    // Demonstrates Web API → Callback Queue → Event Loop
    setTimeout(() => {
        console.log("setTimeout callback executed");
    }, 1000);
};