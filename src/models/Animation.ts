class Animation extends PIXI.extras.AnimatedSprite {
    public constructor() {
        let textureArray: Array<PIXI.Texture> = [];
        for (let i: number = 0; i < 7; i++) {
            let texture: PIXI.Texture = PIXI.Texture.fromImage('../../resources/images/animation/geo' + i + '.png');
            textureArray.push(texture);
        };
        super(textureArray.reverse());
        this.loop = false;
        this.anchor.set(0.5);
        this.scale.set(0.4);
        this.position.set(CANVAS_X / 2, CANVAS_Y / 2.5);
        this.animationSpeed = 0.15;
        this.play();
    }
}