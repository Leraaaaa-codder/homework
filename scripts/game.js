var myCar;
let score = 0;              // очки
let obstacles = [];         // перешкоди

var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 2000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function() {
        this.clear();
        myCar.update();

        // перешкоди: рух + малювання + зіткнення
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            obs.y += obs.speed;
            this.context.fillStyle = obs.color;
            this.context.fillRect(obs.x, obs.y, obs.width, obs.height);

            if (
                myCar.x < obs.x + obs.width &&
                myCar.x + myCar.width > obs.x &&
                myCar.y < obs.y + obs.height &&
                myCar.y + myCar.height > obs.y
            ) {
                alert("GAME OVER! Очки: " + score);
                document.location.reload();
            }
        }

        // чистимо ті, що впали нижче
        obstacles = obstacles.filter(o => o.y < this.canvas.height);

        // очки
        this.context.fillStyle = "black";
        this.context.font = "16px Arial";
        this.context.fillText("Очки: " + score, 10, 20);
    }
};

// створення перешкоди
function spawnObstacle() {
    let width = 30 + Math.random() * 40;
    let height = 20;
    let x = Math.random() * (myGameArea.canvas.width - width);
    let y = -height;
    let speed = 2 + Math.random() * 2;
    obstacles.push({ x, y, width, height, color: "green", speed });
}

class Car {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = 0;
        this.maxSpeed = 3;
        this.acceleration = 0.15;
        this.friction = 0.04;
    }

    update() {
        const ctx = myGameArea.context;

        // фрикція
        this.speed *= (1 - this.friction);

        // обмеження швидкості
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed;

        // оновлення позиції за кутом і швидкістю
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // межі екрану
        if (this.x < 0) this.x = 0;
        if (this.x > myGameArea.canvas.width - this.width) this.x = myGameArea.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > myGameArea.canvas.height - this.height) this.y = myGameArea.canvas.height - this.height;

        // малювання (з поворотом)
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(-this.width/2 + 5, -this.height/2 + 3, this.width - 10, this.height - 6);
        ctx.fillStyle = "#333";
        ctx.fillRect(-this.width/2 - 2, -this.height/2 - 2, 4, 4);
        ctx.fillRect(this.width/2 - 2, -this.height/2 - 2, 4, 4);
        ctx.fillRect(-this.width/2 - 2, this.height/2 - 2, 4, 4);
        ctx.fillRect(this.width/2 - 2, this.height/2 - 2, 4, 4);
        ctx.restore();
    }

    accelerate() { this.speed += this.acceleration; }
    brake() { this.speed -= this.acceleration; }
    turnLeft() { this.angle -= 0.08; }
    turnRight() { this.angle += 0.08; }
    honk() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.type = 'sawtooth';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Не вдалося відтворити звук клаксона:', error);
        }
    }
}

// клавіші — повний код
const keys = { up: false, down: false, left: false, right: false, honk: false };

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp': case 'w': case 'W': keys.up = true; break;
        case 'ArrowDown': case 's': case 'S': keys.down = true; break;
        case 'ArrowLeft': case 'a': case 'A': keys.left = true; break;
        case 'ArrowRight': case 'd': case 'D': keys.right = true; break;
        case ' ': case 'h': case 'H':
            if (!keys.honk) { keys.honk = true; if (myCar) myCar.honk(); }
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowUp': case 'w': case 'W': keys.up = false; break;
        case 'ArrowDown': case 's': case 'S': keys.down = false; break;
        case 'ArrowLeft': case 'a': case 'A': keys.left = false; break;
        case 'ArrowRight': case 'd': case 'D': keys.right = false; break;
        case ' ': case 'h': case 'H': keys.honk = false; break;
    }
});

// цикл гри
function gameLoop() {
    // керування
    if (keys.up) myCar.accelerate();
    if (keys.down) myCar.brake();
    if (keys.left) myCar.turnLeft();
    if (keys.right) myCar.turnRight();

    // очки
    score++;

    // іноді створюємо перешкоду
    if (Math.random() < 0.02) spawnObstacle();

    // оновлення і рендер
    myGameArea.update();
    requestAnimationFrame(gameLoop);
}

// старт
window.onload = () => {
    myGameArea.start();
    myCar = new Car(40, 20, "red", 240, 200);
    gameLoop();
};