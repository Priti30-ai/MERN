# Node.js Web Server

## Objective

Create a basic web server with Node.js's built-in HTTP module. The server
demonstrates URL routing, asynchronous file reading, HTML and CSS responses,
HTTP status codes, and a custom 404 page without using a web framework.

## Technologies

- Node.js built-in `http`, `fs`, and `path` modules
- HTML5 and CSS3

## Project Structure

```text
Priti.Ahire_Task31/
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── pages/
│   ├── home.html
│   ├── about.html
│   ├── contact.html
│   └── 404.html
├── public/
│   └── style.css
└── screenshots/
```

## Install and Run

```sh
npm install
npm start
```

The server listens on port 3000 by default. Set the `PORT` environment variable
to use a different port.

## Routes

| Method | Route | Response |
| --- | --- | --- |
| GET | `/` | Home page, 200 |
| GET | `/home` | Home page, 200 |
| GET | `/about` | About page, 200 |
| GET | `/contact` | Contact page, 200 |
| GET | `/style.css` | Stylesheet, 200 |
| GET | Any other route | Custom 404 page, 404 |
| Other methods | Any route | Plain-text error, 405 |

## Features

- Route-based navigation between the Home, About, and Contact pages.
- The File System module's asynchronous `fs.readFile()` serves each file.
- The Path module's `path.join()` builds paths relative to this project.
- Missing files are logged and return a plain-text 500 response.
- Each request method and URL is logged to the terminal.
- Shared responsive styling is served through `/style.css`.

## Test the Server

With `npm start` running, open these URLs in a browser:

- http://localhost:3000/
- http://localhost:3000/home
- http://localhost:3000/about
- http://localhost:3000/contact
- http://localhost:3000/style.css
- http://localhost:3000/random (custom 404 page)

GitHub Pages does not execute Node.js server code. Run this project locally or
on a Node.js-capable host to test its routes.
