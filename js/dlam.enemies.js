(function( global, dlam, boxbox ) {
  dlam.enemies = function(){

    setInterval(function(){
      dlam.world.createEntity({
        name: 'player',
        x: 28,
        y: -12,
        radius: .7,
        fixedRotation: true,
        friction: 0,
        restitution: 0,
        color: 'brown',
        shape: 'circle',
        density: 2
      });

    }, 500);

  }
}( this, this.dlam, this.boxbox ));