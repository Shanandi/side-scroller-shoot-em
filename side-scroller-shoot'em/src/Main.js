function Main() {
    let canvas = document.getElementById('game-canvas');
    canvas.width = CANVAS_X;
    canvas.height = CANVAS_Y;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(CANVAS_X, CANVAS_Y, { view: canvas });

    // this.scroller = new Scroller(this.stage);
    // this.controller = new Controller(this.stage, this.renderer);

    this.stage.interactive = true;

    let background = new PIXI.Sprite.fromImage('../../resources/images/far.png');
    this.stage.addChild(background);

    let animation = new Animation();
    this.stage.addChild(animation);
    animation.animationSpeed = 0.15;
    animation.play();
    var text;
    animation.onComplete = function () {
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fontWeight: 'bold',
            fill: '#ffffff', // gradient
            stroke: '#181818',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#181818',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        text = new PIXI.Text('Space Cat Works', style);
        text.anchor.set(0.5);
        text.position.set(CANVAS_X / 2, CANVAS_Y / 1.4);
        this.stage.addChild(text);
    }.bind(this);
    setTimeout(function () {
        animation.destroy();
        text.destroy();
        this.scroller = new Scroller(this.stage);
        // TODO: add animation + buttons
    }.bind(this), 2000);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    if (this.scroller) {
        this.scroller.setViewportX();
    }
    // this.controller.update();
    this.renderer.render(this.stage);

    //if (!this.controller.gameOver) {
    requestAnimationFrame(this.update.bind(this));
    //} else {
    // TODO: game over screen
    //}
};