// run `node index.js` in the terminal
const http = require('http');
const routes = require('./routes')
const server = http.createServer(routes)
server.listen(8080)
