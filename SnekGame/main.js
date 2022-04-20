var canvas = document.getElementById("canvas")
var canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/20)
}

function show(){
    update()
    draw()
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    snek.move()
    eatApple()
    checkHitWall()
}

function eatApple(){
    if(snek.tail[snek.tail.length - 1].x == apple.x && snek.tail[snek.tail.length - 1].y == apple.y){
        snek.tail[snek.tail.length] = {x:apple.x, y:apple.y}
        apple = new Apple();
    }
}

function checkHitWall(){
    let headTail = snek.tail[snek.tail.length -1 ]

    if (headTail.x == - snek.size){
        headTail.x == canvas.width - snek.size
    } else if (headTail.x == canvas.width){
        headTail.x = 0
    } else if (headTail.y == - snek.size){
        headTail.y = canvas.height - snek.size
    } else if (headTail.y == canvas.height){
        headTail.y = 0
    }
}


function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0,canvas.width, canvas.height)
    for(var i = 0; i< snek.tail.length; i++){
        createRect(snek.tail[i].x + 2.5, snek.tail[i].y + 2.5, snek.size - 5, snek.size - 5, "white")
    }
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: ", (snek.tail.length + 1), canvas.width -120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snek.rotateX != 1){
            snek.rotateX = -1
            snek.rotateY = 0;
        }else if(event.keyCode == 38 && snek.rotateY != 1){
            snek.rotateX = 0
            snek.rotateY = -1;
        }else if(event.keyCode == 39 && snek.rotateX != -1){
            snek.rotateX = 1
            snek.rotateY = 0;
        }else if(event.keyCode == 40 && snek.rotateY != -1){
            snek.rotateX = 0
            snek.rotateY = 1;
        }
    }, 1)
})


class Snek{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }

    move(){
        let newRect;

        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        this.tail.shift()
        this.tail.push(newRect)
    }
}


class Apple{
    constructor(){
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snek.size) * snek.size
            this.y = Math.floor(Math.random() * canvas.height / snek.size) * snek.size
            for(let i = 0; i< snek.tail.length; i++){
                if(this.x == snek.tail[i].x && this.y == snek.tail[i].y){
                    isTouching = true;
                }
            }
            
            this.size = snek.size
            this.color = "red"

            if(!isTouching){
                break;
            }
        }
    }
}



const snek = new Snek(20,20,20);
let apple = new Apple();

//var snek = new Snek();

//var apple = new Apple();






//function createRect(x,y,width, height, color){
  //  canvasContext.fillStyle = color
 //   canvasContext.fillRect(x,y,width,height)
//}



