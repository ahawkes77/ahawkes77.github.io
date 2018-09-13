class Grid {
    constructor(rows, cols, color) {
        Object.assign(this, {rows, cols});
        this.matrix = [];

        for (var i=0; i<this.rows; i++) {
            this.matrix[i] = [];
            for (var j=0; j<this.cols; j++) {
                this.matrix[i][j] = 0;
                this.id = [i][j];
                gridDraw(i, j, color);    
            }
        }
    }

    add(a,b,c){
        this.matrix[a][b] += c;
    }

    static wall(template, quantity) {
        var i=0;
        while (i<quantity) {
            this.x = Math.floor(Math.random()*template.rows);
            this.y = Math.floor(Math.random()*template.cols);
            this.position = [this.x, this.y];
            if (template.matrix[this.x][this.y] == 0) {
                template.add(this.x, this.y, 7);
                i++;
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = "black";
                ctx.fillRect(this.x*50, this.y*50, 50, 50);

            }
        }
    }
}


function gridDraw(x, y, color) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    ctx.rect(x*50,y*50, 50, 50);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}


