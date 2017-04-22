function Scroller(stage) {
    this.far = new FarBackground();
    this.mid = new MidBackground();
    stage.addChild(this.far);
    stage.addChild(this.mid);

    this.viewportX = 0;
}

Scroller.prototype.setViewportX = function (viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function () {
    return this.viewportX;
};