import { Network } from "./network.js";


export class Game {
    constructor(showWidth, showHeight, ctx) {
        this.showWidth = showWidth;
        this.showHeight = showHeight;
        this.ctx = ctx;

        this.tableRatio = 0.8;
        this.blockRatio = 0.9;

        this.data = Array.from(Array(this.showWidth), () => Array(this.showHeight).fill(null));

        this.network = new Network(this);
        this.network.joinGame('ClientX');
    }

    resize(stageWidth, stageHeight, grid) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.grid = grid * this.tableRatio;
        this.margin = this.grid * (1 - this.blockRatio) / 2;

        this.startX = this.stageWidth / 2 - this.grid * this.showWidth / 2;
        this.startY = this.stageHeight / 2 - this.grid * this.showHeight / 2;
    }

    update(data) {
        for (let x = 0; x < this.showWidth; x++) {
            for (let y = 0; y < this.showHeight; y++) {
                this.data[x][y] = (data[x][y]) ? data[x][y] : '#888888';
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        // ctx.lineJoin = "round";
        // ctx.lineWidth = this.corner;
        // ctx.strokeStyle = 'transparent';
        for (let x = 0; x < this.showWidth; x++) {
            for (let y = 0; y < this.showHeight; y++) {
                this.ctx.fillStyle = this.data[x][y];
                this.ctx.fillRect(
                    this.startX + x * this.grid + this.margin,
                    this.startY + y * this.grid + this.margin,
                    this.grid - 2 * this.margin, this.grid - 2 * this.margin);
                // ctx.fillRect(this.x + this.margin + (this.corner / 2), this.y + this.margin + (this.corner / 2),
                //     this.size - 2 * this.margin - 2 * (this.corner / 2), this.size - 2 * this.margin - 2 * (this.corner / 2));

            }
        }
    }
}