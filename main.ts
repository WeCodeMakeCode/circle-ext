//% weight=100 color=#008080
//% groups='["Create", "Properties, "Actions"]'
namespace circle {
    //% group="Create" weight=99
    //% block="create circle of radius %radius and color $color || filled is $filled"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% filled.defl=false
    export function createCircleSprite(radius: number, color: number, filled:boolean = false): Circle {
        return new Circle(radius, color, filled)
    }
}
//% blockNamespace=circle 
    class Circle {
        _sprite: Sprite = null;
        _img: Image = null;
        _radius: number = 0;
        _color: number = 0;
        _fillColor: number = 0;
        _filled: boolean = false;
        imageWH: number = 0;
        centerXY:number = 0;
        constructor(radius: number, color: number, filled: boolean = false) {
            this._radius = radius;
            this._color = color;
            this._fillColor = 0;
            this._filled = filled;
            if(this._filled){
                this._fillColor =  this._color;
            }
            this.doImageAndSprite();
        }
        private doImageAndSprite() {
            if (this._img != null ){
                this._img = null;
            }
            if (this._sprite!== null){
                this._sprite.destroy();
            }
            this.imageWH = 2 * (this._radius + 2);
            this.centerXY = this.imageWH / 2;
            this._img = image.create(this.imageWH, this.imageWH);
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
            if (this._filled) {
                this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
            }
            this._sprite = sprites.create(this._img);
        }

        //% group="Properties" weight=98
        get circle(): Sprite {
            return this._sprite;
        }
        //% group="Properties" weight=98
        get imaage(): Image {
            return this._img;
        }
        //% group="Properties" weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="color""
        get color(): number {
            return this._color;
        }
        //% group="Properties" weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="color""
        set color(value: number) {
            this._color = value;
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
        }
        //% group="Properties" weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius""
        get radius(): number {
            return this._radius;
        }
        //% group="Properties" weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius"
        set radius(value: number) {
            // DO MIN AND MAX
            this._radius = value;
            this.doImageAndSprite();
        }
        //% group="Properties" weight=98
        //% weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="Fill Color"
        get fillColor() {
            return this._fillColor;
        }
        //% group="Actions" weight=97
        //% block="fill %Circle(myCircle) with color $color"
        fill(color: number) {
            this._filled = true;
            this._fillColor = color;
            this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
        }
        //% group="Actions" weight=97
        //% block="erase fill from %Circle(myCircle)"
        unfill() {
            this._filled = false;
            this._fillColor = 0;
            this._img.fillCircle(this.centerXY, this.centerXY, this._radius, 0)
        }
    }

