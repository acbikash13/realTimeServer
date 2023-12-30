// Server-side code
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle game moves and broadcasts here
  socket.on('move', (data) => {
    // Process the game move
    // Broadcast the move to all connected clients
    io.emit('move', data);
  });
  socket.on('divClick', (data)=> {
    console.log("server side on handling of Div clicked")
    io.emit('divClick', data);
  })
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,('/index.html')));
  });

// Start your Express server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
