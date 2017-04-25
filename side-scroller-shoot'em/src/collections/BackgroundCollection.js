function BackgroundCollection(stage) {
    this.stage = stage;
    this.far = new FarBackground();
    this.mid = new MidBackground();
    this.stage.addChild(this.far);
    this.stage.addChild(this.mid);

    this.viewportX = 0;
};

BackgroundCollection.prototype.setViewportX = function () {
    this.far.setViewportX();
    this.mid.setViewportX();
};