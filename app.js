const express = require('express');
const path = require('path');
const {engine: expresshbs} = require("express-handlebars");
const socketIO = require("socket.io");
const app = new express();
const productos = require('./routes/productos');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use("/api/productos", productos);

// view engine setup
app.set("port", process.env.PORT || 8080);
app.engine("hbs",expresshbs({
  extname: ".hbs",
  defaultLayout:"layout",
  layoutsDir: path.join(__dirname,"/views/layouts/"),
  partialsDir: path.join(__dirname,"/views/partials/"),
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//server
const server  = app.listen(app.get("port"),()=>console.log(`server running on ${app.get("port")}`));
app.get("/",(req, res)=>{
    res.render("index");
});

const messages = [
    {
        email: 'server@server.com',
        date: new Date().toUTCString(),
        msg: 'Testing Chat'
    }
];

//socket
const io = socketIO(server);
io.on("connection",(socket)=>{
    console.log("user connected id:", socket.id);
    socket.on("new-product",(data)=>{
        io.sockets.emit("new-product", data);
    });

    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
    
});

