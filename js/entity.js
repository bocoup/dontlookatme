document.addEventListener("DOMContentLoaded", function() {
    
    var canvas = document.getElementById('myface');
    
    var world = boxbox.createWorld(canvas, {debugDraw:false});
    
    var player = world.createEntity({
        name: 'player',
        x: .5,
        y: 12,
        radius: .4,
        fixedRotation: true,
        friction: .3,
        restitution: 0,
        color: 'blue',
        shape: 'circle'
    });

    world.createEntity({
      x: 0,
      y: 14,
      width: 20,
      height: .2,
      type: 'static'
    });

    player.onKeydown(function( e ){

      var key = keyDecode( e );
      var movementForce = 50;
      
      if( key === 'right' ) {
        this.setForce( 'movement', movementForce, 90);
      }

      if( key === 'left' ) {
        this.setForce( 'movement', movementForce, 270);
      }

      if( key === 'down' ) {
        this.setForce( 'movement', movementForce, 180);
      }

      if( this.contact ) {
        
        if( key === 'up' ) {
          this.applyImpulse( 10, 0);
        }

        if( key === 'space' ) {
          this.applyImpulse( 10, 0);
        }

      }
      
    });
    
    player.onKeyup(function( e ){
      this.clearForce( 'movement' );
    });
    
    player.onStartContact(function( e ){
      console.log('start')
      this.contact = true;
      
    });
    
    player.onFinishContact(function( e ){
      console.log('stop')
      this.contact = false;
    });
    
    

}, false);