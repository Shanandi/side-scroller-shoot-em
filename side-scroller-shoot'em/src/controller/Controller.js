const TOLERANCE = 30;
function Controller(stage, renderer) {
    this.stage = stage;
    this.bulletCollection = new BulletCollection(this.stage);
    this.enemyCollection = new EnemyCollection(this.stage);
    this.player = new Player();
    this.stage.addChild(this.player);

    this.timer = setInterval(this.enemyCollection.add.bind(this.enemyCollection), 2000);

    this.stage.on('mousedown', function (e) {
        let position = {
            x: this.player.position.x + Math.cos(this.player.rotation) * 60,
            y: this.player.position.y + Math.sin(this.player.rotation) * 60
        };
        this.bulletCollection.add(this.player.rotation, position);
    }.bind(this));

    this.stage.on('mousemove', function (e) {
        this.player.move(
            renderer.plugins.interaction.mouse.global.x,
            renderer.plugins.interaction.mouse.global.y
        );
    }.bind(this));
};

Controller.prototype.checkCollision = function () {
    let enemies = this.enemyCollection.getItems(),
        bullets = this.bulletCollection.getItems(),
        eIndex = 0;

    while (eIndex < enemies.length) {
        let bIndex = 0;
        while (bIndex < bullets.length) {
            if (this.checkPosition(bullets[bIndex], enemies[eIndex])) {
                this.propagateExplosion([
                    enemies[eIndex].position,
                    bullets[bIndex].position
                ]);
                this.enemyCollection.remove(eIndex);
                this.bulletCollection.remove(bIndex);
                break;
            } else {
                ++bIndex;
            }
        }
        if (enemies[eIndex] && this.checkPosition(this.player, enemies[eIndex])) {
            this.propagateExplosion([
                enemies[eIndex].position,
                this.player.position
            ]);
            this.gameOver = true;
            break;
        }
        ++eIndex;
    }
};

Controller.prototype.update = function () {
    this.bulletCollection.moveSprites();
    this.enemyCollection.moveSprites();
    this.checkCollision();
};

Controller.prototype.checkPosition = function (spriteA, spriteB) {
    let rectA = spriteA.getBounds(),
        rectB = spriteB.getBounds(),
        x1 = rectA.x, x2 = rectB.x,
        y1 = rectA.y, y2 = rectB.y,
        w1 = rectA.width - TOLERANCE, w2 = rectB.width - TOLERANCE,
        h1 = rectA.height - TOLERANCE, h2 = rectB.height - TOLERANCE;
    if ((x1 + w1 > x2) && (x1 < x2 + w2) && (y1 + h1 > y2) && (y1 < y2 + h2)) {
        return true;
    }
    return false;
};

Controller.prototype.propagateExplosion = function (positions) {
    positions.forEach(function (position) {
        let particleCollection = new ParticleCollection(position);
        this.stage.addChild(particleCollection);
    }, this);
};