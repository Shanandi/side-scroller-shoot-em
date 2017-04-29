///<reference path="../resources/pixi.js.d.ts" />

module SpaceShooter {
    export const CANVAS_X = 800;
    export const CANVAS_Y = 600;
    export const SPEED = 5;
    export const SHORT_EXPLOSION_LENGTH = 600;
    export const LONG_EXPLOSION_LENGTH = 2500;
    export const COLLISION_TOLERANCE = 30;
    export const CANVAS_OFFSET = 100;
    export const PARTICLE_COUNT = 2000;

    export class Main extends PIXI.Application {
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
}