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

    var terrainSpawner = new dlam.Spawner(200, 40, function() {
      var obstacleX = dlam.world.camera().x + 420;
      // The Y position where we will spawn the obstacle
      var obstacleY = dlam.world.camera().y + 70;
      // The X position of the camera's bucket
      var cameraX = Math.floor( dlam.world.camera().x / 100 );

      var obstacle = dlam.world.createEntity({
        name: 'obstacle',
        x: obstacleX,
        y: obstacleY,
        width: Math.random() * 15,
        height: Math.random() * 15,
        fixedRotation: false,
        friction: .1,
        restitution: 0,
        color: 'black',
        shape: 'square', //Math.random() > 0.5 ? 'triangle' :
        density: 10
      });

      return obstacle;
    });
  }
}( this, this.dlam, this.boxbox ));
