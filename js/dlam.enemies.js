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
    
    var obstacles = [];

    setInterval(function(){
      var obstacle = dlam.world.createEntity({
        name: 'obstacle',
        x: dlam.world.camera().x + 310,
        y: 60,
        width: Math.random() * 5,
        height: Math.random() * 5,
        fixedRotation: false,
        friction: 10,
        restitution: 0,
        color: 'black',
        shape: 'square', //Math.random() > 0.5 ? 'triangle' :
        density: 10
      });
      
      obstacles.push( obstacle )
      
    }, 300);
  }
}( this, this.dlam, this.boxbox ));