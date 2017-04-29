class DecoratedText extends PIXI.Text {
    constructor(text, size = 42) {
        super(text, new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: size,
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
        }));
        this.anchor.set(0.5);
    }
}