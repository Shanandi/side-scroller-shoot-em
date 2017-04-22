function Player() {
    SpaceShip.call(this, 'ship');
    this.position.x = 200;
    this.position.y = 300;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}
Player.prototype = Object.create(SpaceShip.prototype);