class Background extends PIXI.extras.TilingSprite {
    protected _viewportX: number = 0;
    protected _delta: number = 0;

    public constructor(url = '') {
        super(PIXI.Texture.fromImage('../resources/images/' + url + '.png'), CANVAS_X, CANVAS_Y);
    }

    public update(): void {
        let newViewportX: number = this._viewportX + SPEED;
        var distanceTravelled: number = newViewportX - this._viewportX;
        this._viewportX = newViewportX;
        this.tilePosition.x -= (distanceTravelled * this._delta);
    }
}

// Far background
class FarBackground extends Background {
    protected _delta: number = 0.32;

    public constructor() {
        super('far');
    }
}

// Mid background
class MidBackground extends Background {
    protected _delta: number = 1.28;

    public constructor() {
        super('mid');
    }
}