function Main() {
    PIXI.Application.call(this);
    document.body.appendChild(this.view);

    this.controller = this.getNextController('init');

    this.ticker.add(this.update.bind(this));
};
Main.prototype = Object.create(PIXI.Application.prototype);

Main.prototype.update = function (delta) {
    this.controller.update();

    if (this.controller.isOver) {
        this.controller = this.getNextController(this.controller.getSelectedOption());
    }

    if (!this.controller) {
        this.ticker.stop();
    }
};

Main.prototype.getNextController = function (selectedOption) {
    switch (selectedOption) {
        case 'init':
            return new SplashController(this.stage);
        case 'menu':
            return new MenuController(this.stage);
        case 'game1':
        case 'game2':
        case 'game3':
            return new GameController(this.stage, this.renderer);
        case 'exit':
            window.top.close();
            return;
    }
};