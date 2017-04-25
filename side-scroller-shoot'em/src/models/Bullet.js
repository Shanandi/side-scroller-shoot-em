function Bullet(position) {
    MovingObject.call(this, 'bullet');
    this.position.set(position.x, position.y);
};
Bullet.prototype = Object.create(MovingObject.prototype);