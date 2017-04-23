function ParticleCollection() {
    PIXI.particles.ParticleContainer.call(this, 20);
};
ParticleCollection.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);