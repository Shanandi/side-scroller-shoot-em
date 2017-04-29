function MenuController(stage) {
    Controller.call(this, stage);
    this.selectedOption = 'game1';
    this.stopped = false;
    this.background = new FarBackground();
    this.stage.addChild(this.background);

    let title = new DecoratedText('Amazing Space Shooter');
    title.position.set(CANVAS_X / 2, 50);
    this.stage.addChild(title);

    let logo = new Player();
    logo.position.set(CANVAS_X / 2, 200);
    this.stage.addChild(logo);

    this.timer = setInterval(function () {
        logo.rotation += Math.PI / 12;
    }.bind(this), 100);

    this.addButtons();
};
MenuController.prototype = Object.create(Controller.prototype);

MenuController.prototype.addButtons = function () {
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
            clearInterval(this.timer);
            this.stopped = true;
            this.over();
        }.bind(this));
    }.bind(this));
};

MenuController.prototype.update = function () {
    if (!this.stopped) {
        this.background.setViewportX();
    }
};