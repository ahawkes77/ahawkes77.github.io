class Weapon {
    constructor(name, damage) {
        Object.assign(this, {name, damage});
        this.generateRandomSquare(this.damage);
        this.componentDraw(this.name);
    }

    componentDraw(icon) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(icon);
        ctx.drawImage(img, this.x*50, this.y*50, 50, 50);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    generateRandomSquare(componentValue) {
        this.x = Math.floor(Math.random()*grid.rows);
        this.y = Math.floor(Math.random()*grid.cols);
        this.position = [this.x, this.y];
        if(grid.matrix[this.x][this.y]==0) {
            grid.add(this.x, this.y, componentValue);
        }
        else {
            this.generateRandomSquare(componentValue);
        }
    }
}

