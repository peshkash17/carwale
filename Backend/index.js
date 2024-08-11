const express = require('express')
const {Server} = require('socket.io')

const http = require('http')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        metthofs:['GET', 'POSt']
    }
})
// server-side
io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on('join room', room => socket.join(room))
    socket.on('newMsg', ({newMessage, room})=>{
        console.log(room,newMessage)
        io.in(room).emit('getLatestMessage',newMessage)
    })
  });
  


app.get('/',(req,res)=>{
    res.send('Socket chat Backend started')
})

server.listen(8000, ()=> console.log('app started'))