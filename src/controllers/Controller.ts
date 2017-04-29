module SpaceShooter {
    export class Controller {
        protected _stage: PIXI.Container = null;
        protected _background = null;
        protected _selectedOption: string = '';
        protected _stopped: boolean = false;
        protected _timer: number = null;
        private _isOver: boolean = false;

        public constructor(stage) {
            this._stage = stage;
        }

        public update(): void { }

        protected over(): void {
            while (this._stage.children.length > 0) {
                let element: PIXI.DisplayObject = this._stage.children[0];
                this._stage.removeChildAt(0);
                element.destroy();
            }
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._isOver = true;
        }

        // public getter setters
        public get selectedOption(): string {
            return this._selectedOption;
        }

        public get isOver(): boolean {
            return this._isOver;
        }
    }
}