const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({port: 4500});

wss.on('connection', function (socket) {
    socket.send('Hello from Server side');
    socket.on('message', function (msg) {
        console.log(`${msg}`);
    });
});

/* CLIENTSIDE :  
const socket = new WebSocket("ws://localhost:4500");
socket.onopen = function(){
    socket.send("Hello from the client side");
}
socket.onmessage = function(event){
    console.log(event.data);
}
*/
