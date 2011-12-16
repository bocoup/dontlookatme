(function( global, dlam, boxbox ) {
  dlam.entity = function(){
    console.log('asd')
    var world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 40
    });

    var player = world.createEntity({
        name: 'player',
        x: .5,
        y: 12,
        radius: .4,
        fixedRotation: true,
        friction: .1,
        restitution: 0,
        color: 'blue',
        shape: 'circle',
        density: 3
    });

    player.health = 100;
    player.points = 0;

    world.createEntity({
      name: 'terrain',
      shape: 'polygon',
      x: 0,
      y: 14,
      points: [
        {x: 0, y: 0},
        {x: 0, y: -1},
        {x: 60, y: -16},
        {x: 60, y: -1}
      ],
      restitution: 0,
      type: 'static'
    });

    player.onKeydown(function( e ){

      var key = keyDecode( e );
      var movementForce = 60;
      var impulseForce = 30;
      var lastJump = Date.now();

      if( key === 'right' ) {
        this.setForce( 'movement', movementForce, 90);
      }

      if( key === 'left' ) {
        this.setForce( 'movement', movementForce, 270);
      }

      if( key === 'down' ) {
        this.setForce( 'movement', movementForce, 180);
      }

      if( this.contact && this.jumps < 2 ) {

        if( key === 'up' || key === 'space' ) {
          this.jumps++
          this.applyImpulse( impulseForce, 0);
        }

      }

    });

    player.onKeyup(function( e ){
      this.clearForce( 'movement' );
    });

    player.onStartContact(function( e ){
      this.contact = true;
      this.jumps = 0;

    });

    player.onFinishContact(function( e ){
      this.contact = false;
    });

    player.onImpact(function( entity, force, friction ){
      if( force > 10 && entity.name !== 'terrain'){
        player.health--
        console.log(player.health)
      }
    })

    //Enemies

    setInterval(function(){
      world.createEntity({
        name: 'player',
        x: 28,
        y: -12,
        radius: .7,
        fixedRotation: true,
        friction: 0,
        restitution: 0,
        color: 'yello',
        shape: 'circle',
        density: 2
      });


    }, 500);
    
  }
}( this, this.dlam, this.boxbox ));