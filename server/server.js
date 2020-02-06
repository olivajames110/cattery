const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let SERVER_DUMMY = {
    name: "SERVER",
    id: 1
};

io.on("connection", socket => {
    console.log("New Connection");
    socket.on("client_send", ({ partiesList }, callback) => {
        console.log(partiesList);
        let server_data = [...partiesList, SERVER_DUMMY];
        callback(server_data);
    });

    // socket.emit("client_recieve", {
    // 	server_data
    // })

    socket.on("disconnect", () => {
        console.log("User disconnect");
    });
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
