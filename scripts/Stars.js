
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
