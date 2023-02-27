// Jai Shree Ram
// subscribe to "Ketan Codes" on youtube
let SCENE = 2;
let LEVEL = 1;
let star = [];
let hero;
let bullets = [];
let enemy = [];
let fireballs = [];
let waiting = false;
let heroimg;
let heart;

function preload() {
    // loading images and font
    heroimg = loadImage("./assets/croppedhero.png");
    fire = loadImage("./assets/fire.png");
    enemyimg = loadImage("./assets/enemyfinal.png");
    myFont = loadFont('./assets/font.ttf');
    heart1 = loadImage("./assets/heart1.png")
    heart2 = loadImage("./assets/heart2.png")
    heart = heart1;
    title1 = loadImage("./assets/maintitle.png");
    title2 = loadImage("./assets/title.png")
    soundFormats('mp3', 'ogg');
    mySound = loadSound('./assets/Promod1.mp3');

}

function setup() {
    createCanvas(windowWidth< 480 ? windowWidth : 480, windowHeight );

    // creating hero
    hero = new Hero();

    // making stars
    for (let i = 0; i < 10; i++) {
        star[i] = new Star();
    }

    // making first enemy
    enemy.push(new Enemy(200, -10))

    // setting fonts
    textFont(myFont);
}

function menu() {
    image(title1, 40, 40, 0.75 * width, 100);
    image(title2, 40, 80, 0.75 * width, 100);
    image(heroimg, 0.5 * width - 50, 450, 100, 100);
    fill(355);
    textSize(52)
    textAlign(CENTER);
    text("Click to Play", width / 2, height / 2);
    if (mouseIsPressed) {
        SCENE = 1;
        mySound.play();
    }
}
// this will reset game
function reset() {
    LEVEL = 0;
    hero = new Hero();
    bullets = [];
    enemy = [];
    fireballs = [];
    enemy.push(new Enemy(100, -50));
    enemy.push(new Enemy(200, -50));
    enemy.push(new Enemy(300, -50));
    SCENE = 2;
}



// this is forever loop
function draw() {
    background(20);
    for (let i = 0; i < star.length; i++) {
        star[i].show();
    }
    switch (SCENE) {
        // 1 : game
        // 2 : menu
        // 3 : score

        case 1:
            game();
            break;
        case 2:
            menu();
            break;

        default:
            break;
    }

}

// this is main game 
function game() {

    hero.show();
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].update();
    }
    for (let i = 0; i < fireballs.length; i++) {
        const element = fireballs[i];
        element.show();
        element.update();

    }
    for (let i = 0; i < enemy.length; i++) {
        const element = enemy[i];
        element.show();
        if (element.h < 0) {
            enemy.splice(i, 1);
        }
    }
    if (enemy.length == 0 && !waiting) {
        console.log("Add more");
        waiting = true;
        LEVEL += 1;
        // enemy.push(new Enemy(100, 50))
        setTimeout(() => {
            waiting = false;
            enemy.push(new Enemy(random(50, 150), 50))
            enemy.push(new Enemy(random(175, 250), 50))
            enemy.push(new Enemy(random(275, 350), 50))
            // enemy.push(new Enemy(300, 50))
            console.log("added")
        }, 2000)

    }

    // 

    push();
    textSize(32);
    fill(155, 355, 56);
    textAlign(LEFT);
    text(LEVEL, 10, 30)
    pop();

}

function menu() {
    image(title1, 40, 40, 0.75 * width, 100);
    image(title2, 40, 80, 0.75 * width, 100);
    image(heroimg, 0.5 * width - 50, 450, 100, 100);
    fill(355);
    textSize(52)
    textAlign(CENTER);
    text("Click to Play", width / 2, height / 2);
    if (mouseIsPressed) {
        SCENE = 1;
        mySound.play();
    }
}
// this will reset game
function reset() {
    LEVEL = 0;
    hero = new Hero();
    bullets = [];
    enemy = [];
    fireballs = [];
    enemy.push(new Enemy(100, 50));
    enemy.push(new Enemy(200, 50));
    enemy.push(new Enemy(300, 50));
    SCENE = 2;
}




// this will change hero's position
function mouseDragged() {
    if (mouseX > 50 && mouseX < 350) {
        hero.x = mouseX;
        hero.y = mouseY;

    }
}

// a new fireball is fired from enemy
setInterval(() => {

    for (let i = 0; i < enemy.length; i++) {
        const element = enemy[i];
        fireballs.push(new Fireball(element.x, element.y + 30));
    }
    if (heart == heart1) {
        heart = heart2;
    } else {
        heart = heart1;
    }
}, 500);

// a new bullet is fired from hero
setInterval(() => {
    if(LEVEL>3){
        bullets.push(new Bullet(hero.x-15, hero.y - 25));
        bullets.push(new Bullet(hero.x+15, hero.y - 25));
    }
    else if(LEVEL>6){
        bullets.push(new Bullet(hero.x, hero.y - 30));
        bullets.push(new Bullet(hero.x+15, hero.y - 20));
        bullets.push(new Bullet(hero.x-15, hero.y - 20));
    }
    else if(LEVEL>10){
        bullets.push(new Bullet(hero.x, hero.y - 30));
        bullets.push(new Bullet(hero.x+15, hero.y - 25));
        bullets.push(new Bullet(hero.x+30, hero.y - 15));
        bullets.push(new Bullet(hero.x-30, hero.y - 15));
        bullets.push(new Bullet(hero.x-15, hero.y - 25));
    }
    else{
        bullets.push(new Bullet(hero.x, hero.y - 30));
    }
    

},LEVEL<10 ? 250-LEVEL*20 : 50);

