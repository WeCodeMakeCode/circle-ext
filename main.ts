
//% weight=100 color=#008080 icon="\uf0c7"
//% groups=["Create", "Properties", "Actions"]
namespace circle {
    //% group="Create" weight=100
    //% block="create circle of radius %radius and color $color || fill=$filled"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% filled.defl=false
    export function createCircleSprite(radius: number, color: number, filled:boolean = false): Circle {
        return new Circle(radius, color, filled)
    }
    //% group="Create" weight=90
    //% block="destroy  %circle=variables_get(myCircle)""
    export function destroy(circle:Circle) {
        circle.destroy()
    }
    //% group="Create" weight=80
    //% blockSetVariable=myCircleList
    //% block="empty circle list"
    export function emptyCircleList(){
        return new CircleList()
    }
}
//% blockNamespace=circle
class CircleList{
    _circles: Circle[] = []
    constructor(){
        
    }
    //% group="Actions" weight=80
    //% block="%myCircleList add %value=variables_get(myCircle) to end"
    addCircleToEnd (value:Circle ){
        this._circles[this._circles.length] = value
    }
    //% group="Actions" weight=80
    //% blockSetVariable="myCircle"
    //% block="%myCircleList get and remove last circle"
    getAndRemoveLast():Circle {
        let tmp: Circle = this._circles[this._circles.length - 1]
        this._circles.removeAt(this._circles.length - 1)
        return tmp
    }
    //% group="Actions" weight=80
    //% block="%myCircleList remove and destroy last circle"
    removeAndDestroyLast(){
        let tmp = this.getAndRemoveLast()
        tmp.destroy()
    }
    //% group="Actions" weight=80
    //% blockSetVariable="myCircle"
    //% block="%myCircleList get and remove first circle"
    getAndRemoveFirst():Circle {
        let tmp: Circle = this._circles[0]
        this._circles.removeAt(0)
        return tmp
    }
    //% group="Actionst" weight=80
    //% block="%myCircleList remove and destroy first circle"
    removeAndDestroyFirst(){
        let tmp = this.getAndRemoveFirst()
        tmp.destroy()
    }   
    
    //% group="Properties" weight=80
    //% block="%myCircleList length"
    length(): number {
        return this._circles.length
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
            this.imageWH = 2 * (this._radius + 2);
            this.centerXY = this.imageWH / 2;
            this._img = image.create(this.imageWH, this.imageWH);
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
            if (this._filled) {
                this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
            }
            this._sprite = sprites.create(this._img);
        }
        //% group="Properties" weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="sprite"
        get circle(): Sprite {
            return this._sprite;
        }
        //% group="Properties"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="color"
        get color(): number {
            return this._color;
        }
        //% group="Properties"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="color"
        set color(value: number) {
            this._color = value;
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
        }
        //% group="Properties"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius"
        get radius(): number {
            return this._radius;
        }
        //% group="Properties"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="Fill Color
        get fillColor() {
            return this._fillColor;
        }
        //% group="Actions" weight=90
        //% block="fill %Circle(myCircle) with color $color"
        fill(color: number) {
            this._filled = true;
            this._fillColor = color;
            this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
        }
        //% group="Actions" weight=90
        //% block="erase fill from %Circle(myCircle)"
        unfill() {
            this._filled = false;
            this._fillColor = 0;
            this._img.fill(0);  //clear anything in image
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
        }
        destroy(){
            if(this._sprite != null){
                this._sprite.destroy()
            }
        }

    }
