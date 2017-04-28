class Background extends PIXI.extras.TilingSprite {
    protected viewportX: number = 0;
    protected DELTA_X: number;

    constructor(url = '') {
        super(PIXI.Texture.fromImage('../resources/images/' + url + '.png'), CANVAS_X, CANVAS_Y);
    }

    setViewportX() {
        let newViewportX = this.viewportX + SPEED;
        var distanceTravelled = newViewportX - this.viewportX;
        this.viewportX = newViewportX;
        this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
    }
}

// Far background
class FarBackground extends Background {
    protected DELTA_X: number = 0.32;
    constructor() {
        super('far');
    }
}

// Mid background
class MidBackground extends Background {
    protected DELTA_X: number = 1.28;
    constructor() {
        super('mid');
    }
}