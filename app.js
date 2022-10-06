let stage = new createjs.Stage('canvas1');
let fps = new createjs.Text("none", "12px Arial", "#0000ff");

const CANVA_HEIGHT = (stage.canvas.height / 2);
const CANVA_WITDH = (stage.canvas.width / 2);

let spacePressed = false;

class Bird {
    constructor(x, y, w, h) {
        this.rect = new createjs.Rectangle(x, y, w, h);
        this.graphics = new createjs.Graphics();
        this.graphics.setStrokeStyle(1);
        this.graphics.beginStroke('#FFFFFF');
        this.graphics.beginFill('#FF0000');
        this.graphics.drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        //velocity
        this.vy = 0;
        this.weight = 1;

        this.shape = new createjs.Shape(this.graphics);
    }
    //   
    update() {
        if (this.shape.y > stage.canvas.height - (this.rect.height * 3)) {
            this.shape.y = stage.canvas.height - (this.rect.height * 3);
            this.rect.y = stage.canvas.height - this.rect.height;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.rect.y += this.vy;
            this.shape.y += this.vy;
        }
        //
        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }
        //        
        if(spacePressed)this.flap();
    }
    //
    draw(stage) {
        stage.addChild(this.shape);
    }    
    //
    flap() {
       this.vy -= 2;       
    }          
}

//key event
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') spacePressed = true;
});

//key event
window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') spacePressed = false;
});


const bird = new Bird(stage.canvas.width / 2, 5, 10, 10);
//const bird2 = new Bird(stage.canvas.width - 100, 5, 10, 10);

function init() {
    //add fps
    fps.setTransform(10, 10, 1, 1);
    stage.addChild(fps);



}


//ticker
createjs.Ticker.addEventListener("tick", handlerTick);
function handlerTick(event) {
    if (!event.paused) {
        //fps
        fps.text = `FPS:${event.delta.toFixed(2)}`;

        bird.update();
        bird.draw(stage);
       


        
        stage.update();
    }
}

//IFFE
(() => {


    //init  
    init();

})();