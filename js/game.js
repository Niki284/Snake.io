const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "../client/img/ground.png";

var foodImg = [];
foodImg[0] = new Image();
foodImg[1] = new Image();
foodImg[2] = new Image();

foodImg[0].src = '../client/img/peer.png'
foodImg[1].src = '../client/img/banaan.png'
foodImg[2].src = '../client/img/kers.png'
let box = 32;




let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
	Img: foodImg[Math.floor(Math.random() * 3)]
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if (event.keyCode == 37 && dir != "right")
		dir = "left";
	else if (event.keyCode == 38 && dir != "down")
		dir = "up";
	else if (event.keyCode == 39 && dir != "left")
		dir = "right";
	else if (event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);

	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(food.Img, food.x, food.y);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "lightgreen";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "31202B";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		if (Snelheid > 50) {
			Snelheid = Snelheid - 10;
		}

		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
			Img: foodImg[Math.floor(Math.random() * 3)]
		};
	} else
		snake.pop();

	if (snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
		clearInterval(game);

	if (dir == "left") snakeX -= box;
	if (dir == "right") snakeX += box;
	if (dir == "up") snakeY -= box;
	if (dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
	console.log(Snelheid);
}

let Snelheid = 150

let game = setInterval(drawGame, Snelheid);