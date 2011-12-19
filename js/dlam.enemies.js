(function( global, dlam, boxbox ) {
  dlam.enemies = function(){
    var enemCache = [];
    var enemySpawner = new dlam.Spawner(100, 2, function() {
      var enemy = dlam.world.createEntity({
        name: 'enemy',
        x: dlam.world.camera().x + 380,
        y: dlam.world.camera().y -12,
        radius: Math.random() * 15,
        fixedRotation: true,
        friction: 0,
        restitution: .7,
        image: 'img/boulder-'+ Math.floor(Math.random() * 100) % 4 +'.png',
        shape: 'circle',
        density: 110
      });
      
      enemCache.push( enemy );
      return enemy;
    });
    
    var score = 0;

    setInterval(function(){
      for( var enemy in enemCache ) {
        if( dlam.player.position().x > ( enemCache[ enemy ].position().x + 2)) {
          score++;
          document.querySelector("#score").innerHTML = score;
          delete enemCache[ enemy ];
        }
      }
    }, 100);
    
  }
}( this, this.dlam, this.boxbox ));