const io = require('socket.io')(3000);

let count = -1;
let usernames = []      //blank list of users
let socketids = []

io.on('connection', socket => {

    socket.on('new-user', name => {
        usernames[++count] = name;
        socketids[count] = socket.id;
        socket.broadcast.emit('user-connected', name);
        console.log(usernames);
        console.log(socketids);
    })

    socket.on('send-chat-msg', msg => {
        console.log(usernames[socketids.indexOf(socket.id)] + ' is talking...')
        var userformat = /@\w+/;
        if(msg.match(userformat)) {
            let unamefound = msg.match(userformat)[0];
            unamefound = unamefound.slice(1)    
            console.log(unamefound)
            socket.broadcast.to(socketids[usernames.indexOf(unamefound)]).emit('chat-msg', {msg: msg, name: usernames[socketids.indexOf(socket.id)]});
        }
        else{
            socket.broadcast.emit('chat-msg', {msg: msg, name: usernames[socketids.indexOf(socket.id)]})
            console.log("noep")
        }
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', usernames[socketids.indexOf(socket.id)])
        usernames[socketids.indexOf(socket.id)] = null;
    })
})