function ParticleCollection(position) {
    PIXI.particles.ParticleContainer.call(this, 20);
    this.position.x = position.x;
    this.position.y = position.y;

    for (let i = 0; i < 20; ++i) {
        const sprite = PIXI.Sprite.fromImage('../resources/explosion.png');
        this.addChild(sprite);
    }
    console.log(this);
};
ParticleCollection.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);