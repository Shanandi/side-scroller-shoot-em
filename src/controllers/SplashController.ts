module SpaceShooter {
    export class SplashController extends Controller {
        private _filter;

        public constructor(stage: PIXI.Container) {
            super(stage);
            this._background = PIXI.Sprite.fromImage('../../resources/images/far.png');
            this._stage.addChild(this._background);

            this._selectedOption = 'menu';
            this._stopped = true;

            let animation: Animation = new Animation();
            this._stage.addChild(animation);

            animation.onComplete = () => {
                let text: DecoratedText = new DecoratedText('GeoCat Technologies');
                text.position.set(CANVAS_X / 2, CANVAS_Y / 1.4);
                this._stage.addChild(text);
            };

            setTimeout(() => {
                this._filter = new PIXI.filters.ColorMatrixFilter();
                this._stage.filters = [this._filter];
                this._stage.removeChild(animation);
                this._stopped = false;
            }, 2000);

            setTimeout(() => { this.over(); }, 3000);
        }

        public update(): void {
            if (!this._stopped) {
                this._filter.matrix[3] -= 0.15;
                this._filter.matrix[7] -= 0.15;
                this._filter.matrix[11] -= 0.15;
            }
        }
    }
}