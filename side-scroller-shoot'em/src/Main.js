const SPEED = 5;

function Main() {
    let canvas = document.getElementById('game-canvas');
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, { view: canvas });
    this.scroller = new Scroller(this.stage);

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    var newViewportX = this.scroller.getViewportX() + SPEED;
    this.scroller.setViewportX(newViewportX);

    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};