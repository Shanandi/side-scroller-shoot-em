function Main() {
    let canvas = document.getElementById('game-canvas');
    canvas.width = CANVAS_X;
    canvas.height = CANVAS_Y;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(CANVAS_X, CANVAS_Y, { view: canvas });
    this.controller = this.getNextController('init');

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    this.controller.update();
    this.renderer.render(this.stage);

    if (this.controller.isOver) {
        this.controller = this.getNextController(this.controller.getSelectedOption());
    }

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.getNextController = function (selectedOption) {
    switch (selectedOption) {
        case 'init':
            return new SplashController(this.stage);
        case 'new_game':
            return new MenuController(this.stage, 'New\nGame');
        case 'game1':
        case 'game2':
        case 'game3':
            return new GameController(this.stage, this.renderer);
        case 'exit':
            console.log('EXITING');
            return;
    }
};