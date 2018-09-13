////functions to support sorting 

var rest1 = document.getElementById('rest1');

function restaurantsRating(restaurantGroup, x, y){
    displayText();
}

function drawStar(x, reference) {
    var placement = document.getElementById(reference);
    for(i=0; i<x; i++) {
        placement.innerHTML += "<svg height='21' width='50'><polygon points='10,1 4,19.8 19,7.8 1,7.8 16,19.8' style='fill:gold;stroke:none;stroke-width:1;fill-rule:nonzero;'/></svg>";
    }
}

drawStar(1, 'oneStar');
drawStar(2, 'twoStars');
drawStar(3, 'threeStars');
drawStar(4, 'fourStars');
drawStar(5, 'fiveStars');


function modalReviewForm(restaurantName, x){    
    $('.sidebarPanel').css('display', 'none');
    $('.togglePane').css('display', 'none');
    $('.togglePane2').css('display', 'block');

    var order = x;
    var name = document.getElementById('reviewFormName');
    name.innerHTML=restaurantName;
    var name2 = document.getElementById('restNameAgain');
    name2.innerHTML = restaurantName;
    orderInArray.unshift(order);
}


function submitModalReview() {
    var reviewText = document.getElementById('textareaReview');
    var starsValue = document.getElementById('ratingValue');
    console.log(starsValue.value);
    reviewText.value="";
    starsValue.value = "0";
    console.log(starsValue.value);
}


function getReviews(currentId){

    var request = {
        placeId: currentId,
        fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'reviews', 'website', 'opening_hours', 'price_level']
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //    alert(place.reviews[0].text + place.reviews[1].text);
            var reviewText = document.getElementById(currentId);
            reviewText.innerHTML = "<hr><div class='container-fluid reviewSection'><div class='row'><div class='col-3'><p>Rating:</p></div><div class='col-9'><p id='stars" + place.name + "'></p></div></div><div class='row'><div class='col-6'><button type='button' class='reviewBarButton btn-warning mt-1 mb-3' onclick='window.open(&#39" + place.website + "&#39)'>Website</button></div><div class='col-6'><button type='button' class='reviewBarButton btn-warning mt-1 mb-3' data-toggle='modal' data-target='#exampleModal' onclick = 'modalReviewForm(&#39" + place.name + "&#39, " + 3 + ")'>Write a review</button></div></div><div class='row'><div class='col-12'><h6 class='mb-3 text-center'>User Reviews</h6></div></div><div class='row'><div class='col-4'><img class='reviewIcon' src='" + place.reviews[0].profile_photo_url + "'></div><div class='col-8'><p id='review1stars" + place.name + "'></p><p style='font-size: 13px;'>Review written " + place.reviews[0].relative_time_description + "</p></div></div><div class='row'><div class='col-12'><p style='font-size:14px;'>" + place.reviews[0].text + "</p></div></div><div class='row'><div class='col-4'><img class='reviewIcon' src='" + place.reviews[1].profile_photo_url + "'></div><div class='col-8'><p id='review2stars" + place.name + "'></p><p style='font-size: 13px;'>Review written " + place.reviews[1].relative_time_description + "</p></div></div><div class='row'><div class='col-12'><p style='font-size:14px;'>" + place.reviews[1].text + "</p></div></div></div>";
            drawStar(Math.floor(place.rating), 'stars'+place.name);
            drawStar(place.reviews[0].rating, 'review1stars'+place.name);
            drawStar(place.reviews[1].rating, 'review2stars'+place.name);
        }
    }
}