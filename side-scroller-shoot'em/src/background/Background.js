class Background extends PIXI.extras.TilingSprite {
    constructor(url = '', width = 800, height = 600) {
        let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
        super(texture, width, height);
        this.viewportX = 0;
    }

    update() {
        this.tilePosition.x -= this.offset;
    }

    setViewportX(newViewportX) {
        var distanceTravelled = newViewportX - this.viewportX;
        this.viewportX = newViewportX;
        this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
    }
}

// Far background
class FarBackground extends Background {
    constructor() {
        super('far');
        this.DELTA_X = 0.32;
    }
}

// Mid background
class MidBackground extends Background {
    constructor() {
        super('mid');
        this.DELTA_X = 1.28;
    }
}