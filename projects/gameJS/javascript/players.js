class Player {
    constructor(name, health, weapon, active, color, moveCount, score){
        Object.assign(this, {name, health, weapon, active, color, moveCount, score});
        this.health = 100;
        this.score = this.health + weapon.damage;
        this.moveCount = 0;
        this.generateRandomSquare(5);
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

    static compareHealth(personA, personB) {
        personA.score *= Math.random();
        personB.score *= Math.random();
        if (personA.score > personB.score) {
            personB.health = (personB.health - personA.weapon.damage/2);
            personB.score = personB.health + personB.weapon.damage;
            personA.score = personA.health + personA.weapon.damage;
            alert(personA.name + " wins! " + personB.name + " now has a score of " + personB.score);
            updatePlayerData(); 
            checkGameOver(player1, player2);
        }
        else if (personB.score > personA.score) {
            personA.health = (personA.health - personB.weapon.damage/2);
            personA.score = personA.health + personA.weapon.damage;
            personB.score = personB.health + personB.weapon.damage;
            alert(personB.name + " wins! " + personA.name + "now has a score of " + personA.score);
            updatePlayerData();
            checkGameOver(player1, player2);
        }
        else {
            alert("it's a draw!");
            checkGameOver(player1, player2);
        }
    }

    static notDefending(personA, personB) {
        if(personA.active===false) {
            personA.health = personA.health - personB.weapon.damage;
            personA.score = personA.health + personA.weapon.damage;
            alert(personA.name + ", you now have a score of " + personA.score);
            updatePlayerData();
            checkGameOver(player1, player2);
        }
        else if(personB.active===false) {
            personB.health = personB.health - personA.weapon.damage;
            personB.score = personB.health + personB.weapon.damage;
            alert(personB.name + ", you now have a score of " + personB.score);
            updatePlayerData();
            checkGameOver(player1, player2);
        }
    }


    playerDirection(direction) {
        switch(direction) {
            case "up":
                var newP = grid.matrix[this.x][this.y+1];
                if (newP==49) {
                    alert("Well done! You've topped up your health by 20 points!");
                    this.health +=20;
                    this.score +=20;
                    grid.matrix[this.x][this.y+1] -=49;
                    updatePlayerData();
                }

                if (newP==0|newP==49){
                    this.componentDraw("greySquare");
                    grid.matrix[this.x][this.y] -= 5;
                    grid.matrix[this.x][this.y+1] +=5;
                    this.position = [this.x, this.y+=1];
                    this.componentDraw(this.name);
                    this.moveCount +=1;
                }
                else {
                    this.objectFound(newP);
                }
                break;
            case "down":
                var newP = grid.matrix[this.x][this.y-1];

                if (newP==49) {
                    alert("Well done! You've topped up your health by 20 points!");
                    this.health +=20;
                    this.score +=20;
                    grid.matrix[this.x][this.y-1] -=49;
                    updatePlayerData();
                }
                if(newP==0|newP==49){
                    this.componentDraw("greySquare");
                    grid.matrix[this.x][this.y] -= 5;
                    grid.matrix[this.x][this.y-1] +=5;
                    this.position = [this.x, this.y-=1];
                    this.componentDraw(this.name);
                    this.moveCount +=1;
                }
                else {
                    this.objectFound(newP);
                }
                break;
            case "left":
                var newP = grid.matrix[this.x-1][this.y];

                if (newP==49) {
                    alert("Well done! You've topped up your health by 20 points!");
                    this.health +=20;
                    this.score +=20;
                    grid.matrix[this.x-1][this.y] -= 49;
                    updatePlayerData();
                }
                if(newP==0|newP==49){
                    this.componentDraw("greySquare");
                    grid.matrix[this.x][this.y] -= 5;
                    grid.matrix[this.x-1][this.y] +=5;
                    this.position = [this.x-=1, this.y];
                    this.componentDraw(this.name);
                    this.moveCount +=1;
                }
                else {
                    this.objectFound(newP);
                }
                break;
            case "right":
                var newP = grid.matrix[this.x+1][this.y];

                if (newP==49) {
                    alert("Well done! You've topped up your health by 20 points!");
                    this.health +=20;
                    this.score +=20;
                    grid.matrix[this.x+1][this.y] -= 49;
                    updatePlayerData();
                }
                if(newP==0|newP==49){
                    this.componentDraw("greySquare");
                    grid.matrix[this.x][this.y] -= 5;
                    grid.matrix[this.x+1][this.y] +=5;
                    this.position = [this.x+=1, this.y];
                    this.componentDraw(this.name);
                    this.moveCount +=1;
                }
                else {
                    this.objectFound(newP);
                }
        }
    } 

    objectFound(square) {

        //perhaps do this in a separate function to test which weapon it is - this might also allow you to link up the weapon value directly with the name of the weapon

        var freeWeapon;

        if(square==20){
            freeWeapon = dagger;
        }
        else if(square==40){
            freeWeapon = gun;
        }
        else if(square==60){
            freeWeapon = bomb;
        }
        else if(square==80){
            freeWeapon = grenade;
        };

        if(square==5) {
            var opponent;
            if(player1.active==false) {
                opponent = player1.name;
            }
            else if (player2.active==false) {
                opponent = player2.name;
            }
            alert(opponent + "! " + this.name + " would like to fight you. You must choose to fight back or let them win.");
            $('.direction').hide();
            $('.direction2').hide();
            $('.fightButtons').show();
            this.moveCount +=1;
            if(player1.active==true) {
                $('#p1Icon').hide();
                $('#p2Icon').show();
            }
            else if (player2.active==true) {
                $('#p2Icon').hide();
                $('#p1Icon').show();
            }
        }


        else if(square%10==0) {
            var oldWeapon = this.weapon;
            this.weapon = freeWeapon;
            grid.matrix[freeWeapon.x][freeWeapon.y] = oldWeapon.damage;
            this.score = this.health + freeWeapon.damage;
            alert("you have changed your weapon to a " + freeWeapon.name + ". This has a damage value of " + freeWeapon.damage + ".");
            this.moveCount +=1;
            updatePlayerData();
            this.x = freeWeapon.x;
            this.y = freeWeapon.y;
            this.componentDraw(oldWeapon.name);
            this.x = this.position["0"];
            this.y = this.position["1"];
        }

        else {alert("You've hit a wall! Please choose another direction!")};
    }


    static changeActivePlayer(player1, player2) {
        if(player1.active==true && player1.moveCount==3) {
            player1.active=false;
            player2.active=true;
            $('.direction2').css('background-color', player2.color);
            $('.direction').hide();
            $('#p1Icon').hide();
            $('#p2Icon').show();
            $('.direction2').show();
            player1.moveCount = 0;
            player1.componentDraw("p1inactive");
            player2.componentDraw(player2.name);
        }
        else if (player2.active==true && player2.moveCount==3){
            player1.active=true;
            player2.active=false;
            $('.direction').css('background-color', player1.color);
            $('.direction2').hide();
            $('.direction').show();
            $('#p2Icon').hide();
            $('#p1Icon').show();
            player2.moveCount = 0;
            player2.componentDraw("p2inactive");
            player1.componentDraw(player1.name);
        }
    }

}