(function( global, dlam, boxbox ) {
  var Spawner = function(interval, maxPerBucket, spawnFn) {
    this.spawnFn = spawnFn;
    this.maxPerBucket = maxPerBucket;
    this.buckets = {};

    var self = this;
    setInterval(function() {
      self.update();
    }, interval);
  }

  Spawner.prototype = {
    update: function() {
      var curBucket = this.getCurrentBucket();

      // If the curBucket of obstacles is null initalize
      // it to an array
      if ( ! this.buckets[ curBucket ] ) {
        this.buckets[ curBucket ] = [];
      }

      if ( this.buckets[ curBucket ].length < this.maxPerBucket ) {
        var obj = this.spawnFn();
        // Push each obstacle onto an array held at each bucket
        // so they can be deleted later
        this.buckets[ curBucket ].push( obj );

        this.reap();
      }
    },

    getCurrentBucket: function() {
      return Math.floor( dlam.world.camera().x / 100)
    },

    reap: function() {
      var curBucket = this.getCurrentBucket();
      // Iterate over all of the buckets
      for( var key in this.buckets ){
        // If the the current bucket we are looking at is more than
        // 5 buckets behind
        if( key < (curBucket - 4) ) {
          // Iterate over the obstacles in that bucket
          for( var i in this.buckets[ key ] ){
            // And destroy it
            this.buckets[ key ][ i ].destroy();
            // And delete it from the bucket
            delete this.buckets[ key ][ i ];
          }
        }
      }
    }
  }

  dlam.Spawner = Spawner;
}( this, this.dlam, this.boxbox ));