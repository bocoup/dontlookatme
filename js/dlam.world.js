(function( global, dlam, boxbox ) {
  dlam.world = function(){

    var world = dlam.world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 100
    });
    world.camera({x:-3, y:4});
    world.scale(5);
        
    var worldWidth = 11000;
    var worldHeight = 100;
    
    // Create the world
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
    });
    
    // update camera position every draw
     world.onRender(function(ctx) {
       var player = dlam.player;
       var p = player.position();
       var c = this.camera();
       this.camera({x: player.position().x - 100, y: player.position().y - 70});
    });

    // Terrain generation
    
    // The global store of obstacles
    var obstacles = global.obstacles = {};

    setInterval(function(){
      // The X position where we will spawn the obstacle
      var obstacleX = dlam.world.camera().x + 420;
      // The Y position where we will spawn the obstacle
      var obstacleY = dlam.world.camera().y + 70;
      // The X position of the camera's bucket
      var cameraX = Math.floor( dlam.world.camera().x / 100 );
      // The bucket of x space where in which we will throttle the spwaning
      // of obstacles
      var curBucket = Math.floor( obstacleX / 100);

      // If the curBucket of obstacles is null initalize
      // it to an array
      if ( ! obstacles[ curBucket ] ) {
        obstacles[ curBucket ] = [];
      }
      
      // If there are less than 20 obstacles in the current bucket
      // spawn an obstacle. This is our throttling mechanism.
      if ( obstacles[ curBucket ].length < 20 ) {
        var obstacle = dlam.world.createEntity({
          name: 'obstacle',
          x: obstacleX,
          y: obstacleY,
          width: Math.random() * 5,
          height: Math.random() * 5,
          fixedRotation: false,
          friction: 10,
          restitution: 0,
          color: 'black',
          shape: 'square', //Math.random() > 0.5 ? 'triangle' :
          density: 10
        });
      }
      
      // Push each obstacle onto an array held at each bucket
      // so they can be deleted later
      obstacles[ curBucket ].push( obstacle );
      
      // Iterate over all of the 
      for( var key in obstacles ){
        if( key < (curBucket - 5) ) {


            for( var i in obstacles[ key ] ){

//                console.log(obstacles[ key ][ i ])
                obstacles[ key ][ i ].destroy();
                delete obstacles[ key ][ i ];

            }

        }
      }
      
    }, 300);

  }
}( this, this.dlam, this.boxbox ));
