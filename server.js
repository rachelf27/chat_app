const express = require('express');
const { dirname } = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// app.listen(8000, () => {
//     console.log('Server is listening on port 8000');
// });
  
io.on('connection', (socket) => {
    console.log('Connected');
    io.emit("User connected");
    
    socket.on('message', (data) => {
        console.log('Your message:', data);
        io.emit('message', data);
    });
});

http.listen(8000, () => {
    console.log('Server listening on port 8000');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});



