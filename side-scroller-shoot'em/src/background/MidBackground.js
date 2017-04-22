function MidBackground() {
    Background.call(this, 'mid');
    this.DELTA_X = 1.28;
}
MidBackground.prototype = Object.create(Background.prototype);