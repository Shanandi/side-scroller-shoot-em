const COUNT = 2000;

function ParticleCollection(position) {
    PIXI.particles.ParticleContainer.call(this, COUNT, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true
    });
    this.position.x = position.x;
    this.position.y = position.y;
    this.particles = [];

    this.setParticles();
    setTimeout(this.clear.bind(this), 400);
};
ParticleCollection.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);

ParticleCollection.prototype.setParticles = function () {
    for (let i = 0; i < COUNT; ++i) {
        var angle = Math.random() * Math.PI * 2;
        var radius = Math.random() * 20 * 2;

        let sprite = PIXI.Sprite.fromImage('../../resources/images/explosion.png');
        sprite.anchor.set(0.5);
        sprite.position.x += radius * Math.cos(angle);
        sprite.position.y += radius * Math.sin(angle);

        this.addChild(sprite);
        this.particles.push(sprite);
    }
};

ParticleCollection.prototype.clear = function () {
    while (this.particles.length > 0) {
        let particle = this.particles[0];
        this.particles.splice(0, 1);
        particle.destroy();
    }
    this.destroy();
};