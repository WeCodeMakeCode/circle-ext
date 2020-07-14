
//% weight=100 color=#008080 
//% groups=[ "Circle", "Circle List", "Circle List Beginning", "Circle List Middle", "Circle List End"]
namespace circle {
    //% group="Circle" weight=100
    //% block="create circle of radius %radius and color $color || fill=$filled"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% filled.defl=false
    export function createCircle(radius: number, color: number, filled:boolean = false): Circle {
        return new Circle(radius, color, filled)
    }
    //% group="Circle" weight=99
    //% block="destroy %circle=variables_get(myCircle)"
    export function destroy(circle:Circle) {
        circle.destroy()
    }
    //% group="Circle List" weight=98
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
    //% group="Circle List" weight=90
    //% block="length of array %myCircleList"
    length(): number {
        return this._circles.length
    }
    //% group="Circle List" weight=87
    //% block="%myCircleList find index of %value=variables_get(myCircle)"
    findIndexOfCircle (value:Circle ):number{
        for(let i = 0; i < this.length(); i++) {
            if (value == this._circles[i]) return i
        }
        return -1
    }
     //% group="Circle List" weight=88
    //% block=" reverse %myCircleList"
    reverse (){
        this._circles.reverse()
    }
    /*
        beginning
    */
    //% group="Circle List Beginning" weight=83
    //% block="get and remove first circle from %myCircleList"
    getAndRemoveFirst():Circle {
        if(this.length() > 0){
            return this._circles.removeAt(0)
        }
        return null;
    }
    //% group="Circle List Beginning" weight=82
    //% block="%myCircleList remove and destroy first circle"
    removeAndDestroyFirst(){
        if(this.length() > 0){
            let tmp = this.getAndRemoveFirst()
            tmp.destroy()
        }
    }  
    //% group="Circle List Beginning" weight=84
    //% block="%myCircleList insert %value=variables_get(myCircle) at beginning"
    insertCircleToBeginning (value:Circle ){
        this._circles.unshift(value) 
        this._circles.insertAt(0, null)
    }
    /*
        middle
    */
    //% group="Circle List Middle" weight=83
    //% block="%myCircleList get circle at %index"
    getCircle(index:number):Circle {
        if(index < this.length() )
        {
            return this._circles[index]
        }
        return null
    }
    //% group="Circle List Middle" weight=82
    //% block="%myCircleList get and remove circle at %index"
    getAndRemoveCircleAt(index:number):Circle {
        if(this.length() > 0)
        {
            return this._circles.removeAt(index)
        }
        return null
    }
    //% group="Circle List Middle" weight=85
    //% block="%myCircleList set circle at %index to %value=variables_get(myCircle)"
    setCircleAt (index:number , value:Circle){
         if(index < this.length()){
            this._circles[index] = value;
         }
    }
    //% group="Circle List Middle" weight=84
    //% block="%myCircleList insert %value=variables_get(myCircle) at %index"
    insertCircleAt (value:Circle , index:number){
        this._circles.insertAt(index, value)
    }
    /*
        end
    */
    //% group="Circle List End" weight=78
    //% block="get and remove last circle from %myCircleList"
    getAndRemoveLast():Circle {
        if(this.length() > 0){
            return this._circles.removeAt(this.length()-1)
        }
        return null;
    }
    //% group="Circle List End" weight=77
    //% block="%myCircleList remove and destroy last circle"
    removeAndDestroyLast(){
        if(this.length() > 0)
        {
            let tmp = this.getAndRemoveLast()
            tmp.destroy()
        }
    }
    //% group="Circle List End" weight=79
    //% block="%myCircleList add %value=variables_get(myCircle) to end"
    addCircleToEnd (value:Circle ){
        this._circles.push(value)
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
        _text:string = ""
        imageWH: number = 0;
        centerXY:number = 0;
        constructor(radius: number, color: number, filled: boolean = false) {
            this._radius = radius;
            this._color = color;
            this._fillColor = 0;
            this._text = ""
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
        //% group="Circle" weight=98
        //% blockSetVariable="myCircle"
        //% blockCombine block="sprite"
        get circle(): Sprite {
            return this._sprite;
        }
        //% group="Circle"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="color"
        get color(): number {
            return this._color;
        }
        //% group="Circle"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="color"
        set color(value: number) {
            this._color = value;
            this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
        }
        //% group="Circle"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="text"
        get text(): string {
            return this._text;
        }
        //% group="Circle"  weight=95
        //% blockSetVariable="myCircle"
        //% blockCombine block="text"
        set text(value: string) {
            this._text = value;
        }
        //% group="Circle"  weight=97
        //% blockSetVariable="myCircle"
        //% blockCombine block="radius"
        get radius(): number {
            return this._radius;
        }
        //% group="Circle"  weight=93
        //% blockSetVariable="myCircle"
        //% blockCombine block="Fill Color
        get fillColor() {
            return this._fillColor;
        }
        //% group="Circle" weight=93
        //% block="fill %Circle(myCircle) with color $color"
        fill(color: number) {
            this._filled = true;
            this._fillColor = color;
            this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
        }
        //% group="Circle" weight=93
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
