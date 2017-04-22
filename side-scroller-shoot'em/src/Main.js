const SPEED = 5;

function Main() {
    let canvas = document.getElementById('game-canvas');
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, { view: canvas });
    this.scroller = new Scroller(this.stage);
    this.player = new SpaceShip('ship');
    this.stage.addChild(this.player);

    this.stage.interactive = true;

    this.stage.on("mousedown", function (e) {
        this.shoot(this.player.rotation, {
            x: this.player.position.x + Math.cos(this.player.rotation) * 20,
            y: this.player.position.y + Math.sin(this.player.rotation) * 20
        });
    }.bind(this))

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    var newViewportX = this.scroller.getViewportX() + SPEED;
    this.scroller.setViewportX(newViewportX);

    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.shoot = function (rotation, startPosition) {
    var bullet = new Bullet(rotation, startPosition);
    this.stage.addChild(bullet);
    // bullets.push(bullet);
}