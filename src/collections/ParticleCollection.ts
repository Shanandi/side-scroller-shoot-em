class ParticleCollection extends PIXI.particles.ParticleContainer {
    private _particles: Array<PIXI.Sprite> = [];

    public constructor(position, time: number) {
        super(COUNT, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.position.set(position.x, position.y);

        this.setParticles();
        setTimeout(() => this.clear, time);
    }

    private setParticles(): void {
        for (let i: number = 0; i < COUNT; ++i) {
            let angle: number = Math.random() * Math.PI * 2,
                radius: number = Math.random() * 20 * 2;

            let sprite: PIXI.Sprite = PIXI.Sprite.fromImage('../../resources/images/explosion.png');
            sprite.anchor.set(0.5);
            sprite.position.x += radius * Math.cos(angle);
            sprite.position.y += radius * Math.sin(angle);

            this.addChild(sprite);
            this._particles.push(sprite);
        }
    }

    private clear(): void {
        while (this._particles.length > 0) {
            let particle: PIXI.Sprite = this._particles[0];
            this._particles.splice(0, 1);
            particle.destroy();
        }
        this.destroy();
    }
}