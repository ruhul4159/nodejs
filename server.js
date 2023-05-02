const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = './public';

const server = http.createServer((req, res) => {
  // Construct the file path from the public directory and the requested URL
  const filePath = path.join(__dirname, PUBLIC_DIR, req.url);

  // Check if the requested file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Return a 404 Not Found response if the file doesn't exist
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      // Read the file and return its contents as the response
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // Return a 500 Internal Server Error response if there's an error reading the file
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
        } else {
          // Return the file contents with the appropriate Content-Type header
          const extname = path.extname(filePath);
          const contentType = getContentType(extname);
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server run success on port ${PORT}`);
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/plain';
  }
}
