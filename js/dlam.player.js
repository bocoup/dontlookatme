(function( global, dlam, boxbox ) {
  dlam.player = function(){

    var player = dlam.player = dlam.world.createEntity({
        name: 'player',
        x: 100,
        y: 80,
        radius: 1,
        fixedRotation: true,
        friction: 2,
        restitution: 0,
        color: 'blue',
        shape: 'circle',
        density: 0
    });

    player.health = 100;
    player.points = 0;

    player.onKeydown(function( e ){

      var key = global.keyDecode( e );
      var movementForce = 600;
      var impulseForce = 300;
      var lastJump = Date.now();

      if( key === 'right' ) {
        this.setForce( 'movement', movementForce, 1 * movementForce, 0);
      }

      if( key === 'left' ) {
        this.setForce( 'movement', movementForce, -1 * movementForce, 0);
      }

      if( this.contact && this.jumps < 2 ) {

        if( key === 'up' || key === 'space' ) {
          this.jumps++
          this.applyImpulse( impulseForce, 0);
        }
      }

    });

    player.onKeyup(function( e ){
      player.clearForce( 'movement' );
    });

    player.onStartContact(function( e ){
      this.contact = true;
      this.jumps = 0;

    });

    player.onFinishContact(function( e ){
      this.contact = false;
    });

    player.onImpact(function( entity, force, friction ){
      if( force > 81110 && entity._ops.type !== 'static' && entity.name !== 'obstacle'){
        player.health-50
        console.log(player.health)
        if ( player.health > 0) {

          player.destroy()
        }
      }
    })

  }
}( this, this.dlam, this.boxbox ));