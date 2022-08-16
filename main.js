let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth- 100;
canvas.height = window.innerHeight- 100;

let dino = {
    x: 100,
    y: 200,
    width: 50,
    height: 50,
    speed: 2,
    draw: function() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// let obstacle = {
//     x: canvas.height-100,
//     y: 200,
//     width: 50,
//     height: 50,
//     speed: 10,
//     draw: function() {
//         ctx.fillStyle = 'red';
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }
class Obstacle {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
        this.speed = 1;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


let obstacles = [];
let timer = 0;


function runByEachFrame() {
    requestAnimationFrame(runByEachFrame);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 360 === 0){
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
    }

    obstacles.forEach((o) => {
        //delete obstacle if it is out of the screen
        if(o.x < -o.width){
            obstacles.splice(obstacles.indexOf(o), 1);
        }
        //collision detection
        collisionDetection(o,dino);
        o.x -= o.speed;
        o.draw();
    })

    //jump dino by frame if space is pressed
    if(jumping){
        dino.y -= dino.speed;
        //if reached the top of the screen, stop jumping
        if(dino.y < 0){
            jumping = false;
        }
    }
    //if not jumping, fall down till reach the starting position
    else{
        if(dino.y > 200){
            dino.y = 200;
        }
        dino.y += dino.speed;
    }

    dino.draw();

}

//collision detection
function collisionDetection(obstacle,dino){
    obstacles.forEach((o) => {
        if(dino.x < o.x + o.width && dino.x + dino.width > o.x && dino.y < o.y + o.height && dino.y + dino.height > o.y){
            console.log('collision');
            //game over if collision detected
            gameOver();

        }
    }
    )
}
//game over function shows game over message and stops the game
function gameOver(){
    ctx.font = '50px Arial';
    ctx.fillText('Game Over', canvas.width/2-150, canvas.height/2);
    cancelAnimationFrame(runByEachFrame);
}

let jumping = false;
//event listener for spacebar
document.addEventListener('keydown', function(event){
    if(event.code === 'Space'){
        jumping = true;
    }
})

runByEachFrame();


