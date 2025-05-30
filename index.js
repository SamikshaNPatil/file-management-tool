const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    const method = req.method;
    const url = req.url;

    const baseDir = path.join(__dirname, 'files');
    const filePath = path.join(baseDir, 'example.txt');

    if (method === 'POST' && url === '/create') {
        fs.writeFile(filePath, 'Hello, this is a test file!', (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error creating file');
                return;
            }
            res.writeHead(201);
            res.end('File created successfully');
        });
    } else if (method === 'GET' && url === '/read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else if (method === 'DELETE' && url === '/delete') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }
            res.writeHead(200);
            res.end('File deleted successfully');
        });
    } else {
        console.log(`Unhandled route: ${method} ${url}`);
        res.writeHead(404);
        res.end('Route not found');
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
