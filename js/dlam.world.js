(function( global, dlam, boxbox ) {
  dlam.world = function(){

    var world = dlam.world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 100
    });
    world.camera({x:-3, y:4});
    world.scale(5);

/*
    world.createEntity({
        name: 'circle',
        shape: 'square',
        radius: 112,
        type: 'static',
        x: 434,
        y: -43,
        density: .5,
        image: '/dontlookatme/bocoup-604.png',
        imageStretchToFit: false
    });
*/
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
    
    var worldWidth = 11000;
    var worldHeight = 100;

    world.createEntity({
      name: 'terrain',
      type: 'static',
      color: 'black',
      shape: 'polygon',
      restitution: 0,
      x: 0,
      y: 90,
      points: [
           {x: 0, y: worldHeight},
           {x: 0, y: 10},
           {x: worldWidth, y: -1200},
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
