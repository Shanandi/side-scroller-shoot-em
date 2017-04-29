///<reference path="../resources/pixi.js.d.ts" />

declare const CANVAS_X = 800;
declare const CANVAS_Y = 600;
declare const SPEED = 5;

class Main extends PIXI.Application {
    public view;
    public controller;
    public ticker;
    public stage: PIXI.Container;
    public renderer;

    constructor() {
        super();
        document.body.appendChild(this.view);

        this.controller = this.getNextController('init');
        this.ticker.add(this.update.bind(this));
    }

    update(delta) {
        this.controller.update();

        if (this.controller.isOver) {
            this.controller = this.getNextController(this.controller.getSelectedOption());
        }

        if (!this.controller) {
            this.ticker.stop();
        }
    }

    getNextController(selectedOption) {
        this.stage.filters = [];
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
    }
}