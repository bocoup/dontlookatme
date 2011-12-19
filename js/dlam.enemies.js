(function( global, dlam, boxbox ) {
  dlam.enemies = function(){

    setInterval(function(){
      var enemy = dlam.world.createEntity({
        name: 'enemy',
        x: dlam.world.camera().x + 380,
        y: dlam.world.camera().y -12,
        radius: Math.random() * 15,
        fixedRotation: true,
        friction: 0,
        restitution: .7,
        color: 'brown',
        shape: 'circle',
        density: 110
      });
    }, 1000);
  }
}( this, this.dlam, this.boxbox ));