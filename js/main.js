
//Variable declarations ========================================================
var map;
var bounds = new google.maps.LatLngBounds();
var origin;
var destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();


//jQuery UI code ========================================================
$("#city1").focus();
$("#submit").click(clickHandler);

$('#city1, #city2').keydown(function(event){    
    if(event.keyCode==13){
       $('#submit').trigger('click');
    }
});

function clickHandler(){
	getCities();
	calculateDistances();
	calcRoute();
}

function getCities() {
    origin = $("#city1").val();
    destination = $("#city2").val();
}
 

//GMaps Code ========================================================

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
  	var options = {
  	  center: new google.maps.LatLng(39.5, -98.35), //http://en.wikipedia.org/wiki/Geographic_center_of_the_contiguous_United_States
  	  zoom: 4
  	};
  	map = new google.maps.Map(document.getElementById('map-canvas'), options);
  	directionsDisplay.setMap(map);
}

function calculateDistances() {
	var service = new google.maps.DistanceMatrixService();
  	service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML = '';

    var results = response.rows[0].elements;

    outputDiv.innerHTML += 'Driving distance between <span id="origin-id">' + origins[0] 
    	+ '</span> and <span id="destination-id">' 
    	+ destinations[0] + '</span>: <span id="driving-distance-id">' + results[0].distance.text + '</span><br>';
  }
}

function calcRoute() {
  var request = {
      origin:origin,
      destination:destination,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);