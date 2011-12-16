document.addEventListener("DOMContentLoaded", function() {

  dlam.canvas = document.getElementById('myface');

  dlam.world = boxbox.createWorld(dlam.canvas, {
    debugDraw:false,
    gravity: 40
  });

  dlam.player();
  dlam.enemies();
    
}, false);
    
