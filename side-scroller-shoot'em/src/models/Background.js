function Background(url = '', width = 800, height = 600) {
    let texture = PIXI.Texture.fromImage('../resources/images/' + url + '.png');
    PIXI.extras.TilingSprite.call(this, texture, width, height);
    this.viewportX = 0;
};
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.setViewportX = function (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
};

// Far background
function FarBackground() {
    Background.call(this, 'far');
    this.DELTA_X = 0.32;
};
FarBackground.prototype = Object.create(Background.prototype);

// Mid background
function MidBackground() {
    Background.call(this, 'mid');
    this.DELTA_X = 1.28;
};
MidBackground.prototype = Object.create(Background.prototype);