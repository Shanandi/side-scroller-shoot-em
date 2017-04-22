function EnemyController() {
    this.enemies = [];
};

EnemyController.prototype.add = function (enemy) {
    this.enemies.push(enemy);
};

EnemyController.prototype.getPositions = function () {
    let positions = [];
    this.enemies.forEach(enemy => {
        positions.push({
            x: enemy.position.x,
            y: enemy.position.y
        });
    });
    return positions;
};

EnemyController.prototype.moveEnemies = function () {
    this.enemies.forEach(enemy => {
        enemy.position.x += Math.cos(enemy.rotation) * SPEED;
        enemy.position.y += Math.sin(enemy.rotation) * SPEED;
    });
};