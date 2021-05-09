const MSG = Object.freeze({
    CONNECT_SERVER: "connection",
    JOIN_GAME: "joinGame",
    UPDATE_GAME: "updateGame",
    UPDATE_PIXEL: "updatePixel",
    SPECTATE_GAME: "spectateGame",
    LEAVE_GAME: "leaveGame",
    DISCONNECT_SERVER: "disconnect",
});

export class Network {
    constructor(map) {
        this.map = map;
        this.posX = 50; // TODO
        this.posY = 50; // TODO

        const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
        this.socket = io(`${socketProtocol}://${window.location.host}`);

        window.addEventListener("beforeunload", this.disconnect.bind(this));

        setInterval(this.requestUpdate.bind(this), 1000);
    }

    requestUpdate() {
        this.socket.emit(MSG.SPECTATE_GAME, null);
    }

    joinGame(name) {
        this.socket.emit(MSG.JOIN_GAME, { 'name': name });
        this.socket.on(MSG.SPECTATE_GAME, this.updateGame.bind(this));
        this.socket.on(MSG.DISCONNECT_SERVER, this.disconnectFromServer.bind(this));
    }

    updateGame(data) {
        console.log('Update Game');
        this.map.update(data);
        this.map.draw();
    }

    disconnect() {
        console.log("Disconnect from client");
        window.removeEventListener("beforeunload", this.disconnect.bind(this));
        this.socket.emit(MSG.DISCONNECT_SERVER, null);
    }

    disconnectFromServer() {
        console.log("Disconnect from server");
    }
}