//private
function hashCode(str){
    let hash = 5381, i = str.length;
    while(i) hash = (hash * 33) ^ str.charCodeAt(--i);
    return hash >>> 0;
}

function randomID(){
    return (+new Date()) + (Math.random() * 100000000 | 0) + (++randomID.nextID);
}randomID.nextID = 0;

let ECS = {}; 
ECS.Components = {};
ECS.Systems = {};

//components
ECS.Components.Health = function ( value ){
    value = value || 50;
    this.value = value;
    return this;
}
ECS.Components.Health.prototype.name = 'health';

ECS.Components.Position = function ( pos = {} ){
    this.x = pos.x || 0;
    this.y = pos.y || 0;
    return this;
}
ECS.Components.Position.prototype.name = 'position';

ECS.Components.Dimension = function ( dim = {} ){
    this.w = dim? dim.w : 50;
    this.h = dim? dim.h : 50;
    return this;
}
ECS.Components.Dimension.prototype.name = 'dimension';

ECS.Components.Shape = function ( type ){
    this.type = type || 'fillRect';
    return this;
}
ECS.Components.Shape.prototype.name = 'shape';

ECS.Components.FillStyle  = function ( color ){
    this.style =  color? color : '#ffffff';
    return this;
}
ECS.Components.FillStyle.prototype.name = 'fillStyle';

//components

//entity
ECS.Entity = function(name="", comList = null){
    this.id = randomID();
    this.name = (name != null )? name : `NPC-${this.id}`;
    this.active = true;
    this.com = {};
    console.log('Create enttiy : %s', this.name);
    if(comList)this.addByArray(comList);
    return this;
}
//
ECS.Entity.prototype.getCom = function (){    
    return this.com;
}   
//
ECS.Entity.prototype.getComByName = function (name){    
    return this.com[name];
} 
//
ECS.Entity.prototype.addCom = function (c){    
    this.com[c.name] = c;
    console.log('Entity.addCom Component : %s ', c.name);
    return this;
}   
//
ECS.Entity.prototype.addByArray = function(arr){
    for (let i = 0; i < arr.length; i++) {
        let c = arr[i];
        this.addCom( c );            
    }
    return this;
}
//
ECS.Entity.prototype.removeCom = function(name){       
    if(this.com[name]){
        delete this.com[name];
        console.log('Entity.removeCom name : ', name);
    }else{
        console.log('Entity.removeCom name not found : ', name);
    }
    return this;
}

//systems

ECS.Systems.Render = function(ctx, entities){
    for (const key in entities) {
        if (Object.hasOwnProperty.call(entities, key)) {
            let entity = entities[key];
            let shape = entity.getComByName('shape');
            //shape
            if(shape){
               let pos =  entity.getComByName('position');
               let dim =  entity.getComByName('dimension');
               let fstyle = entity.getComByName('fillStyle');            
               //
               ctx.beginPath();               
               
               switch (shape.type) {
                case 'fillRect':
                    ctx.fillStyle = fstyle.style;
                    ctx.fillRect(pos.x, pos.y, dim.w, dim.h);
                    break;
                case 'strokeRect':
                    ctx.strokeStyle = fstyle.style;                  
                    ctx.strokeRect(pos.x, pos.y, dim.w, dim.h);
                    break;
                    //arc(x, y, radius, startAngle, endAngle)
                case 'arc':
                    ctx.strokeStyle = fstyle.style;                  
                    ctx.arc(pos.x, pos.y, dim.w,0, 2 * Math.PI);
                    
                    if(dim.h == 0){                        
                        ctx.fillStyle = fstyle.style;
                        ctx.fill();
                    }else{
                        ctx.strokeStyle = fstyle.style;    
                        ctx.stroke();
                    }
                    break;
                default:
                    break;
               }
               //
               ctx.closePath();

            }
            
        }
    }

}



//systems



export { ECS };