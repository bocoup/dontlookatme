(function( global, dlam, boxbox ) {
  dlam.world = function(){

    var world = dlam.world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 40
    });
    
    // create incline/mountain thingy
     var groundTemplate = {
        name: 'ground',
        type: 'static',
        height: 1,
        width: 1,
        color: 'green'
    };

    // dlam.world.createEntity({
    //   name: 'terrain',
    //   shape: 'polygon',
    //   x: 0,
    //   y: 14,
    //   points: [
    //     {x: 0, y: 0},
    //     {x: 0, y: -1},
    //     {x: 60, y: -16},
    //     {x: 60, y: -1}
    //   ],
    //   restitution: 0,
    //   type: 'static'
    // });


    world.camera({x:0, y:0});
    world.scale(20);

    function generateInclineBlockThingyOmg( width, height ){
      var points = [],
          addPoint = function(x,y){
            points.push( { x: x, y: y } );
          }
          // sry, no sleep so fuck it
          maxWidth = 20,
          minWidth = 10,
          maxHeight = 10,
          minHeight = 4,
          ohshit = 2000,
          x = 0,
          y = height/2,
          generated = false,
          // falseIsX
          onX = true;

      // add starting "point"
      addPoint(x,y);
      
      while ( !generated && ohshit-- ) {
        if ( onX ) {
          x += ~~( Math.random() * (maxWidth-minWidth)) + minWidth;
        } else {
          y -= ~~( Math.random() * (maxHeight-minHeight)) + minHeight;
        }
        onX = !onX;
        addPoint( x, y );
        if ( !onX && x > ( width - maxWidth + minWidth )) {
          generated = true;
        }
        console.log( "X: %d Y: %d", x, y );
      }

      // create last, top-right point
      //addPoint( x, y );

      // fill in the big block
      // bottom right
      addPoint( x, height );
      addPoint( 0, height );

      return points;
    }

    world.createEntity({
      name: 'terrain',
      type: 'static',
      color: 'black',
      shape: 'polygon',
      x: 0,
      y: 0,
      points: generateInclineBlockThingyOmg( 0, 0 )
    });

  }
}( this, this.dlam, this.boxbox ));