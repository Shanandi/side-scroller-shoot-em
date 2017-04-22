function Background(url = '', width = 800, height = 600) {
    let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
    PIXI.extras.TilingSprite.call(this, texture, width, height);
    this.viewportX = 0;
}
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.update = function () {
    this.tilePosition.x -= this.offset;
}

Background.prototype.setViewportX = function (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
};