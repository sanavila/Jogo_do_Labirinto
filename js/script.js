(function () {
    var canvas = document.querySelector("canvas");
    var renderContext = canvas.getContext("2d");

    var width = canvas.width, height = canvas.height;

    var left = 37, up = 38, right = 39, down = 40;
    var moveLeft = moveUp = moveRight = moveDown = false;

    var tileSize = 32;
    var player = {
        x: tileSize + 2,
        y: tileSize + 2,
        width: 28,
        heigth: 28,
        speed: 2
    };

    var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e) {
        var key = e.keyCode;
        switch(key){
            case left:
                moveLeft = true;
                break;
            case up:
                moveUp = true;
                break;
            case right:
                moveRight = true;
                break;
            case down:
                moveDown = true;
                break;
        }
    };
    function keyupHandler(e) {
        var key = e.keyCode;
        switch(key){
            case left:
                moveLeft = false;
                break;
            case up:
                moveUp = false;
                break;
            case right:
                moveRight = false;
                break;
            case down:
                moveDown = false;
                break;
        }
    }
    // Update game elements
    function update() {
        if(moveLeft && !moveRight) {
            player.x -= player.speed;
        } else if(moveRight && !moveLeft) {
            player.x += player.speed;
        }
        if(moveUp && !moveDown) {
            player.y -= player.speed;
        } else if(moveDown && !moveUp) {
            player.y += player.speed;
        }
    }
    // draw the elements
    function render () {
        renderContext.clearRect(0, 0, width, height);
        renderContext.save();
        for(var i in maze){
            for(var j in maze[i]){
                var tile = maze[i][j];
                if (tile === 1){
                    var x = j*tileSize;
                    var y = i*tileSize;
                    renderContext.fillRect(x,y,tileSize,tileSize);
                }
            }
        }
        renderContext.fillStyle = "#00f";
        renderContext.fillRect(player.x,player.y,player.width,player.heigth);
        renderContext.restore();
    }
    function loop () {
        update();
        render();
        requestAnimationFrame(loop, canvas);
    }
    requestAnimationFrame(loop, canvas);
}());
