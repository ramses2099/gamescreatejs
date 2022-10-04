let stage = new createjs.Stage('canvas1');
let fps = new createjs.Text("none", "20px Arial", "#ffffff");

//using LoadQueue load images
let queue = new createjs.LoadQueue();
queue.addEventListener("complete", onComple);
queue.loadManifest([
    { id: 'butterfly', src: './images/butterfly001.png' }
]);
function onComple() {
    console.log('all files loaded');
}

let square = null;
let circle = null;
let direction = 1;
let speed = 0.50;

function init() {
    fps.setTransform(10, 10, 1, 1);
    stage.addChild(fps);

    // objects
    let g = new createjs.Graphics();
    g.beginStroke('#FFFFFF');
    g.beginFill('#FF0000');
    g.drawRect(0,0,50,50);
        
    square = new createjs.Shape(g);
    square.x = square.y = 100;
    stage.addChild(square);
    // objects

    // objects
    let rect = new createjs.Shape();
    rect.graphics.beginStroke('#FFFFFF');
    rect.graphics.beginFill('#00FF00');
    rect.graphics.drawRect(0,0,50,50);
    rect.x = 60;
    rect.y = 100;
    stage.addChild(rect);
    createjs.Tween.get(rect).to({rotation:360},3000);
    // objects


    circle = new createjs.Shape();
    circle.graphics.beginStroke('#FFFFFF');
    circle.graphics.beginFill('#FFF000');
    circle.graphics.drawCircle(0,0,20);
    circle.x = 300;
    circle.y = 300;
    stage.addChild(circle);

    
}
//
function updateCircle(){
    let nextX = circle.x + (speed * direction);
    if(nextX > stage.canvas.width - circle.radius){
        nextX = stage.canvas.width - circle.radius
        direction *= -1;
    }else if(nextX < circle.radius){
        nextX = circle.radius;
        direction *= -1;
    }
    circle.nextX = nextX;
}
//
function renderCircle(){
    circle.x = circle.nextX;
}



//
createjs.Ticker.addEventListener("tick", handlerTick);
function handlerTick(event) {
    if (!event.paused) {
        //fps
        fps.text = `FPS:${event.delta.toFixed(2)}`;

        updateCircle();
        renderCircle();

        //
        square.y += 0.5;

        stage.update();
    }
}

//IFFE
(() => {


    //init  
    init();

})();