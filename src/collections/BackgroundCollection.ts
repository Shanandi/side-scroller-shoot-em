class BackgroundCollection {
    private stage: PIXI.Container;
    private far: FarBackground = new FarBackground();
    private mid: MidBackground = new MidBackground();
    private viewportX = 0;

    constructor(stage) {
        this.stage = stage;
        this.stage.addChild(this.far);
        this.stage.addChild(this.mid);
    }

    setViewportX = function () {
        this.far.setViewportX();
        this.mid.setViewportX();
    }
}