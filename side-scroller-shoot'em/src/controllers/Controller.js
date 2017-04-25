function Controller(stage) {
    this.stage = stage;
    this.isOver = false;
};

Controller.prototype.update = function () { };

Controller.prototype.over = function () {
    while (this.stage.children.length > 0) {
        let element = this.stage.children[0];
        this.stage.removeChildAt(0);
        element.destroy();
    }
    this.isOver = true;
};

Controller.prototype.getSelectedOption = function () {
    return this.selectedOption;
};