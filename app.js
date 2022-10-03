let stage = new createjs.Stage('canvas1');
let circle = new createjs.Shape();

let fps = new createjs.Text("none", "20px Arial", "#ffffff");

function init(){
    circle.graphics.beginStroke("white").beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    circle.x = 100;
    circle.y = 100;
    
    fps.setTransform(10,10,1,1);
    
    
    stage.addChild(circle);
    stage.addChild(fps);

}

createjs.Ticker.addEventListener("tick", handlerTick);
function handlerTick(event){
    if(!event.paused){
        //fps
        fps.text = `FPS:${event.delta.toFixed(2)}`;

        //console.log(event.delta);
        circle.x += 0.03 * event.delta;
        stage.update();
    }
}

//IFFE
(()=>{


   //init  
   init();

})();