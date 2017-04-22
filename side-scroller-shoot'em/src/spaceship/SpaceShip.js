function SpaceShip(url) {
    let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
    PIXI.Sprite.call(this, texture);
    this.position.x = 200;
    this.position.y = 300;
    this.anchor.x = 1;
    this.anchor.y = 0.5;
}
SpaceShip.prototype = Object.create(PIXI.Sprite.prototype);