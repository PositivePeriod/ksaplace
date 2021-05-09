import { Game } from './game.js';

class App {
    constructor() {
        this.showRange = { width: 6, height: 6 };
        this.showWidth = 2 * this.showRange.width + 1;
        this.showHeight = 2 * this.showRange.height + 1;

        this.frame = document.getElementById("gameFrame");
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.game = new Game(this.showWidth, this.showHeight, this.ctx);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();
    }

    resize() {
        var stageWidth = document.body.clientWidth;
        var stageHeight = document.body.clientHeight * 0.8;

        this.grid = Math.min(stageWidth / this.showWidth, stageHeight / this.showHeight);
        this.stageWidth = this.grid * this.showWidth;
        this.stageHeight = this.grid * this.showHeight;

        this.frame.width = this.stageWidth;
        this.frame.height = this.stageHeight;
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        console.log('resize', this.stageWidth, this.stageHeight);

        this.game.resize(this.stageWidth, this.stageHeight, this.grid);
    }
}

window.onload = () => {
    console.log('Client start');
    new App();
}