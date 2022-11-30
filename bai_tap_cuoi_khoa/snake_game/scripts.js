const PARAMS = {
    boardSize: 600,
    boardUnit: 20,
    snakeSpeed: 200,
    isSnakeDead: false,
    currentScore: 0,
    bestScore: 0,
    previousPressedTime: 0
}
const codes = {
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    space: "Space",
    current: "ArrowRight",
    reverse: "ArrowLeft",
    allAllowCodes: ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"],
    upDateDirect: function (current) {
        this.current = current;

        switch (current) {
            case "ArrowLeft":
                this.reverse = "ArrowRight";
                break;
            case "ArrowUp":
                this.reverse = "ArrowDown";
                break;
            case "ArrowRight":
                this.reverse = "ArrowLeft";
                break;
            case "ArrowDown":
                this.reverse = "ArrowUp";
                break;
        }
    }
};
const THEME = {
    violet: {
        bg: "#DBC7F7",
        grid: "#B88FF1",
        snake: "black"
    },
    peach: {
        bg: "#FFC58F",
        grid: "#CC9E72",
        snake: "#4B59C5"
    },
    egg: {
        bg: "#FFF5C5",
        grid: "#CCC49E",
        snake: "#93C54B"
    },
    wasabi: {
        bg: "#C5FF8F",
        grid: "#9ECC72",
        snake: "#A99D15"
    }
}
let move, board, snake, food;
let selectedTheme = THEME.wasabi;

const bestScoreElm = document.getElementById("bestScore");
const currentScoreElm = document.getElementById("currentScore");

const c = document.getElementById("gameboard");
c.width = PARAMS.boardSize;
c.height = PARAMS.boardSize;
const ctx = c.getContext("2d");

const c2 = document.getElementById("gamesetting");
c2.width = PARAMS.boardSize;
c2.height = PARAMS.boardSize / 6;
const ctx2 = c2.getContext("2d");

c2.addEventListener('click', function (e) {
    const canvas = c2.getBoundingClientRect();
    const clickedX = e.clientX - canvas.left;
    const themeKeys = Object.keys(THEME);
    const selectedThemeIndex = parseInt(clickedX * themeKeys.length / c2.width);

    if (!PARAMS.isSnakeDead) {

    }
    const isRestart = confirm("Change background and restart game?");
    if (isRestart) {
        selectedTheme = THEME[themeKeys[selectedThemeIndex]];
        initGame();
    }
})

class GameBoard {
    constructor() {
        this.fillBackgound();
        this.drawGrid();
        this.drawBgSetting();
    }

    fillBackgound() {
        ctx.fillStyle = selectedTheme.bg;
        ctx.fillRect(0, 0, PARAMS.boardSize, PARAMS.boardSize);
    }

    drawGrid() {
        ctx.beginPath();
        for (let i = PARAMS.boardUnit; i <= PARAMS.boardSize; i += PARAMS.boardUnit) {
            ctx.strokeStyle = selectedTheme.grid;
            ctx.moveTo(i, 0);
            ctx.lineTo(i, PARAMS.boardSize);
            ctx.stroke();
            ctx.moveTo(0, i);
            ctx.lineTo(PARAMS.boardSize, i);
            ctx.stroke();
        }
        ctx.closePath();
    }

    drawBgSetting() {
        let x = 0;
        let total = Object.keys(THEME).length;

        for (let key of Object.keys(THEME)) {
            ctx2.fillStyle = THEME[key].bg;
            ctx2.strokeStyle = THEME[key].snake;
            ctx2.strokeRect(x * c2.width / total, 0, c2.width / total, c2.height);
            ctx2.fillRect(x * c2.width / total, 0, c2.width / total, c2.height);
            x++;
        }


        ctx2.font = "20px Times New Roman";
        ctx2.fillStyle = "black";
        ctx2.fillText("Click on a color to change background!", c2.width / 5, c2.height / 3);
    }
}

class Unit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(name) {
        let unitX = this.x;
        let unitY = this.y;

        if (name === "food") {
            let imageObj = new Image();
            imageObj.onload = function () {
                ctx.drawImage(
                    imageObj,
                    unitX * PARAMS.boardUnit,
                    unitY * PARAMS.boardUnit,
                    PARAMS.boardUnit, PARAMS.boardUnit
                );
            };
            imageObj.src = 'food.png';
        } else if (name === "head") {
            let imageObj = new Image();
            imageObj.onload = function () {
                ctx.drawImage(
                    imageObj,
                    unitX * PARAMS.boardUnit,
                    unitY * PARAMS.boardUnit,
                    PARAMS.boardUnit, PARAMS.boardUnit
                );
            };
            imageObj.src = 'snake_head.png';
        } else {
            ctx.fillStyle = selectedTheme.snake;
            ctx.roundRect(
                unitX * PARAMS.boardUnit,
                unitY * PARAMS.boardUnit,
                PARAMS.boardUnit,
                PARAMS.boardUnit,
                5
            );
            ctx.fill();
            ctx.stroke();
        }
    }
}

class Food {
    constructor(x, y) {
        this.piece = new Unit(...this.spawn());
        this.isSpecical = false;
        this.draw();
    }

    spawn(snakeBody = []) {
        let isOnSnakeBody = false;
        let x, y;

        do {
            x = Math.floor(Math.random() * PARAMS.boardSize / PARAMS.boardUnit);
            y = Math.floor(Math.random() * PARAMS.boardSize / PARAMS.boardUnit);

            for (let i = 0; i < snakeBody.length; i++) {
                if (x === snakeBody[i].x && y === snakeBody[i].y) {
                    isOnSnakeBody = true;
                    break;
                }
            }
        } while (isOnSnakeBody)

        return [x, y];
    }

