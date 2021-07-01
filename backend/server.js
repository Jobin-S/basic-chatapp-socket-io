const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors: {
        origin:'*'
    }
})

io.on('connection',(socket)=>{
    console.log('socket connected')
    socket.on('chat', (payload)=>{
        console.log('chat payload => ',payload)
        io.emit('chat', payload)
    })
})

server.listen(4000, ()=>{
    console.log('App has started...')
})