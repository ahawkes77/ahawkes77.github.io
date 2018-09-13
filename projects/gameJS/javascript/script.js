//create the game grid

var grid = new Grid(10, 10, "white");
Grid.wall(grid, 10);


//js to update player data when they change weapons or score

function updatePlayerData() {
$('#p1Name').text('Player Name: ' + player1.name);
$('#p1Weapon').text('Player Weapon: ' + player1.weapon.name);
$('#p1WeaponValue').text('Weapon Value: ' + player1.weapon.damage);
$('#p1Health').text('Player Health: ' + player1.health);
$('#p1Score').text('Player Score: ' + player1.score);

$('#p2Name').text('Player Name: ' + player2.name);
$('#p2Weapon').text('Player Weapon: ' + player2.weapon.name);
$('#p2WeaponValue').text('Weapon Value: ' + player2.weapon.damage);
$('#p2Health').text('Player Health: ' + player2.health);
$('#p2Score').text('Player Score: ' + player2.score);
}


//function to check if the player still has >0 points and therefore whether or not the game is over

function checkGameOver(playerA, playerB) {
    if(playerA.health <=0) {
        alert("Game Over! " + playerB.name +" wins!");
        $('#myCanvas').hide(3000);
        $('#pOneStatus').hide();
        $('#pTwoStatus').hide();
        $('.directionButtonsP1').hide();        
        $('.directionButtonsP2').hide();
        $('#gameOver').show();
        $('body').css('background-color', 'white');
    }
    else if(playerB.health <= 0) {
        alert("Game Over! " + playerA.name + " wins!");
        $('#myCanvas').hide(3000);
        $('#pOneStatus').hide();
        $('#pTwoStatus').hide();
        $('.directionButtonsP1').hide();
        $('.directionButtonsP2').hide();
        $('#gameOver').show();
        $('body').css('background-color', 'white');
    }
    else {
        alert("let's keep going!");
    }
}

//function wrapUpGame() {
//    
//}

//function switchButtons() {
//    div1 = $('.directionButtonsP1');
//    div2 = $('.directionButtonsP2');
//    
//    tdiv1 = div1.clone();
//    tdiv2 = div2.clone();
//    
//    if(!div2.is(':empty')){
//        div2.replaceWith(tdiv1);
//        div1.replaceWith(tdiv2);
//    }
//}

