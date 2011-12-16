document.addEventListener("DOMContentLoaded", function() {
    
    var canvas = document.getElementById('myface');
    
    var world = boxbox.createWorld(canvas, {debugDraw:false});
    
    var player = world.createEntity({
        name: 'player',
        x: .5,
        y: 12,
        height: .2,
        width: .2,
        fixedRotation: true,
        friction: .3,
        restitution: 0,
        color: 'blue'
    });

    
}, false);