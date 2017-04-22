function EnemyController() {
    this.collection = [];
    Controller.call();
};
EnemyController.prototype = Object.create(Controller.prototype);