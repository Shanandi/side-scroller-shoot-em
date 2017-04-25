function SplashController(stage) {
    Controller.call(this, stage);
    this.selectedOption = 'menu';
    let background = new PIXI.Sprite.fromImage('../../resources/images/far.png');
    this.stage.addChild(background);

    let animation = new Animation();
    this.stage.addChild(animation);

    animation.onComplete = function () {
        let text = new DecoratedText('GeoCat Technologies');
        text.position.set(CANVAS_X / 2, CANVAS_Y / 1.4);
        this.stage.addChild(text);
    }.bind(this);

    setTimeout(function () {
        this.over();
    }.bind(this), 2000);
};
SplashController.prototype = Object.create(Controller.prototype);