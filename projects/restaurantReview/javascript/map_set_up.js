var map, infoWindow, panorama;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 13,
        scaleControl: true,
        streetViewControl: true,
        fullscreenControl: true, 
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        
    });



    //this enables the search function for places

    var input = document.getElementById('searchValue');
    var autocomplete = new google.maps.places.Autocomplete(input);

    var input2 = document.getElementById('searchValue2');
    var autocomplete2 = new google.maps.places.Autocomplete(input2);

    var input3 = document.getElementById('searchValue3');
    var autocomplete3 = new google.maps.places.Autocomplete(input3);


    //    this part loops through the restauarants in the list and creates a marker for them

    //    ChIJw8dAspMMdkgR0X5-x2BfouQ - placeId for current location


    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    map.addListener('center_changed', performSearch);

    //    map.addListener('center_changed', restaurantsRating);


    function performSearch() {
        var request = {
            location: map.center,
            radius: 3000,
            type: ['restaurant'],
        };
        service.nearbySearch(request, callback);
    }


    function callback(results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
        }
        for (var i = 0, result; result = results[i]; i++) {
            addMarker(result);
            restaurantsPlaces.unshift(results[i]);
            if(results[i].rating>0.9 && results[i].rating<2) {
                //                restaurants1 = [];
                restaurants1.unshift(results[i]);
            }
            else if(results[i].rating>1.9 && results[i].rating<3){
                //                restaurants2 = [];
                restaurants2.unshift(results[i]);
            }
            else if(results[i].rating>2.9 && results[i].rating<4){
                //                restaurants3 = [];
                restaurants3.unshift(results[i]);
            }
            else if(results[i].rating>3.9 && results[i].rating<5){
                //                restaurants4 = [];
                restaurants4.unshift(results[i]);
            }
            else if(results[i].rating>4.2){
                //                restaurants5 = [];
                restaurants5.unshift(results[i]);
            }
        }
    }


    function addMarker(place) {
        var placesList = document.getElementById("rest1");
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            icon: "https://static.tacdn.com/img2/maps/icons/pin_lg_Restaurant.png",
        });

        google.maps.event.addListener(marker, 'click', function() {
            var request = {placeId: place.place_id};

            service.getDetails(request, function(result, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }

                placesList.innerHTML = "<div class='container'><div class='row' style='border: 1px solid white'><div class='col-5 mt-3'><img src='" + result.photos[0].getUrl({'maxWidth': 170, 'maxHeight': 80}) + "'></div><div class='col-7 mt-3'><h6 style='float', 'left';>" + result.name + "</h6>" + result.formatted_address + "</div></div><hr><div class='row'><div class='col-3 mt-3'><p>Rating:</p></div><div class='col-9 mt-3'><p id='stars" + result.name + "'></p></div></div><div class='row'><div class='col-6'><button type='button' class='reviewBarButton btn btn-primary mt-1 mb-3' onclick='window.open(&#39" + result.website + "&#39)'>Website</button></div><div class='col-6'><button type='button' class='reviewBarButton btn btn-primary mt-1 mb-3' data-toggle='modal' data-target='#exampleModal' onclick = 'modalReviewForm(&#39" + result.name + "&#39, " + 3 + ")'>Write a review</button></div></div><div class='row'><div class='col-12'><h6 class='mb-5'>User Reviews</h6></div></div><div class='row'><div class='col-4'>" + "<img class='reviewIcon' src='" + result.reviews[0].profile_photo_url + "'></div><div class='col-8'><p id='review1stars1" + result.name + "'></p><p style='font-size: 13px;'>Review written " + result.reviews[0].relative_time_description + "</p></div></div><div class='row'><div class='col-12'><p>" + result.reviews[0].text + "</p></div></div><br><br><div class='row'><div class='col-4'>" + "<img class='reviewIcon' src='" + result.reviews[1].profile_photo_url + "'></div><div class='col-8'><p id='review2stars2" + result.name + "'></p><p style='font-size: 13px;'>Review written " + result.reviews[1].relative_time_description + "</p></div></div><div class='row'><div class='col-12'><p>" + result.reviews[1].text + "</p></div></div></div>";

                drawStar(Math.floor(result.rating), 'stars'+result.name);
                drawStar(result.reviews[0].rating, 'review1stars1'+result.name);
                drawStar(result.reviews[1].rating, 'review2stars2'+result.name);



                infoWindow.setContent("<div id='infoContent'><h6>" + result.name + "</h6><p>"+ result.formatted_address + "</p><p>Telephone Number: " + result.formatted_phone_number + "</p><button onclick='window.open(&#39" + result.website + "&#39)'>Website</button><br></div>");
                infoWindow.open(map, marker);
                //                
                console.log(result);
                console.log(result.url)

                //enables street view

                panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'),
                    {
                        position: {lat: 51.44170, lng: 0.347},
                        pov: {heading: 165, pitch: 0},
                        zoom: 1
                    });


            });
        });

        //        google.maps.event.addListener(marker, 'idle', function(){
        //            rest1.innerHTML="";
        //            for (i in restaurantsPlaces) {
        //                markedRestaurants.push(restaurantsPlaces[i]);
        //            }
        //        })
    }

    map.addListener('dragend', displayText);

    //    function to change center of map, ie change to another city/place

    var searchValueText = document.getElementById('searchValue');

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('searchValue')),
        {types:['geocode']});

    autocomplete.addListener('place_changed', changeLocation);


    function changeLocation(){
        var place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        //        restaurantsRating(restaurantsPlaces, 1, 5);
        //        displayText();
    }


    //function to replicate this for new search bar

    var locationSearchBox = document.getElementById('searchValue2');
    var searchBox = new google.maps.places.SearchBox(locationSearchBox);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationSearchBox);

    searchBox.addListener('place_changed', changeLocation2);

    var searchValueText2 = document.getElementById('searchValue2');

    autocomplete2 = new google.maps.places.Autocomplete(
        (document.getElementById('searchValue2')),
        {types:['geocode']});

    autocomplete2.addListener('place_changed', changeLocation2);

    function changeLocation2(){
        var place2 = autocomplete2.getPlace();
        map.setCenter(place2.geometry.location);
        searchValueText2.value = "";
        //        restaurantsRating(restaurantsPlaces, 1, 5);
        //        displayText();
    }


    //function to replicate this for the navbar

    var searchValueText3 = document.getElementById('searchValue3');

    autocomplete3 = new google.maps.places.Autocomplete(
        (document.getElementById('searchValue3')),
        {types:['geocode']});

    autocomplete3.addListener('place_changed', changeLocation3);


    function changeLocation3(){
        var place3 = autocomplete3.getPlace();
        map.setCenter(place3.geometry.location);
        searchValueText3.value = "";
        //        restaurantsRating(restaurantsPlaces, 1, 5);
        //        displayText();
    }

    map.addListener('tilesloaded', displayText);


    //    for (var i=0; i<restaurants.length; i++) {
    //        var latitude = restaurants[i].lat;
    //        var longitude = restaurants[i].long;
    //        var coords = [latitude,longitude];
    //        var index = restaurants[i];
    //        var bounds = map.getBounds();
    //        var name = restaurants[i].restaurantName;
    //        var review = restaurants[i].reviews;
    //        var marker = new google.maps.Marker({ 
    //            position: {lat: latitude, lng: longitude},
    //            title: restaurants[i].restaurantName,
    //            map: map,
    //            visible: true,
    //            icon: "https://static.tacdn.com/img2/maps/icons/pin_lg_Restaurant.png",
    //            infoWindow: restaurants[i].reviews,
    //        })
    //
    //        var infoContentStuff = "<div id='infoContent'><img src = '/images/" + restaurants[i].restaurantName + ".png'><h3>" + restaurants[i].restaurantName + "</h3><br><br><button><a href="+ restaurants[i].website + ">Website</a></button><button onclick='showStreetView()'>Show Street View</button><button onclick='displayReviewForm("+ restaurants[i].restaurantName + ")'>Submit a Review</button> <br><br> <p>There are " + restaurants[i].reviews.length + " reviews for " + restaurants[i].restaurantName + "</p>" + "<li>" + restaurants[i].reviews[0] + "</li> <li>" + restaurants[i].reviews[1] + "</li></div>";
    //
    //        marker.addListener("click", addInfoWindow(marker, infoContentStuff));
    //    }


    function addInfoWindow(marker, message) {


        var infoWindow = new google.maps.InfoWindow({
            content: message
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);

            //                if (marker.visible = true) {
            //                alert("this is visible");
            //            };
        });  
    }



    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
            var homeMarker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'https://maps.google.com/mapfiles/kml/pal3/icon48.png',
                draggable: true,
            })
            //            var cLocation = document.getElementById('inputCurrentLocation');
            //            cLocation.value = pos;
            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

//Should be possible to delete this altogether 
//map.addListener('dragstart', performSearch);


