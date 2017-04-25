function DecoratedText(text) {
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 42,
        fontWeight: 'bold',
        align: 'center',
        fill: '#ffffff', // gradient
        stroke: '#181818',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#181818',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
    });
    PIXI.Text.call(this, text, style);
    this.anchor.set(0.5);
};
DecoratedText.prototype = Object.create(PIXI.Text.prototype);