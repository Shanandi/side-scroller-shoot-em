function MidBackground() {
    Background.call(this, 'mid');
}
MidBackground.prototype = Object.create(Background.prototype);
MidBackground.prototype.offset = 1.28;