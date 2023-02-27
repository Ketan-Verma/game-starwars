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
        if (this.h <= 0) {
            reset();
            SCENE = 2;
        }

        // shows life of hero
        push();
        for (let i = 0; i < this.h; i++) {
            image(heart, 10 + i * 20, height - 25);
        }
        fill(355, 255, 0)
        textSize(32);

        pop();

        //checks if enemy fireballs hits hero 
        for (let i = 0; i < fireballs.length; i++) {
            const element = fireballs[i];
            if(element.y>this.y+this.r)continue;
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