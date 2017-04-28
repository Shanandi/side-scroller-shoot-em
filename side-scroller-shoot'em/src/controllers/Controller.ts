class Controller {
    protected stage: PIXI.Container;
    protected selectedOption: string = '';
    protected stopped: boolean = false;
    protected background: PIXI.Sprite;
    private isOver: boolean = false;

    constructor(stage) {
        this.stage = stage;
    }

    update() { }

    over() {
        while (this.stage.children.length > 0) {
            let element = this.stage.children[0];
            this.stage.removeChildAt(0);
            element.destroy();
        }
        this.isOver = true;
    }

    getSelectedOption = function () {
        return this.selectedOption;
    }
}