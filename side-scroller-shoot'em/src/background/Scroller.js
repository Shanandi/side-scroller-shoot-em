class Scroller {
    constructor(stage) {
        this.far = new FarBackground();
        this.mid = new MidBackground();
        stage.addChild(this.far);
        stage.addChild(this.mid);

        this.viewportX = 0;
    }

    setViewportX(viewportX) {
        this.viewportX = viewportX;
        this.far.setViewportX(viewportX);
        this.mid.setViewportX(viewportX);
    }

    getViewportX() {
        return this.viewportX;
    }
}