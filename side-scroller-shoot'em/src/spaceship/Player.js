function Player() {
    SpaceShip.call(this, 'ship');
    this.position.x = 70;
    this.position.y = CANVAS_Y / 2;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}
Player.prototype = Object.create(SpaceShip.prototype);