    update(snakeBody = []) {
        this.piece = new Unit(...this.spawn());
        this.draw(snakeBody);
    }

    draw() {
        this.piece.draw("food");
    }
}

class Snake {
    constructor(board, food) {
        this.body = [
            new Unit(15, 15),
            new Unit(14, 15),
            new Unit(13, 15)
        ]
        this.direct = {
            x: {
                ArrowLeft: -1,
                ArrowUp: 0,
                ArrowRight: 1,
                ArrowDown: 0
            },
            y: {
                ArrowLeft: 0,
                ArrowUp: -1,
                ArrowRight: 0,
                ArrowDown: 1
            }
        }
        this.head = this.body[0];
        this.board = board;
        this.food = food;
        this.draw(this.body);
    }

    draw() {
        this.board.fillBackgound();
        this.board.drawGrid();
        this.food.draw(this.body);

        for (let i = 1; i < this.body.length; i++) {
            this.body[i].draw();
        }

        this.head.draw("head");
    }

    move(direct) {
        let newX = this.head.x + this.direct.x[direct];
        let newY = this.head.y + this.direct.y[direct];
        let newCell = new Unit(newX, newY);

        this.body.unshift(newCell);
        this.body.pop();
        this.head = this.body[0];
        this.draw();
    }

    checkFoodCollision() {
        let isCollision = (this.head.x === this.food.piece.x) && (this.head.y === this.food.piece.y);

        if (isCollision) {
            PARAMS.currentScore += 10;
            this.food.update(this.body);
            updateScore();

            let bodyLength = this.body.length;
            let newX = this.body[bodyLength - 2].x - this.body[bodyLength - 1].x;
            let newY = this.body[bodyLength - 2].y - this.body[bodyLength - 1].y;
            this.body.push(new Unit(newX, newY));
        }
    }

    checkDead() {
        let isBorderCollision = this.head.x < 0
            || this.head.x === PARAMS.boardSize / PARAMS.boardUnit
            || this.head.y < 0
            || this.head.y === PARAMS.boardSize / PARAMS.boardUnit;

        let isSnakeCollision = false;
        for (let i = 1; i < this.body.length; i++) {
            isSnakeCollision = this.head.x === this.body[i].x && this.head.y === this.body[i].y;
            if (isSnakeCollision) {
                break;
            }
        }

        if (isBorderCollision || isSnakeCollision) {
            clearInterval(move);
            let imageObj = new Image();
            imageObj.onload = function () {
                ctx.drawImage(
                    imageObj,
                    0,
                    0,
                    PARAMS.boardSize,
                    PARAMS.boardSize
                );
            };
            imageObj.src = 'game_over.png';
            PARAMS.isSnakeDead = true;
        }
    }
}

function initGame() {
    PARAMS.isSnakeDead = false;
    PARAMS.currentScore = 0;
    updateScore();
    clearInterval(move);
    codes.upDateDirect(codes.right);

    board = new GameBoard();
    food = new Food();
    snake = new Snake(board, food);

    ctx.font = "40px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Press any arrow key to start!", PARAMS.boardSize / 7, PARAMS.boardSize / 3);
}

function updateScore() {
    if (PARAMS.currentScore > PARAMS.bestScore) {
        PARAMS.bestScore = PARAMS.currentScore;
    }

    currentScoreElm.innerHTML = `Current score: ${PARAMS.currentScore}`;
    bestScoreElm.innerHTML = `Best score: ${PARAMS.bestScore}`;
}

function play(e) {
    let pressedTime = Date.now();
    if ((pressedTime - PARAMS.previousPressedTime) < PARAMS.snakeSpeed) {
        return;
    }

    PARAMS.previousPressedTime = pressedTime;
    let keyCode = e.code;

    if (PARAMS.isSnakeDead && keyCode === codes.space) {
        initGame();
    } else if (PARAMS.isSnakeDead && keyCode !== codes.space) {
        return;
    } else if (!PARAMS.isSnakeDead && codes.allAllowCodes.indexOf(keyCode) !== -1) {
        direct = keyCode === codes.reverse ? codes.current : keyCode;

        codes.upDateDirect(direct);
        clearInterval(move);
        move = setInterval(function () {
            snake.move(direct);
            snake.checkFoodCollision();
            snake.checkDead();
        }, PARAMS.snakeSpeed);
    }
}

/* Problems:
1. (RESOLVED) Press Space, number keys,... => snake disappears:
- Add if condition that only allow a set of specified key codes.

2. (RESOLVED) Prevent spawn food at the snake body position
- Use while+for loop to re-generate x,y axis in Food.spawn() method

3. (RESOLVED) User press arrow key to fast => snake can move to the reverse direction
- Compare the time between 2 onkeypress events. If the different is less than snake speed then ignore the event.

4. (RESOLVED) How to make user press anykey to start moving
- Change to press any arrow keys
*/

/*
References:
- Snake game: https://www.youtube.com/watch?v=5uMEYUpJbMI&t=1282s
- Canvas Object Interaction Events: https://www.youtube.com/watch?v=xbdJf9MRL7A
- HTML CSS COLOR CODE: https://www.htmlcsscolor.com/
- Icon/images: https://iconscout.com/; https://pngtree.com/
*/