import moment from 'moment';
import uuid from 'uuid/v4';
import startDatabaseService from './database/startDatabaseService';
import UserRepository from './database/repository/UserRepository';
import RoomRepository from './database/repository/RoomRepository';
import { shorten } from './utils';

startDatabaseService();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 * Global Settings and vars
 */
const port = 1337;
const format = 'D.MM.YY HH:mm:ss';
server.listen(port);
console.log(`Port: ${port}; Server-Time: ${moment().format(format)}`);
/*
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
*/

// room declaration
const defaultRoom = {
    id: uuid(),
    name: 'Default',
    createdAt: moment().format(format),
};
RoomRepository.save(defaultRoom);

io.on('connection', async (socket) => {
    // create new User Object
    const user = {
        id: socket.id,
        currentRoom: defaultRoom.id,
        createdAt: moment().format(format),
    };
    // persist new User to DB
    UserRepository.save(user);
    // join default room => everyone start here
    socket.join(defaultRoom.id);
    // emit current room to socket
    socket.emit('current-room', defaultRoom);
    // emit to socket
    socket.emit('new-chat-message', {
        username: 'Server',
        content: `You joined room: ${defaultRoom.name}`,
        type: 'is-info',
    });
    // emit room list to socket
    socket.emit('update-room-list', await RoomRepository.getAll());
    // [all] update user list
    io.emit('update-user-list', await UserRepository.getAll());

    /**
     * Init call for set username (can be extended with e.g. an auth)
     */
    socket.on('init', async (username) => {
        const currentUser = await UserRepository.get(socket.id);
        socket.emit('current-id', currentUser.id);
        currentUser.username = username;
        UserRepository.update(currentUser);
        // broadcast an room update
        io.emit('update-room-list', await RoomRepository.getAll());
        // broadcast an user update
        io.emit('update-user-list', await UserRepository.getAll());
    });

    /**
     * Create a new room
     */
    socket.on('create-room', async (roomName) => {
        console.log('create-room', roomName);
        // create new Object
        const newRoom = {
            id: uuid(),
            name: roomName,
            createdBy: socket.id,
        };
        // Persist new Room to DB
        RoomRepository.save(newRoom);
        // get current User from DB
        const currentUser = await UserRepository.get(socket.id);
        // leave old Room
        socket.leave(currentUser.currentRoom);
        // join new Room
        socket.join(newRoom.id);
        // update User
        currentUser.currentRoom = newRoom.id;
        // Persist update to DB
        UserRepository.update(currentUser);
        // emit to socket
        socket.emit('new-chat-message', {
            username: 'Server',
            content: `You created/joined room '${newRoom.name}'.`,
            type: 'is-info',
        });
        socket.emit('current-room', newRoom);
        // broadcast an room update
        io.emit('update-room-list', await RoomRepository.getAll());
        // broadcast an user update
        io.emit('update-user-list', await UserRepository.getAll());
    });

    /**
     * Join a room
     */
    socket.on('join-room', async (roomId) => {
        console.log('join-room', roomId);
        // get current User from DB
        const currentUser = await UserRepository.get(socket.id);
        const joinRoom = await RoomRepository.get(roomId);
        // leave old Room
        socket.leave(currentUser.currentRoom);
        // join new Room
        socket.join(roomId);
        // update User
        currentUser.currentRoom = roomId;
        // Persist update to DB
        UserRepository.update(currentUser);
        // emit to socket
        socket.emit('new-chat-message', {
            username: 'Server',
            content: `You joined room: ${joinRoom.name}.`,
            type: 'is-info',
        });
        // broadcast to others in the room
        socket.in(joinRoom.id).broadcast.emit('new-chat-message', {
            username: 'Server',
            content: `${currentUser.username || currentUser.id} joined room.`,
            type: 'is-info',
        });
        socket.emit('current-room', joinRoom);
        // broadcast an user update
        io.emit('update-user-list', await UserRepository.getAll());
    });

    // simple chat message inside of a room
    socket.on('chat-message', async (content) => {
        const currentUser = await UserRepository.get(socket.id);
        const message = {
            userId: currentUser.id,
            content,
        };
        console.log(`chat-message by ${shorten(socket.id)} in ${shorten(currentUser.currentRoom)}`, content);
        io.in(currentUser.currentRoom).emit('new-chat-message', message);
    });

    // --- last ---
    socket.on('disconnect', () => {
        UserRepository.remove(socket.id);
        // push new user list
        io.emit('update-user-list', UserRepository.getAll());
    });
});
