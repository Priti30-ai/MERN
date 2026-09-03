# Service Booking Web App

## Project Description

This project is a Service Booking Web Application created using HTML, CSS and JavaScript.

The application allows users to browse different services, add services to the cart and book the selected services.

## Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation

## Features

- Navigation bar
- Home, Services, Contact Us and About Us links
- Username display
- Logout button
- Browse available services
- Skip service option
- Add service option
- Display selected services
- Dynamic total amount calculation
- Booking form
- Form validation
- Booking confirmation message
- Responsive design

## Services

The application contains the following services:

1. Dry Cleaning - ₹200
2. Leather & Suede Cleaning - ₹999
3. Ironing - ₹30
4. Wedding Dress Cleaning - ₹2400

## How to Run

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Make sure the following files are present:

   - index.html
   - style.css
   - script.js

4. Open `index.html` in a web browser.

The application will start running in the browser.

## How JavaScript Works

JavaScript is used to manipulate the DOM.

When the user clicks the "Add Item" button:

1. The selected service is stored in an array.
2. The Added Items section is updated.
3. The total amount is calculated.
4. The next service is displayed.

When the user clicks "Skip Item", the current service is skipped and the next service is displayed.

The Book Now button is enabled only after the user adds at least one service.

## Project Structure

Service-Booking-App/
│
├── index.html
├── style.css
├── script.js
└── README.md