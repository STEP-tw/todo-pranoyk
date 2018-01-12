const http = require('http');
const fs = require('fs');
const app = require('./app.js').app;


const PORT = 5050;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
