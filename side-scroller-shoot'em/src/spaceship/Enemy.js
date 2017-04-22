function Enemy() {
    SpaceShip.call(this, 'enemy');
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = CANVAS_X + 80;
    this.position.y = Math.floor(Math.random() * CANVAS_Y);
    this.moveCounter = 0;
    this.rotation = Math.PI;
};
Enemy.prototype = Object.create(SpaceShip.prototype);

Enemy.prototype.getRotation = function () {
    if (!(this.moveCounter % 15)) {
        var rand = Math.floor(Math.random() * 4);
        console.log(rand);
    }
};