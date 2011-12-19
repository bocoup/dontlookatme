(function( global, dlam, boxbox ) {
  dlam.enemies = function(){

    setInterval(function(){
      dlam.world.createEntity({
        name: 'enemy',
        x: dlam.world.camera().x + 380,
        y: -12,
        radius: 2,
        fixedRotation: true,
        friction: 0,
        restitution: .7,
        color: 'brown',
        shape: 'circle',
        density: 10
      });
    }, 1500);
  }
}( this, this.dlam, this.boxbox ));