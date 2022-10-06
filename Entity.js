//Create Entity
export const EntityRect = ({ name = undefined, x, y, w = 50, h = 50, stage, debug = false }) => {
    //Id entity
    const id = (+new Date()) + (Math.random() * 100000000 | 0);

    // Graphics 
    let graphics = new createjs.Graphics();
    graphics.setStrokeStyle(1);
    graphics.beginStroke('#FFFFFF');
    graphics.beginFill('#FF0000');
    graphics.drawRect(x, y, w, h);
    // Shape
    let shape = new createjs.Shape(graphics);

    // State
    let state = {
        id: id,
        name: (name) ? name : `NPC-${id}`,
        shape: shape,
        debug: debug
    };

    //DEBUG
    if (debug) {
        console.log(`Create Entity ${state.name}`);
    }
    
    //Update
    const update = (deltatime = undefined) => {        
        // DEBUG
        if (state.debug) {
            console.log(`Update object ${state.name}`);
        }

        state.shape.y += 0.5;

    };

    //Draw
    const draw = () => {
        //DEBUG
        if (state.debug) {
            console.log(`Draw object ${state.name}`);
        }
        //
        if (stage !== null) {
            stage.addChild(state.shape);
        }
    };

    return {
        "State": state,
        "Draw": draw,
        "Update": update
    }

}

//Create Entity
export const EntityArc = ({ name = undefined, x, y, r = 50, stage, debug = false }) => {
    //Id entity
    const id = (+new Date()) + (Math.random() * 100000000 | 0);

    // Graphics 
    let graphics = new createjs.Graphics();
    graphics.setStrokeStyle(1);
    graphics.beginStroke('#FFFFFF');
    graphics.beginFill('#FF0000');
    graphics.drawCircle(x, y, r);
    // Shape
    let shape = new createjs.Shape(graphics);

    // State
    let state = {
        id: id,
        name: (name) ? name : `NPC-${id}`,
        shape: shape,
        debug: debug
    };

    //DEBUG
    if (debug) {
        console.log(`Create Entity ${state.name}`);
    }
    
    //Update
    const update = (deltatime = undefined) => {        
        // DEBUG
        if (state.debug) {
            console.log(`Update object ${state.name}`);
        }

        state.shape.y += 0.5;

    };

    //Draw
    const draw = () => {
        //DEBUG
        if (state.debug) {
            console.log(`Draw object ${state.name}`);
        }
        //
        if (stage !== null) {
            stage.addChild(state.shape);
        }
    };

    return {
        "State": state,
        "Draw": draw,
        "Update": update
    }

}
