function FarBackground() {
    Background.call(this, 'far');
}
FarBackground.prototype = Object.create(Background.prototype);
FarBackground.prototype.offset = 0.32;