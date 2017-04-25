function MenuController(stage, renderer, statusText) {
    Controller.call(this, stage);
    this.selectedOption = 'game1';
    let background = new PIXI.Sprite.fromImage('../../resources/images/far.png');
    this.stage.addChild(background);

    let text = new DecoratedText(statusText);
    text.position.set(CANVAS_X - 200, 100);
    this.stage.addChild(text);

    this.renderer = renderer;
    setTimeout(function () {
        this.over();
    }.bind(this), 3000);
};
MenuController.prototype = Object.create(Controller.prototype);