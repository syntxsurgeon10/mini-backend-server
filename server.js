const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/status' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: "healthy", message: "Server is running smoothly" }));
    } else if (req.url === '/data' && req.method === 'POST') {
        res.writeHead(200);
        res.end(JSON.stringify({ received: true, timestamp: new Date().toISOString() }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
