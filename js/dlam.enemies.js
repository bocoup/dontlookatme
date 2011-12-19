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
        // Add back for boulder enemies
        // image: 'img/boulder-'+ Math.floor(Math.random() * 100) % 4 +'.png',
        color: 'd6364e',
        shape: 'circle',
        density: 110
      });
      
      enemCache.push( enemy );
      return enemy;
    });
    
    var score = 0;

    setInterval(function(){
      for( var enemy in enemCache ) {
        if( !dlam.player._destroyed && dlam.player.position().x > ( enemCache[ enemy ].position().x + 2)) {
          score++;
          var scoreElem = document.querySelector("#score");
          var scoreString = score + (score > 1 ? " points" : " point");
          scoreElem.innerHTML = scoreString;
          scoreElem.href = "http://twitter.com/intent/tweet?source=webclient&text=I%20just%20scored%20" + scoreString + "%20in%20Don't%20Look%20At%20Me%3A%20http%3A%2F%2Fdontlookatme.maryrosecook.com";
          delete enemCache[ enemy ];
        }
      }
    }, 100);
    
  }
}( this, this.dlam, this.boxbox ));