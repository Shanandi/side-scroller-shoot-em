function Animation() {
    let textureArray = [];
    for (let i = 0; i < 7; i++) {
        let texture = PIXI.Texture.fromImage('../../resources/images/animation/geo' + i + '.png');
        textureArray.push(texture);
    };
    PIXI.extras.AnimatedSprite.call(this, textureArray.reverse());
    this.loop = false;
    this.anchor.set(0.5);
    this.scale.set(0.4);
    this.position.set(CANVAS_X / 2, CANVAS_Y / 2.5);
    this.animationSpeed = 0.15;
    this.play();
};
Animation.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);