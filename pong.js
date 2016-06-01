// ******************************************************************
// MAIN
// ******************************************************************

// Starts game
var startGame = function() {
  document.getElementById('canvas-here').appendChild(canvas);
  myReq = animate(step);
} // startGame()

// Ends the game when the page is switched
var endGame = function() {
  unAnimate(myReq);
  document.removeChild(getElementById('canvas-here'));
  resetGame();
  return true;
}

// Resets ball and player positions
var resetGame = function() {
  ball.resetPosition();
  player.resetPosition();
  computer.resetPosition(); 
}

// 2-D canvas
var canvas = document.createElement('canvas');
var width = 800;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

// ******************************************************************
// ANIMATION & UPDATING
// ******************************************************************

// Request variable to be used with cancelAnimationFrame
var myReq;

// Animates window at 30 FPS
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/30) };

// Stops animation
var unAnimate = function(myReq) {
  window.cancelAnimationFrame(myReq) ||
  window.mozCancelAnimationFrame;
}

var step = function() {
  update();
  render();
  myReq = animate(step);
}

// Updates position of player, computer, and ball
var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

// Renders board and player,computer,ball positions on board
var render = function() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
}

// ******************************************************************
// PADDLE
// ******************************************************************

// Paddle object constructor
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}
// Adds render function to Paddle constructor
Paddle.prototype.render = function() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
};
Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  // At top of screen
  if (this.y < 0) {
    this.y = 0;
    this.y_speed = 0;
  }
  // Bottom of screen
  else if (this.y + this.height > 400) {
    this.y = 400 - this.height;
    this.y_speed = 0;
  }
};
Paddle.prototype.resetPosition = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
};

// ******************************************************************
// PLAYER
// ******************************************************************

// Player object -- has a Paddle object
function Player() {
  this.paddle = new Paddle(20, 175, 10, 50)
}
Player.prototype.render = function() {
  this.paddle.render();
};
Player.prototype.update = function() {
  for (var key in keysDown) {
    var value = Number(key);
    // Up arrow
    if (value == 38)
      this.paddle.move(0, -4);
    // Down arrow
    else if (value == 40)
      this.paddle.move(0, 4);
    else
      this.paddle.move(0, 0);
  }
};
Player.prototype.resetPosition = function() { this.paddle.resetPosition(20, 175, 10, 50)};

// ******************************************************************
// COMPUTER
// ******************************************************************

// Computer-Player object -- has a Paddle object
function Computer() {
  this.paddle = new Paddle(760, 175, 10, 50)
}
Computer.prototype.render = function() {
  this.paddle.render();
};
Computer.prototype.update = function(ball) {
  // Distance from center y-pos to ball y-pos
  var y_pos = ball.y;
  var paddle_center = this.paddle.y + (this.paddle.height / 2);
  var dist = paddle_center - y_pos;
  
  if (dist < 0 && dist < -4) {
    // Ball is below paddle entirely
    dist = 4;
  }
  else if (dist > 0 && dist > 4) {
    // Ball is above paddle entirely
    dist = -4;
  }
  
  this.paddle.move(0, dist);
  // At top of screen
  if (this.y < 0)
    this.y = 0;
  // Bottom of screen
  else if (this.y + this.height > 400)
    this.y = 400 - this.height;
}
Computer.prototype.resetPosition = function() { this.paddle.resetPosition(760, 175, 10, 50) };

// ******************************************************************
// BALL
// ******************************************************************

// Ball object
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = -3;
  this.y_speed = 0;
  this.radius = 5;
}
Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};
Ball.prototype.update = function(paddle1, paddle2) {
  // Move x,y position based on speed
  this.x += this.x_speed;
  this.y += this.y_speed;
  
  // Boundaries of the ball w/ radius 5
  var left_x = this.x - 5;
  var right_x = this.x + 5;
  var bottom_y = this.y + 5;
  var top_y = this.y - 5;
  
  // Hitting top or bottom of screen
  if (this.y - 5 < 0) {
    this.y = 5;
    this.y_speed = -this.y_speed;
  }
  else if (this.y + 5 > 400) {
    this.y = 395;
    this.y_speed = -this.y_speed;
  }
  
  // Point is scored, reset
  if (this.x < 0 || this.x > 800) {
    this.x_speed = 3;
    this.y_speed = 0;
    this.x = 400;
    this.y = 200;
  }
  
  // Left paddle collision checking
  if (left_x < 400) {
    if (left_x < (paddle1.x + paddle1.width) &&
        right_x > paddle1.x && top_y > paddle1.y &&
        bottom_y < (paddle1.y + paddle1.height)) {
          this.x_speed = 3;
          this.y_speed += (paddle1.y_speed / 2);
          this.x += this.x_speed;
    }
  }
  // Right paddle collision checking
  else {
    if (right_x > paddle2.x &&
        left_x < paddle2.x && top_y > paddle2.y &&
        bottom_y < (paddle2.y + paddle2.height)) {
          this.x_speed = -3;
          this.y_speed += (paddle2.y_speed / 2);
          this.x += this.x_speed;
    } 
  }
};
Ball.prototype.resetPosition = function() { 
  this.x = 400; this.y = 200; this.x_speed = 3; this.y_speed = 0; 
};

// ******************************************************************
// CONTROL HANDLING
// ******************************************************************

var keysDown = {};
window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
  switch(event.keyCode) {
    case 38: case 40: event.preventDefault(); break;
    default: break;
  }
});
window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

// ******************************************************************
// OBJECTS DECLARATIONS
// ******************************************************************

var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 200);
