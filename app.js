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
    title1 = loadImage("./assets/maintitle.png")
    title2 = loadImage("./assets/title.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // creating hero
    hero = new Hero();
    
    // making stars
    for (let i = 0; i < 10; i++) {
        star[i] = new Star();
    }

    // making first enemy
    enemy.push(new Enemy(200, 50))
    
    // setting fonts
    textFont(myFont);
}
function menu(){
    image(title1,40,40,0.75*width,100);
    image(title2,40,80,0.75*width,100);
    image(heroimg,0.5*width-50,450,100,100);
    fill(355);
    textSize(52)
    textAlign(CENTER);
    text("Click to Play",width/2,height/2);
    if(mouseIsPressed){
        SCENE=1;
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

// this is main game 
function game(){
    
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
        LEVEL+=1;
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
    text(LEVEL,10, 30)
    pop();

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

 
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 50;
        this.h = 350;
    }
    show() {

        // drawing enemy
        push();
        image(enemyimg,this.x-25,this.y-25,50,50);
        pop();
        
        // checking bullet collision 
        for (let i = 0; i < bullets.length; i++) {
            const element = bullets[i];
            const dx = this.x - element.x;
            const dy = this.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.r / 2) {
                this.h -= 50;
                bullets.splice(i, 1);
            }
        }

    }
}

function mouseDragged() {
    // this will change hero's position
    if (mouseX > 50 && mouseX < 350) {
        hero.x = mouseX;
        hero.y = mouseY;

    }
}
class Hero {
    constructor() {
        this.x = 200;
        this.y = 550;
        this.h = 10;
        this.r = 50;
    }
    show() {
        // draws hero image 
        push();
        image(heroimg, this.x - 25, this.y - 25, 50, 50);
        pop();
        
        //resets game when health becomes zero 
        if (this.h <= 0) reset();
        
        // shows life of hero
        push();
        for (let i = 0; i < this.h; i++) {
            image(heart,10+i*20,height-25);
        }
        fill(355, 255, 0)
        textSize(32);
        
        pop();
        
        //checks if enemy fireballs hits hero 
        for (let i = 0; i < fireballs.length; i++) {
            const element = fireballs[i];
            const dx = this.x - element.x;
            const dy = this.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.r / 2) {
                this.h -= 1;
                fireballs.splice(i, 1);
            }
        }

    }
}
class Fireball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        // draws fireballs
        push();
        fill(255, 0, 0);
        image(fire,this.x-16,this.y-19);
        // ellipse(this.x, this.y, 10, 10);
        pop();
        this.y += 5;
    }
    update() {
        // if fireball escapes canvas its removed from array fireballs
        if (this.y > height) {
            fireballs.shift();
        }
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        // draws bullets
        push();
        fill(255, 155, 0);
        noStroke();
        ellipse(this.x, this.y, 5,15)
        pop();
        // gives velocity to bullet
        this.y -= 5;
    }
    update() {
        // removes bullet when its out of canvas
        if (this.y < 10) {
            bullets.shift();
        }
    }
}
class Star {
    constructor() {
        // random coordinates for stars
        this.x = Math.floor(Math.random() * 400);
        this.y = Math.floor(Math.random() * 600);
        
        // different size for paralex effect
        this.size = Math.floor(Math.random() * 3 + 3);
    }
    show() {
        // draws stars
        circle(this.x, this.y, this.size)

        // moves stars according to their size
        this.y += this.size;
        
        // if star is out of canvas its position is reset`
        if (this.y > height) {
            this.x = Math.floor(Math.random() * 400);
            this.y = 0;
        }
    }
}

setInterval(() => {

    // a new fireball is fired from enemy
    for (let i = 0; i < enemy.length; i++) {
        const element = enemy[i];
        fireballs.push(new Fireball(element.x, element.y + 30));
    }
    if(heart==heart1)
      {
          heart=heart2;
      } 
      else{
        heart =heart1;
      }
}, 500);

setInterval(() => {

    // a new bullet is fired from hero
    bullets.push(new Bullet(hero.x, hero.y - 30));
    
}, 250);