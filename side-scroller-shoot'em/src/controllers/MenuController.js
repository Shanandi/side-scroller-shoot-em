function MenuController(stage, statusText) {
    Controller.call(this, stage);
    this.selectedOption = 'game1';
    let background = new PIXI.Sprite.fromImage('../../resources/images/far.png');
    this.stage.addChild(background);

    let text = new DecoratedText(statusText);
    text.position.set(CANVAS_X - 200, 100);
    this.stage.addChild(text);

    let gameButtons = [];
    for (let i = 1; i <= 3; ++i) {
        let button = new Button('GAME', i);
        gameButtons.push(button);
    }
    let exit = new Button('EXIT');
    gameButtons.push(exit);
    gameButtons.forEach(function (button) {
        this.stage.addChild(button);
        button.on('click', function () {
            this.selectedOption = button.text.toLowerCase();
            this.over();
        }.bind(this));
    }.bind(this));
};
MenuController.prototype = Object.create(Controller.prototype);