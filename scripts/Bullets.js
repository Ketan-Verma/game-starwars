class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5 ;
        this.angle = PI;
    }
    show() {
        // draws bullets
        push();
        fill(255, 155, 0);
        noStroke();
        ellipse(this.x, this.y, 5, 15)
        pop();
        // gives velocity to bullet
        this.y -= this.speed;
        this.x += Math.sin(this.angle)*this.speed;
    }
    update() {
        // removes bullet when its out of canvas
        if (this.y < 10) {
            bullets.shift();
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
        image(fire, this.x - 16, this.y - 19);
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

