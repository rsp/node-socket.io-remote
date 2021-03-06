#!/usr/bin/env node

// Socket.IO example from:
// https://github.com/rsp/node-socket.io-remote
// Copyright (c) 2016 Rafał Pocztarski
// Released under MIT License (Expat) - see:
// https://github.com/rsp/node-socket.io-remote/blob/master/LICENSE.md

var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'html')));

io.on('connection', s => {
  console.error('socket.io connection');
  s.on('click', d => {
    console.error('click on id '+d.id);
    s.broadcast.emit('click', d);
  });
});

http.listen(3002, () => console.error('Listening on http://localhost:3002/'));

console.error(
  'Socket.IO example from https://github.com/rsp/node-socket.io-remote\n');

