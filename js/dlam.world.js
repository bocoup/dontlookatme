(function( global, dlam, boxbox ) {
  dlam.world = function(){

    var world = dlam.world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 100
    });
    
    // create incline/mountain thingy
     var groundTemplate = {
        name: 'ground',
        type: 'static',
        height: 1,
        width: 1,
        color: 'green',
        restitution: 0,
        density: 100
    };

    // dlam.world.createEntity({
    //   name: 'terrain',
    //   shape: 'polygon',
    //   x: 0,
    //   y: 14,
    boazPoints =   [
         {x: 0, y: 20},
         {x: 0, y: 10},
         {x: 190, y: 0},
         {x: 190, y: 20},
         {x: 30, y: 20}
       ];
    //   restitution: 0,
    //   type: 'static'
    // });


    world.camera({x:-3, y:4});
    world.scale(5);

    function generateInclineBlockThingyOmg( width, height ){
      var points = [],
          addPoint = function(x,y){
            points.push( { x: x, y: y } );
          },
          // sry, no sleep so fuck it
          maxWidth = 15,
          minWidth = 10,
          maxHeight = 6,
          minHeight = 3,
          ohshit = 2000,
          x = 0,
          y = height,
          generated = false,
          onX = false;

      addPoint( width, height );
      addPoint( 0, height );
      
      while ( !generated && ohshit-- ) {
        if ( onX ) {
          x += ~~( Math.random() * (maxWidth-minWidth)) + minWidth;
          y -=.4
        } else {
          y -= ~~( Math.random() * (maxHeight-minHeight)) + minHeight;
        }
        onX = !onX;
        if ( !onX && x > width ) {
          generated = true;
        }
        addPoint( x, y );
      }
            
      for (var i = 0; i < points.length; i++) {
        console.log(points[i].x + "," + points[i].y)
      }
      return points;
    }
    
    var worldWidth = 1000;
    var worldHeight = 100;

    world.createEntity({
      name: 'terrain',
      type: 'static',
      color: 'black',
      shape: 'polygon',
      x: 0,
      y: 90,
      points: [
           {x: 0, y: worldHeight},
           {x: 0, y: 10},
           {x: worldWidth, y: -200},
           {x: worldWidth, y: worldHeight},
           {x: 30, y: worldHeight}
         ]
      //      generateInclineBlockThingyOmg( 130, 30 )
    });
    
    // update camera position every draw
     world.onRender(function(ctx) {
       var player = dlam.player;
       var p = player.position();
       var c = this.camera();
       this.camera({x: player.position().x - 100, y: player.position().y - 70});
    });

  }
}( this, this.dlam, this.boxbox ));
