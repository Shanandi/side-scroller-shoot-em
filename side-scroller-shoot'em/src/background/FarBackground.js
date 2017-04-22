function FarBackground() {
    Background.call(this, 'far');
    this.DELTA_X = 0.32;
}
FarBackground.prototype = Object.create(Background.prototype);