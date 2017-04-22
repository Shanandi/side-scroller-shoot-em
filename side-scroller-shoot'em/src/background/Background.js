function Background(url = '', width = 800, height = 600) {
    let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
    PIXI.extras.TilingSprite.call(this, texture, width, height);
}
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.update = function () {
    this.tilePosition.x -= this.offset;
}