# Compound Interest Calculator

This is a simple JavaScript program to calculate compound interest using predefined values.

## About the Program

The program uses the compound interest formula:

**A = P(1 + r/n)^(nt)**

Where:

* **A** = Final Amount
* **P** = Principal Amount
* **r** = Rate of Interest
* **n** = Number of times interest is compounded per year
* **t** = Time in years

The compound interest is calculated using:

**Compound Interest = A - P**

## Technologies Used

* HTML
* CSS
* JavaScript

## Files Used

Compound-Interest/
│
├── index.html
├── style.css
├── script.js
└── README.md

### index.html

Contains the basic webpage structure and displays the values used in the calculation.

### style.css

Contains simple styling for the webpage.

### script.js

Contains the JavaScript code used to calculate the compound interest and display the result using `console.log()`.

## Predefined Values

The program uses static values:

Principal = ₹100000
Rate of Interest = 10%
Compounding Frequency = 1 time per year
Time = 3 years

## Example Output

The compound interest after 3 years is ₹33100.00

The result is displayed with **2 digits after the decimal point** using `toFixed(2)`.

## How to Run

1. Download or clone this project.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Right-click on the webpage and select **Inspect**.
5. Open the **Console** tab.
6. The calculated compound interest will be displayed there.

## Formula Used

A = P(1 + r/n)^(nt)

Compound Interest = A - P

This practical demonstrates the use of **JavaScript variables, operators, mathematical calculations, `Math.pow()`, `console.log()` and `toFixed(2)`**.
