const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

/*
 * Serves a file to the client.
 */
function serveFile(res, filePath, contentType, statusCode = 200) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error("File reading error:", error);

            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            res.end("500 - Internal Server Error: The requested file could not be read.");
            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": contentType
        });

        res.end(data);
    });
}

/*
 * Creates the HTTP server.
 */
const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, "http://localhost").pathname;

    console.log(`${req.method} ${req.url}`);

    if (req.method !== "GET") {
        res.writeHead(405, {
            "Content-Type": "text/plain; charset=utf-8",
            "Allow": "GET"
        });
        res.end("405 - Method Not Allowed");
        return;
    }

    switch (requestUrl) {
        case "/":
        case "/home":
            serveFile(
                res,
                path.join(__dirname, "pages", "home.html"),
                "text/html; charset=utf-8",
                200
            );
            break;

        case "/about":
            serveFile(
                res,
                path.join(__dirname, "pages", "about.html"),
                "text/html; charset=utf-8",
                200
            );
            break;

        case "/contact":
            serveFile(
                res,
                path.join(__dirname, "pages", "contact.html"),
                "text/html; charset=utf-8",
                200
            );
            break;

        case "/style.css":
            serveFile(
                res,
                path.join(__dirname, "public", "style.css"),
                "text/css; charset=utf-8",
                200
            );
            break;

        default:
            serveFile(
                res,
                path.join(__dirname, "pages", "404.html"),
                "text/html; charset=utf-8",
                404
            );
            break;
    }
});

/*
 * Starts the server.
 */
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});