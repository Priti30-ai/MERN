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
                "Content-Type": "text/plain"
            });

            res.end("500 - Internal Server Error");
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
    const requestUrl = new URL(req.url, "http://localhost").pathname.replace(/\/+$/, "") || "/";

    console.log(`${req.method} ${requestUrl}`);

    if (req.method !== "GET") {
        res.writeHead(405, {
            "Content-Type": "text/plain",
            "Allow": "GET"
        });
        res.end("405 - Method Not Allowed");
        return;
    }

    switch (requestUrl) {
        case "/":
        case "/home":
        case "/home.html":
        case "/index.html":
            serveFile(
                res,
                path.join(__dirname, "pages", "home.html"),
                "text/html",
                200
            );
            break;

        case "/about":
        case "/about.html":
            serveFile(
                res,
                path.join(__dirname, "pages", "about.html"),
                "text/html",
                200
            );
            break;

        case "/contact":
        case "/contact.html":
            serveFile(
                res,
                path.join(__dirname, "pages", "contact.html"),
                "text/html",
                200
            );
            break;

        case "/style.css":
        case "/public/style.css":
            serveFile(
                res,
                path.join(__dirname, "public", "style.css"),
                "text/css",
                200
            );
            break;

        default:
            serveFile(
                res,
                path.join(__dirname, "pages", "404.html"),
                "text/html",
                404
            );
            break;
    }

});

/*
 * Starts the server.
 */
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});