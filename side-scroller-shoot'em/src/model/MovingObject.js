function MovingObject(url) {
    let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
    PIXI.Sprite.call(this, texture);
    this.moveCounter = 0;
};
MovingObject.prototype = Object.create(PIXI.Sprite.prototype);

MovingObject.prototype.move = function (x, y) {
    this.rotate();
    this.position.x = x;
    this.position.y = y;
    ++this.moveCounter;
};

MovingObject.prototype.rotate = function () { };