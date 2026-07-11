const http = require('http');

const server = http.createServer((req, res) => {
    // 1. Setup CORS & JSON headers so frontends can securely talk to your backend
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows frontend connections
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // Handle browser pre-flight safety checks (OPTIONS requests)
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // 2. GET Endpoint: Status check
    if (req.url === '/status' && req.method === 'GET') {
        res.writeHead(200);
        return res.end(JSON.stringify({ 
            status: "healthy", 
            timestamp: new Date().toISOString() 
        }));
    } 

    // 3. POST Endpoint: Receiving client data dynamically
    else if (req.url === '/data' && req.method === 'POST') {
        let body = '';

        // Capture incoming data pieces (chunks) as they stream into the server
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once all data is received, process it
        req.on('end', () => {
            try {
                // Parse the data if it's JSON, or default to an empty object
                const parsedData = body ? JSON.parse(body) : {};
                
                res.writeHead(200);
                res.end(JSON.stringify({ 
                    success: true, 
                    message: "Data received successfully!",
                    echo: parsedData 
                }));
            } catch (error) {
                res.writeHead(400); // Bad Request
                res.end(JSON.stringify({ error: "Invalid JSON format payload" }));
            }
        });
    } 

    // 4. Fallback: 404 Not Found
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Production-ready server listening on http://localhost:${PORT}`);
});