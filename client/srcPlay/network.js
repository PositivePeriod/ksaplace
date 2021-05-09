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
        this.posX = 0;
        this.posY = 0;

        const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
        this.socket = io(`${socketProtocol}://${window.location.host}`);

        window.addEventListener("beforeunload", this.disconnect.bind(this));

        setInterval(this.requestUpdate.bind(this), 1000);
    }

    handle(command) {
        const coorX = document.getElementById('gameCoorX');
        const coorY = document.getElementById('gameCoorY');
        switch (command) {
            case "KeyUp":
                this.posY -= 1;
                coorY.value = this.posY.toString();
                break;
            case "KeyDown":
                this.posY += 1;
                coorY.value = this.posY.toString();
                break;
            case "KeyLeft":
                this.posX -= 1;
                coorX.value = this.posX.toString();
                break;
            case "KeyRight":
                this.posX += 1;
                coorX.value = this.posX.toString();
                break;
            case "KeyMove":
                var strX = coorX.value;
                var strY = coorY.value;
                this.posX = parseInt(strX, 10);
                this.posY = parseInt(strY, 10);
                coorX.value = this.posX.toString();
                coorY.value = this.posY.toString();
                console.log(this.posX, this.posY);
                break;
            case "KeyInteract":
                var color = document.getElementById('gameColorPicker').value;
                console.log(color);
                this.socket.emit(MSG.UPDATE_PIXEL, { 'x': this.posX, 'y': this.posY, 'color': color });
                break;
        }
    }

    requestUpdate() {
        this.socket.emit(MSG.UPDATE_GAME, { 'x': this.posX, 'y': this.posY });
    }

    joinGame(name) {
        this.socket.emit(MSG.JOIN_GAME, { 'name': name });
        this.socket.on(MSG.UPDATE_GAME, this.updateGame.bind(this));
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