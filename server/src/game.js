class Game {
    constructor() {
        this.width = 101;
        this.height = 101;
        this.map = new Map();
        this.initMap();

        this.showRange = { width: 6, height: 6 }; // TODO constant.json
        this.showWidth = 2 * this.showRange.width + 1;
        this.showHeight = 2 * this.showRange.height + 1;
    }

    initMap() {
        for (let x = 0; x <= this.width; x++) {
            for (let y = 0; y <= this.height; y++) {
                var i = x + y * this.width;
                this.map.set(i, '#FFFFFF');
                // switch (i % 3) {
                //     case 0:
                //         this.map.set(i, '#FF0000');
                //         break;
                //     case 1:
                //         this.map.set(i, '#00FF00');
                //         break;
                //     case 2:
                //         this.map.set(i, '#0000FF');
                //         break;
                // }
                // if (x === y) {
                //     this.map.set(i, '#58f5c8')
                // }
            }
        }
    }

    getView(cx, cy) {
        var viewData = Array.from(Array(this.showWidth), () => Array(this.showHeight));
        for (let x = -this.showRange.width; x <= this.showRange.width; x++) {
            for (let y = -this.showRange.height; y <= this.showRange.height; y++) {
                viewData[x + this.showRange.width][y + this.showRange.height] = this.getPixel(cx + x, cy + y);
            }
        }
        return viewData;
    }

    getSpectate() {
        var viewData = Array.from(Array(this.width), () => Array(this.height));
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y <= this.height; y++) {
                viewData[x][y] = this.getPixel(x, y);
            }
        }
        return viewData;
    }

    getPixel(x, y) {
        return (0 <= x && x < this.width && 0 <= y && y < this.height) ? this.map.get(x + y * this.width) : null;
    }

    changePixel(x, y, color) {
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            this.map.set(x + y * this.width, color);
        }
    }
}

module.exports = { Game };