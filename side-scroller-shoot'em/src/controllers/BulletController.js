function BulletController() {
    this.bullets = [];
};

BulletController.prototype.add = function (bullet) {
    this.bullets.push(bullet);
};

BulletController.prototype.getPositions = function () {
    let positions = [];
    this.bullets.forEach(bullet => {
        positions.push({
            x: bullet.position.x,
            y: bullet.position.y
        });
    });
    return positions;
};

BulletController.prototype.moveBullets = function () {
    this.bullets.forEach(bullet => {
        bullet.position.x += Math.cos(bullet.rotation) * SPEED;
        bullet.position.y += Math.sin(bullet.rotation) * SPEED;
    });
};