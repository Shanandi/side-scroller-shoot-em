class Button extends PIXI.Sprite {
    private _buttonTexture: PIXI.Texture = PIXI.Texture.fromImage('../../resources/images/button/button.png');
    private _buttonDownTexture: PIXI.Texture = PIXI.Texture.fromImage('../../resources/images/button/buttonDown.png');
    private _buttonOverTexture: PIXI.Texture = PIXI.Texture.fromImage('../../resources/images/button/buttonOver.png');
    private _text: string;

    public constructor(text: string, number: number = 0) {
        super();
        this.texture = this._buttonTexture;
        this.anchor.set(0.5);
        this.position.set(CANVAS_X / 2, CANVAS_Y / 2 + 50 * (number ? number : 4));

        this._text = text + (number ? number.toString() : '');
        let caption: DecoratedText = new DecoratedText(this._text, 24);
        this.addChild(caption);

        this.interactive = true;
        this.buttonMode = true;
        this.cursor = 'pointer';

        this.on('pointerdown', () => {
            this.texture = this._buttonDownTexture;
        });
        this.on('pointerout', () => {
            this.texture = this._buttonTexture;
        });
        this.on('pointerover', () => {
            this.texture = this._buttonOverTexture;
        });
    }

    public get text(): string {
        return this._text;
    }
}