const http = require("http");

const data = [
    { id: 1, name: "John Doe", role: "Student" },
    { id: 2, name: "Jane Smith", role: "Teacher" },
];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Log incoming requests
    console.log(`${method} request to ${url}`);

    // Handle different routes
    if (url === "/api/users" && method === "GET") {
        // Fetch all users
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    } else if (url.startsWith("/api/users/") && method === "GET") {
        // Fetch user by ID
        const id = parseInt(url.split("/")[3]);
        const user = data.find((u) => u.id === id);

        if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("User not found");
        }
    } else if (url === "/api/users" && method === "POST") {
        // Add a new user
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const newUser = JSON.parse(body);

            // Use Spread operator to add a new user
            const newData = [...data, { id: data.length + 1, ...newUser }];
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newData));
        });
    } else {
        // Handle unknown routes
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found");
    }
});

// Start the server
server.listen(2300, () => {
    console.log("Server running on http://localhost:2300");
});
