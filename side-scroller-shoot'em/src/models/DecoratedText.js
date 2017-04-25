function DecoratedText(text, size) {
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: size || 42,
        fontWeight: 'bold',
        align: 'center',
        fill: '#ffffff',
        stroke: '#111111',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#111111',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 3
    });
    PIXI.Text.call(this, text, style);
    this.anchor.set(0.5);
};
DecoratedText.prototype = Object.create(PIXI.Text.prototype);