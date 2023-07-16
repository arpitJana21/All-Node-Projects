const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/users");
const formateMessage = require("./utils/messages");
require("dotenv").config()

const PORT = process.env.PORT || 8080;

const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.get("/", (req, res) => {
    res.send({ message: "HI" });
});


io.on("connection", (socket) => {

   
    console.log("one client joined")

    socket.on("joinRoom", ({ username, room }) => {


        const user = userJoin(socket.id, username, room)

        socket.join(user.room);
        

        // Welcome current 
        let formate = formateMessage("Masai server", "Welcome to Masai Server");

        // messages[user.room].push(formate);

        socket.emit("message",formate )

        formate = formateMessage("Masai server", `${user.username} has joined the chat`);

  
        // broadcat to other users
        socket.broadcast.to(user.room).emit("message", formate )

        //  Get all room user
        io.to(user.room).emit("roomUsers", {
            room: user.room, users: getRoomUsers(user.room)
        })

    })


    socket.on("chatMessage",(msg)=>{
          const user = getCurrentUser(socket.id)

          let formate = formateMessage(user.username,msg);
         
          io.to(user.room).emit("message",formate)
    });


    socket.on("diconnect",()=>{
        const user = userLeave(socket.id)

        let formate = formateMessage("Masai Server", `${user.username} has left the chat`);

        io.to(user.room).emit("message",formate);

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });


    })


})



server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})
