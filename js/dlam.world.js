(function( global, dlam, boxbox ) {
  dlam.world = function(){

    dlam.world = boxbox.createWorld(dlam.canvas, {
      debugDraw:false,
      gravity: 40
    });

  }
}( this, this.dlam, this.boxbox ));