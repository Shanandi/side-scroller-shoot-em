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
        var enemy = this.enemyCollection.getModelAt(eIndex);
        while (bIndex < bullets.length) {
            var bullet = this.bulletCollection.getModelAt(bIndex);
            if (this.checkPosition(bullet, enemy)) {
                enemy.propagateExplosion(this.stage);
                this.enemyCollection.remove(eIndex);
                this.bulletCollection.remove(bIndex);
                break;
            } else {
                ++bIndex;
            }
        }
        enemy = this.enemyCollection.getModelAt(eIndex);
        if (enemy && this.checkPosition(this.player, enemy)) {
            enemy.propagateExplosion(this.stage);
            this.player.propagateExplosion(this.stage);
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