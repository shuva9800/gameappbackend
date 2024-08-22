const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://golden-llama-e7b546.netlify.app", 
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('buttonPress', (direction) => {
    // Broadcast the button press to all connected clients
    io.emit('buttonPress', direction);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});


