# Node.js Web Server

## Project Overview

This project demonstrates the creation of a basic web server using
Node.js and the built-in HTTP module.

The server handles multiple routes and serves HTML pages and a CSS
stylesheet. It also implements a custom 404 page for invalid routes.

The project is also published as a static site on GitHub Pages at:
https://priti30-ai.github.io/MERN/Priti.Ahire_Task31/

GitHub Pages cannot run the Node.js server. The Pages workflow publishes the
same HTML and CSS files as static pages; run `npm start` to use the HTTP server
locally.

## Technologies Used

- Node.js
- HTTP Module
- File System Module
- Path Module
- HTML5
- CSS3

## Project Structure

```text
NodeJS-Web-Server/
│
├── server.js
├── package.json
├── README.md
│
├── pages/
│   ├── home.html
│   ├── about.html
│   ├── contact.html
│   └── 404.html
│
├── public/
│   └── style.css
│
└── screenshots/