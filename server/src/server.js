const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const { MSG } = require('./constant.js');
const { Game } = require('./game');

class ServerManager {
    constructor() {
        this.game = new Game();
        this.players = new Map();

        this.app = express();
        this.route();

        this.io = socketio(this.server);
        this.io.on(MSG.CONNECT_SERVER, this.connect.bind(this));

        // setInterval(this.updateGame.bind(this), 3000);
    }

    route() {
        this.app.use('/client', express.static(path.join(__dirname, `../../client`)));
        this.app.use('/assets', express.static(path.join(__dirname, `../assets`)));

        this.app.use('/', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        });

        const port = process.env.PORT || 8000;
        this.server = this.app.listen(port, function() {
            console.log(`KSA PLACE | listening on port ${port}`);
        }.bind(this));
    }

    connect(socket) {
        console.log(`${socket.id} | Connect Server`);

        socket.on(MSG.JOIN_GAME, this.joinGame.bind(this, socket));
        socket.on(MSG.UPDATE_GAME, this.updateGame.bind(this, socket));
        socket.on(MSG.LEAVE_GAME, this.leaveGame.bind(this, socket));

        socket.on(MSG.DISCONNECT_SERVER, this.disconnect.bind(this, socket));
    }

    joinGame(socket, data) {
        console.log(`${socket.id} | Join Game`);
        this.players.set(socket.id, { "socket": socket, "name": data.name });
        socket.emit(MSG.JOIN_GAME, null);
    }

    updateGame(socket, data) {
        console.log(`${socket.id} | Update Game`);
        var viewData = this.game.getView(data.x, data.y);
        socket.emit(MSG.UPDATE_GAME, viewData);
    }

    leaveGame(socket) {
        console.log(`${socket.id} | Leave Game`);
        this.players.delete(socket.id);
        socket.emit(MSG.LEAVE_GAME, null);
    }

    disconnect(socket) {
        console.log(`${socket.id} | Disconnect from client`);
    }

    // update() {
    //     this.game.players.forEach((player, socketID) => {

    //         var viewData = this.game.getView(data.x, data.y);
    //         player.socket.emit(MSG.UPDATE_GAME, viewData);
    //     });
    // }
}

new ServerManager();