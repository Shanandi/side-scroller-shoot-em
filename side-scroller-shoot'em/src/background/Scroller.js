function Scroller(stage) {
    this.far = new FarBackground();
    this.mid = new MidBackground();
    stage.addChild(this.far);
    stage.addChild(this.mid);

    this.viewportX = 0;
};

Scroller.prototype.setViewportX = function () {
    this.viewportX += SPEED;
    this.far.setViewportX(this.viewportX);
    this.mid.setViewportX(this.viewportX);
};

Scroller.prototype.getViewportX = function () {
    return this.viewportX;
};