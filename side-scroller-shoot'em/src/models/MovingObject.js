function MovingObject(url) {
    let texture = PIXI.Texture.fromImage('../resources/images/' + url + '.png');
    PIXI.Sprite.call(this, texture);
    this.anchor.set(0.5);
    this.rotation = 0;
    this.moveCounter = 0;
};
MovingObject.prototype = Object.create(PIXI.Sprite.prototype);

MovingObject.prototype.move = function (x, y) {
    this.rotate();
    this.position.set(x, y);
    ++this.moveCounter;
};

MovingObject.prototype.rotate = function () { };

MovingObject.prototype.propagateExplosion = function (stage, time) {
    let particleCollection = new ParticleCollection({
        x: this.position.x,
        y: this.position.y
    }, time);
    stage.addChild(particleCollection);
}