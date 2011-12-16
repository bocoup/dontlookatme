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
    boazPoints =   [
         {x: 0, y: 20},
         {x: 0, y: 0},
         {x: 60, y: 0},
         {x: 60, y: 20}
       ];
    //   restitution: 0,
    //   type: 'static'
    // });


    world.camera({x:0, y:0});
    world.scale(5);

    function generateInclineBlockThingyOmg( width, height ){
      var points = [],
          addPoint = function(x,y){
            points.push( { x: x, y: y } );
          }
          // sry, no sleep so fuck it
          maxWidth = 15,
          minWidth = 10,
          maxHeight = 6,
          minHeight = 3,
          ohshit = 2000,
          x = width,
          y = 0-height,
          generated = false,
          // falseIsX
          onX = true;

      // add starting "point"
      addPoint( x, y );
      console.log( x, y );
      console.log( x, y );
      // addPoint(x, y );
      
      while ( !generated && ohshit-- ) {
        if ( onX ) {
          x -= ~~( Math.random() * (maxWidth-minWidth)) + minWidth;
        } else {
          y += ~~( Math.random() * (maxHeight-minHeight)) + minHeight;
        }
        onX = !onX;
        addPoint( x, y );
        if ( !onX && x < ( maxWidth + minWidth ) ) {
          generated = true;
        }
        console.log( "X: %d Y: %d", x, y );
      }

      // create last, top-right point
      addPoint( 0, 0 );

      // fill in the big block
      // bottom right
      addPoint( width, 0 );
      console.log( x, 0 );
      return points;
    }

    world.createEntity({
      name: 'terrain',
      type: 'static',
      color: 'black',
      shape: 'polygon',
      x: 0,
      y: 90,
      //points: boazPoints
      points: generateInclineBlockThingyOmg( 30, 30 )
    });
    console.dir( world );

  }
}( this, this.dlam, this.boxbox ));
