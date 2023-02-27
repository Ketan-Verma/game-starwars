class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 50;
        this.h = 350;
        this.angle = PI/3;
        this.speed = random(1,3) + LEVEL;
        if(this.speed>7)this.speed=7;
    }
    show() {
        // enemy movement
        if(this.y+150>hero.y){
            this.y = hero.y-150;
            this.x += Math.cos(this.angle)*this.speed;
        }
        else if(this.y<50){
            this.y+=2;
        }
        else{
            this.x += Math.cos(this.angle)*this.speed;
            this.y += Math.sin(this.angle)*this.speed;
        }
        
        if (this.x < this.r) {
            this.x = this.r;
            this.angle-=PI/2
        } else if (this.x > width-this.r) {
            this.x = width-this.r;
            this.angle+=PI/2
          }
          if (this.y < -50) {
            this.y = -50;
          } else if (this.y > height/3) {
            this.y = height/3;
          }
        // this.angle += (Math.random() - 0.5) * 0.1;
        // drawing enemy
        push();       
            image(enemyimg, this.x - 25, this.y - 25, this.r, this.r);
        pop();

        // checking bullet collision 
        for (let i = 0; i < bullets.length; i++) {
            const element = bullets[i];
            if(element.y<height/3-this.r)continue;
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