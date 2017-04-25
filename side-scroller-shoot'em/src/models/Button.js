function Button(text, number) {
    this.buttonTexture = PIXI.Texture.fromImage('../../resources/images/button/button.png');
    this.buttonDownTexture = PIXI.Texture.fromImage('../../resources/images/button/buttonDown.png');
    this.buttonOverTexture = PIXI.Texture.fromImage('../../resources/images/button/buttonOver.png');
    this.text = text + (number ? number : '');

    PIXI.Sprite.call(this, this.buttonTexture);
    this.anchor.set(0.5);
    this.position.set(CANVAS_X / 2, CANVAS_Y / 2 + 50 * (number ? number : 4));
    let caption = new DecoratedText(this.text, 24);
    this.addChild(caption);
    this.interactive = true;
    this.buttonMode = true;
    this.cursor = 'pointer';

    this.on('pointerdown', function () {
        this.texture = this.buttonDownTexture;
    }.bind(this));
    this.on('pointerout', function () {
        this.texture = this.buttonTexture;
    }.bind(this));
    this.on('pointerover', function () {
        this.texture = this.buttonOverTexture;
    }.bind(this));
};
Button.prototype = Object.create(PIXI.Sprite.prototype);