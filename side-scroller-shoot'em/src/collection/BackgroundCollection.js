function Scroller(stage) {
    this.stage = stage;
    this.far = new FarBackground();
    this.stage.addChild(this.far);

    this.viewportX = 0;
};

Scroller.prototype.setViewportX = function () {
    this.viewportX += SPEED;
    this.far.setViewportX(this.viewportX);
    if (this.mid) {
        this.mid.setViewportX(this.viewportX);
    }
};

Scroller.prototype.addMidBackground = function () {
    this.mid = new MidBackground();
    this.stage.addChild(this.mid);
};