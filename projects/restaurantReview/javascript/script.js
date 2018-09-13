
$('.togglePane').on('click', function(){
    $('.sidebarPanel').css('display', 'none');
    $(this).css('display', 'none');
    $('.togglePane2').css('display', 'block');
})

$('.togglePane2').on('click', function(){
    $('.sidebarPanel').css('display', 'block');
    $('.togglePane').css('display', 'block');
})

$('.welcomeButton').on('click', function(){
    $('.carousel').hide();
    $('.landingSmallDevice').hide();
    $('.mapSidebar').show();
    $('.navbar').show();
    $('.header').show();
    $('.togglePane').css('display', 'block');
    $('.sidebarPanel').css('display', 'block');
    restaurantsRating(restaurantsPlaces, 1, 5);
    $('#rest1').css('display', 'block');
})

$('.magnifying').on('click', function(){
    $('.carousel').hide();
    $('.landingSmallDevice').hide();
    $('.mapSidebar').show();
    $('.navbar').show();
    $('.header').show();
    $('.togglePane').css('display', 'block');
    $('.sidebarPanel').css('display', 'block');
    restaurantsRating(restaurantsPlaces, 1, 5);
    $('#rest1').css('display', 'block');
})


//code for making changes when screen is smaller

if(screen.width<760) {
    $('.togglePane').removeClass('fa fa-angle-double-right pt-2').addClass('fa fa-angle-double-down pt-2');
    $('.togglePane2').removeClass('fa fa-angle-double-left pt-2').addClass('fa fa-angle-double-up pt-2');
}


var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
    return $star_rating.each(function() {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
    });
};

$star_rating.on('click', function() {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});



function displayText() {
    rest1.innerHTML="";
    for (i=0; i<50; i++) {
        rest1.innerHTML += "<div class='card-header' style='border: 1px solid lightblue' role='tab' id='heading" + i + "'><a data-toggle=collapse data-target=#collapseExample"+ i + " aria-expanded=false aria-controls=collapseExample"+ i +"><div class='row' onclick = 'getReviews(&#39" + restaurantsPlaces[i].place_id + "&#39)'><div class='col-5'><img src='" + restaurantsPlaces[i].photos[0].getUrl({'maxWidth': 150, 'maxHeight':70}) + "'></div><div class='col-7'><h6 class='restInfo'>" + restaurantsPlaces[i].name + "</h6><span id='addressinfo'>" + restaurantsPlaces[i].vicinity + "</span></div><p class='restInfo' style='background-color:white;'></p></div><div class='collapse ml-2' id='collapseExample"+ i + "'><p id='" + restaurantsPlaces[i].place_id + "'></p></div>";
    }  
}


function sortRatings(num1, num2) {
    rest1.innerHTML="";
    for(i in restaurantsPlaces){
        if(restaurantsPlaces[i].rating>=num1 && restaurantsPlaces[i].rating<=num2) {
            //            console.log(restaurantsPlaces[i].name + ": " + restaurantsPlaces[i].rating);
            //            ratedArray.unshift(restaurantsPlaces[i]);
            //            console.log(ratedArray);        
            rest1.innerHTML += "<div class='card-header' style='border: 1px solid lightblue' role='tab' id='heading" + i + "'><a data-toggle=collapse data-target=#collapseExample"+ i + " aria-expanded=false aria-controls=collapseExample"+ i +"><div class='row' onclick = 'getReviews(&#39" + restaurantsPlaces[i].place_id + "&#39)'><div class='col-5'><img src='" + restaurantsPlaces[i].photos[0].getUrl({'maxWidth': 150, 'maxHeight':70}) + "'></div><div class='col-7'><h6 class='restInfo'>" + restaurantsPlaces[i].name + "</h6>" + "<span>" + restaurantsPlaces[i].vicinity + "</span></div><p class='restInfo'></p></div><div class='collapse ml-2' id='collapseExample"+ i + "'><p id='" + restaurantsPlaces[i].place_id + "'></p></div>"
        }
    }
}