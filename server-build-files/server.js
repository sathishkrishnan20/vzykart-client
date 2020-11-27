const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/build'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/dist', 'index.html')));

const server = http.createServer(app);

server.listen(port, () => console.log('Running....'));