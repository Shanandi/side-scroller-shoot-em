function Player() {
    MovingObject.call(this, 'player');
    this.position.x = 70;
    this.position.y = CANVAS_Y / 2;
};
Player.prototype = Object.create(MovingObject.prototype);