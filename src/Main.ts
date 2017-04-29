///<reference path="../resources/pixi.js.d.ts" />

class Main extends PIXI.Application {
    private _controller: Controller = null;

    constructor() {
        super();
        document.body.appendChild(this.view);

        this._controller = this.getNextController('init');
        this.ticker.add(this.update.bind(this));
    }

    update(): void {
        this._controller.update();

        if (this._controller.isOver) {
            this._controller = this.getNextController(this._controller.selectedOption);
        }

        if (!this._controller) {
            this.ticker.stop();
        }
    }

    getNextController(selectedOption: string): Controller {
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