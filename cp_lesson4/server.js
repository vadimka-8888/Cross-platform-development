const http = require('http');
let fs = require('fs');
var url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let pathname = url.parse(req.url).pathname
  console.log("Request for " + pathname + " received.")
  let sourcePath = ""
  if (pathname == "/") 
  {
    sourcePath = './index.html'
    res.setHeader('Content-Type', 'text/html');
  } else if (pathname == "/src/index.js") 
  {
    sourcePath = './src/index.js'
    res.setHeader('Content-Type', 'application/javascript');
  } else if (pathname == "/src/miniMaple")
  {
    sourcePath = './src/miniMaple.js'
    res.setHeader('Content-Type', 'application/javascript');
  }
  fs.readFile(sourcePath, null, function(error, data) 
  {
    if (error) 
    {
      res.writeHead(404);
      res.write('File not found!');
    } 
    else 
    {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});