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

// Player
function Player() {
    MovingObject.call(this, 'player');
    this.position.x = 70;
    this.position.y = CANVAS_Y / 2;
};
Player.prototype = Object.create(MovingObject.prototype);

// Enemy
function Enemy() {
    MovingObject.call(this, 'enemy');
    this.position.x = CANVAS_X + 80;
    this.position.y = Math.floor(Math.random() * CANVAS_Y);
    this.rotation = Math.PI;
};
Enemy.prototype = Object.create(MovingObject.prototype);

Enemy.prototype.rotate = function () {
    if (!(this.moveCounter % 20)) {
        var rand = Math.random() - 0.5;
        this.rotation = this.rotation + rand;
    }
};

// Bullet
function Bullet(position) {
    MovingObject.call(this, 'bullet');
    this.position.set(position.x, position.y);
};
Bullet.prototype = Object.create(MovingObject.prototype);