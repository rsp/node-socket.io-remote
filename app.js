#!/usr/bin/env node

// Socket.IO example from:
// https://github.com/rsp/node-socket.io-remote
// Copyright (c) 2016 Rafał Pocztarski
// Released under MIT License (Expat) - see:
// https://github.com/rsp/node-socket.io-remote/blob/master/LICENSE.md

var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'index.html'));
});
io.on('connection', s => {
  console.error('socket.io connection');
  for (var t = 0; t < 3; t++)
    setTimeout(() => s.emit('message', 'message from server'), 1000*t);
});
http.listen(3002, () => console.error('listening on http://localhost:3002/'));
console.error('socket.io example');

