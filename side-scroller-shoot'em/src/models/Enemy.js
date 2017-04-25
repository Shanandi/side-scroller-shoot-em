function Enemy() {
    MovingObject.call(this, 'enemy');
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = CANVAS_X + 80;
    this.position.y = Math.floor(Math.random() * CANVAS_Y);
    this.moveCounter = 0;
    this.rotation = Math.PI;
};
Enemy.prototype = Object.create(MovingObject.prototype);

Enemy.prototype.rotate = function () {
    if (!(this.moveCounter % 20)) {
        var rand = Math.random() - 0.5;
        this.rotation = this.rotation + rand;
    }
};