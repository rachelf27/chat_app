// import the required modules and setup server
const express = require('express');
const { dirname } = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000; // use the port provided by the environment variable or default to 8000 locally

// create a route for the application
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server.html');
});

// listen for an incoming socket connections
io.on('connection', (socket) => {
    console.log('User Connected');
    // disconnect event
    socket.on('disconnect', () => {
        console.log('User Disconnected');
      });
    // emit a message event to all connected clients
    socket.on('message', (data) => {
        console.log('Your message:', data);
        io.emit('message', data);
    });   
});

// start the the server to listen by passing in the port number
http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



