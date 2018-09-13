

$("#loadGame").on('click', function(){
    $('#myCanvas').show(3000);
    $('#drawWeapons').show();
})

//instead of checkign active players, just have separate btns for players 1 and 2; and include in the direction function in the player class a part which hides/shows them when they are clicked.

function checkActivePlayer(direction){
    var activePlayer;
    if(player1.active===true) {
        activePlayer = player1;
    }
    else {
        activePlayer = player2;
    }
    activePlayer.playerDirection(direction);
}

//draw weapons and draw players buttons 

//create the four weapons for the game

var dagger;
var gun;
var bomb;
var grenade;

$('#drawWeapons').on('click', function(){
    dagger = new Weapon("dagger", 20);
    gun = new Weapon("gun", 40);
    bomb = new Weapon("bomb", 60);
    grenade = new Weapon("grenade", 80);
    healthPack = new Weapon("healthPack", 49);
    healthPack = new Weapon("healthPack", 49);
    healthPack = new Weapon("healthPack", 49);
    healthPack = new Weapon("healthPack", 49);
    $(this).hide();
    $('#drawPlayers').show()
});

//create two players for the game

var player1;
var player2;

$('#drawPlayers').on('click', function(){
    player1 = new Player("John", 100, dagger, true, "blue", 0);
    player2 = new Player("Jane", 100, dagger, false, "red", 0);
    player2.componentDraw("p2inactive");
    $(this).hide();
    $('#pOneStatus').show();
    $('#pTwoStatus').show();
    $('.direction').show();
    $('#p1Icon').show();
    updatePlayerData();
});

//direction buttons - Player One

$('#up').on('click', function(){
    checkActivePlayer("down");
    Player.changeActivePlayer(player1, player2);
});

$('#down').on('click', function(){
    checkActivePlayer("up");
    Player.changeActivePlayer(player1, player2);
});

$('#left').on('click', function(){
    checkActivePlayer("left");
    Player.changeActivePlayer(player1, player2);
});

$('#right').on('click', function(){
    checkActivePlayer("right");
    Player.changeActivePlayer(player1, player2);
});

//direction buttons - Player Two

$('#up2').on('click', function(){
    checkActivePlayer("down");
    Player.changeActivePlayer(player1, player2);
});

$('#down2').on('click', function(){
    checkActivePlayer("up");
    Player.changeActivePlayer(player1, player2);
});

$('#left2').on('click', function(){
    checkActivePlayer("left");
    Player.changeActivePlayer(player1, player2);
});

$('#right2').on('click', function(){
    checkActivePlayer("right");
    Player.changeActivePlayer(player1, player2);
});
//fight buttons
$('#fightYesP1').on('click', function(){
    Player.compareHealth(player1, player2);
    $(".fightButtons").hide();
    if(player1.active==true) {
        $('.direction').show();
        $('#p1Icon').show();
        $('#p2Icon').hide();
    }
    else if (player2.active==true) {
        $('.direction2').show();
        $('#p2Icon').show();
        $('#p1Icon').hide();
    }
});

$('#fightNoP1').on('click', function(){
    Player.notDefending(player1, player2);
    $(".fightButtons").hide();
    if(player1.active==true) {
        $('.direction').show();
        $('#p1Icon').show();
        $('#p2Icon').hide();
    }
    else if (player2.active==true) {
        $('.direction2').show();
        $('#p2Icon').show();
        $('#p1Icon').hide();
    }
})
//test button

$('#testUp').on('click', function(){
    alert("this works");
})
