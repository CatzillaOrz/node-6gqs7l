// run `node index.js` in the terminal
var fs = require('fs')
var http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') return res.end();
})

server.listen(8080)
