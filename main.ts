//% weight=100 color=#008080
//% groups='["Create", "Properties, "Actions"]'
namespace circle {
    //% group="Create"
    //% block="create circle of radius %radius and color $color || filled=false"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% filled.defl=false
    export function createCircleSprite(radius: number, color: number, filled:boolean = false): Circle {
        return new Circle(radius, color, filled)
    }
    class Circle {
        _sprite: Sprite = null;
        _img: Image = null;
        _radius: number = 0;
        _color: number = 0;
        _fillColor: number = 0;
        _filled: boolean = false;
        constructor(radius: number, color: number, filled: boolean = false) {
            this._radius = radius;
            this._color = color;
            this._fillColor = 0;
            this._filled = filled;
            this.doImage();
            this._sprite = sprites.create(this._img);
        }
        private doImage() {
            this._img = image.create(2 * this._radius + 1, 2 * this._radius + 1);
            this._img.drawCircle(this._radius, this._radius, this._radius, this._color);
            if (this._filled) {
                this._img.fillCircle(this._radius, this._radius, this._radius, this._color)
            }
        }
        //% group="Properties"
        get circle(): Sprite {
            return this._sprite;
        }
        //% group="Properties"
        get imaage(): Image {
            return this._img;
        }
        //% group="Properties"
        //% blockSetVariable="myCircle"
        //% blockCombine block="color""
        get color(): number {
            return this._color;
        }
        //% group="Properties"
        //% blockSetVariable="myCircle"
        //% blockCombine block="color""
        set color(value: number) {
            this._color = value;
        }
        //% group="Properties"
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius""
        get radius(): number {
            return this._radius;
        }
        //% group="Properties"
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius"
        set radius(value: number) {
            this._radius = value;
        }
        //% group="Properties"
        //% blockSetVariable="myCircle"
        //% blockCombine block="Fill Color"
        get fillColor() {
            return this._fillColor;
        }
        //% group="Actions"
        //% block="fill $myCircle with color $color"
        //% color.shadow="colorNumberPicker"
        fill(color: number) {
            this._filled = true;
            this._fillColor = color;
            this.doImage();
        }
        //% group="Actions"
        //% block="erase fill from $myCircle"
        unfill() {
            this._filled = false;
            this._img.fillCircle(this._radius, this._radius, this._radius, 0)
        }
    }
}
