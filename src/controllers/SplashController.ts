class SplashController extends Controller {
    protected selectedOption = 'menu';
    protected stopped = true;
    protected background = PIXI.Sprite.fromImage('../../resources/images/far.png');
    private filter;

    constructor(stage) {
        super(stage);
        this.stage.addChild(this.background);

        let animation = new Animation();
        this.stage.addChild(animation);

        animation.onComplete = function () {
            let text = new DecoratedText('GeoCat Technologies');
            text.position.set(CANVAS_X / 2, CANVAS_Y / 1.4);
            this.stage.addChild(text);
        }.bind(this);

        setTimeout(function () {
            this.filter = new PIXI.filters.ColorMatrixFilter();
            this.stage.filters = [this.filter];
            this.stage.removeChild(animation);
            this.stopped = false;
        }.bind(this), 2000);

        setTimeout(function () {
            this.over();
        }.bind(this), 3000);
    }

    update() {
        if (!this.stopped) {
            this.filter.matrix[3] -= 0.15;
            this.filter.matrix[7] -= 0.15;
            this.filter.matrix[11] -= 0.15;
        }
    };
}