function Main() {
    let canvas = document.getElementById('game-canvas');
    canvas.width = CANVAS_X;
    canvas.height = CANVAS_Y;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(CANVAS_X, CANVAS_Y, { view: canvas });

    this.scroller = new Scroller(this.stage);
    this.controller = new Controller(this.stage, this.renderer);

    this.stage.interactive = true;

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    this.scroller.setViewportX();
    this.controller.update();
    this.renderer.render(this.stage);

    if (!this.controller.gameOver) {
        requestAnimationFrame(this.update.bind(this));
    } else {
        // TODO: game over screen
    }
};