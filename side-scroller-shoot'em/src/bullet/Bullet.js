function Bullet(rotation, position) {
    let texture = PIXI.Texture.fromImage('../resources/bullet.png');
    PIXI.Sprite.call(this, texture);
    this.position.x = position.x;
    this.position.y = position.y;
    this.rotation = rotation;
}
Bullet.prototype = Object.create(PIXI.Sprite.prototype);