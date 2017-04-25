function Bullet(rotation, position) {
    MovingObject.call(this, 'bullet');
    this.position.x = position.x;
    this.position.y = position.y;
    this.rotation = rotation;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};
Bullet.prototype = Object.create(MovingObject.prototype);