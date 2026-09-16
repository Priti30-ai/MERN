# Shoe Store - React

## Task 25

A simple online shoe store built using React and Vite. The application allows users to view shoes, add products to the shopping cart, change quantities, remove products, and view the total cart price.

## Features

* Display available shoes
* Show shoe image, name, and price
* Add shoes to the cart
* Increase product quantity
* Decrease product quantity
* Remove products from the cart
* Automatically calculate the cart total
* Simple and responsive user interface

## Technologies Used

* React
* Vite
* JavaScript
* HTML
* CSS

## React Concepts Used

### Components

The application is divided into reusable components:

* Navbar
* Product
* Cart

### Props

Props are used to pass product information and functions between components.

### useState

The React `useState` hook is used to manage the shopping cart state and update product quantities.

## Project Structure

src/
├── components/
│   ├── Navbar.jsx
│   ├── Product.jsx
│   └── Cart.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

## How to Run the Project

### 1. Clone or download the project

Open the project folder in VS Code.

### 2. Install dependencies

npm install

### 3. Start the development server

npm run dev

### 4. Open in browser

Open the local URL shown in the terminal, usually:

http://localhost:5173/

## How It Works

The user can select a shoe by clicking the **Add to Cart** button. If the shoe is already present in the cart, its quantity is increased.

The `+` button increases the quantity, while the `-` button decreases it. When the quantity reaches zero, the product is removed from the cart.

The total price is calculated based on the product price and its quantity.

