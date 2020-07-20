
//% weight=100 color=#008080 
//% groups=[ "Create", "Properties",  "Actions"]
namespace circle {
    //% group="Create"
    //% block="destroy %circle=variables_get(myCircle)"
    export function destroy(circle:Circle) {
        circle.destroy()
    }
    //% group="Create" 
    //% block="create circle of radius %radius and color $color || fill=$filled"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% filled.defl=false
    export function createCircle(radius: number, color: number, filled:boolean = false): Circle {
        return new Circle(radius, color, filled)
    }
}
//% blockNamespace=circle
class Circle {
    _sprite: Sprite = null
    _img: Image = null
    _radius: number = 0
    _color: number = 0
    _fillColor: number = 0
    _filled: boolean = false
    _dataText:string = ""
    _dataNumber:number = 0
    imageWH: number = 0
    centerXY:number = 0
    constructor(radius: number, color: number, filled: boolean = false) {
        this._radius = radius
        this._color = color
        this._fillColor = 0;
        this._dataText = ""
        this._dataNumber =0
        this._filled = filled
        this._fillColor =  this._color
        this.imageWH = 2 * (this._radius + 2)
        this.centerXY = this.imageWH / 2
        this._img = image.create(this.imageWH, this.imageWH)
        this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color)
        if (this._filled) {
            this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
        }
        this._sprite = sprites.create(this._img)
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="data text"
    get datatext(): string {
        return this._dataText;
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="data text"
    set datatext(value: string) {
        this._dataText = value;
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="data number"
    get dataNumber(): number {
        return this._dataNumber;
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="data number"
    set dataNumber(value: number) {
        this._dataNumber = value;
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="color"
    get color(): number {
        return this._color;
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="color"
    set color(value: number) {
        this._color = value;
        this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="radius"
    get radius(): number {
        return this._radius;
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="fill color"
    set fillColor(value: number) {
        this._fillColor = value;
        this._img.drawCircle(this.centerXY, this.centerXY, this._radius, this._color);
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="fill color"
    get fillColor() {
        return this._fillColor;
    }

    //% group="Properties"
    //% blockSetVariable="myCircle"
    //% blockCombine block="sprite"
    get sprite(): Sprite {
        return this._sprite;
    }
    //% group="Actions" 
    //% block="fill %Circle(myCircle) || with color $color"
    fill(color: number = -1 ){
        this._filled = true
        if (color == -1)
        {
            this._fillColor = this._color
        } else {
            this._fillColor = color
        }
        this._img.fillCircle(this.centerXY, this.centerXY, this._radius, this._fillColor)
    }
    //% group="Actions" 
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
//% weight=100 color=#008080 
//% groups=["List", "List Beginning", "List Middle", "List End"]
namespace circlelist {
    //% group="Create" weight=90
    //% blockSetVariable=myCircleList
    //% block="empty circle list"
    export function emptyCircleList(){
        return new CircleList()
    }
}
//% blockNamespace=circlelist
class CircleList{
    _circles: Circle[] = []
    constructor(){
    }

     //% group="List" 
    //% block=" reverse %myCircleList"
    reverse (){
        this._circles.reverse()
    }
    //% group="List" 
    //% block="%myCircleList find index of %value=variables_get(myCircle)"
    findIndexOfCircle (value:Circle ):number{
        for(let i = 0; i < this.length(); i++) {
            if (value == this._circles[i]) return i
        }
        return -1
    }
    //% group="List" 
    //% block="length of array %myCircleList"
    length(): number {
        return this._circles.length
    }
    /*
        beginning
    */
    //% group="List Beginning" 
    //% block="%myCircleList remove and destroy first circle"
    removeAndDestroyFirst(){
        if(this.length() > 0){
            let tmp = this._circles.removeAt(0)
            tmp.destroy()
        }
    }  
    //% group="List Beginning" 
    //% block="get and remove first circle from %myCircleList"
    getAndRemoveFirst():Circle {
        if(this.length() > 0){
            return this._circles.removeAt(0)
        }
        return null;
    }

    //% group="List Beginning" 
    //% block="%myCircleList insert %value=variables_get(myCircle) at beginning"
    insertCircleToBeginning (value:Circle ){
        this._circles.unshift(value) 
        this._circles.insertAt(0, null)
    }
    /*
        middle
    */
    //% group="List Middle" 
    //% block="%myCircleList remove and destroy circle at %index"
    removeAndDestroyCircleAt(index:number){
        if(this.length() > 0)
        {
            let tmp = this._circles.removeAt(index)
            tmp.destroy()
        }
    }
    //% group="List Middle" 
    //% block="%myCircleList get and remove circle at %index"
    getAndRemoveCircleAt(index:number):Circle {
        if(this.length() > 0)
        {
            return this._circles.removeAt(index)
        }
        return null
    }
    //% group="List Middle" 
    //% block="%myCircleList get circle with sprite %mySprite"
    getCircleWithSprite(s:Sprite):Circle {
        for(let i = 0; i < this.length(); i++) {
            if(this._circles[i].sprite == s) return this._circles[i]  
        }
        return null
    }
    //% group="List Middle" 
    //% block="%myCircleList get circle at %index"
    getCircleAt(index:number):Circle {
        if(index < this.length() )
        {
            return this._circles[index]
        }
        return null
    }
    //% group="List Middle" 
    //% block="%myCircleList set circle at %index to %value=variables_get(myCircle)"
    setCircleAt (index:number , value:Circle){
         if(index < this.length()){
            this._circles[index] = value;
         }
    }
    //% group="List Middle" 
    //% block="%myCircleList insert %value=variables_get(myCircle) at %index"
    insertCircleAt (value:Circle , index:number){
        this._circles.insertAt(index, value)
    }
    /*
        end
    */
    //% group="List End"
    //% block="%myCircleList remove and destroy last circle"
    removeAndDestroyLast(){
        if(this.length() > 0)
        {
            let tmp = this._circles.removeAt(this.length()-1)
            tmp.destroy()
        }
    }
    //% group="List End" 
    //% block="get and remove last circle from %myCircleList"
    getAndRemoveLast():Circle {
        if(this.length() > 0){
            return this._circles.removeAt(this.length()-1)
        }
        return null;
    }

    //% group="List End" 
    //% block="%myCircleList add %value=variables_get(myCircle) to end"
    addCircleToEnd (value:Circle ){
        this._circles.push(value)
    }
}

