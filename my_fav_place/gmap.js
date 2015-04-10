$(function() {

  var MAP_OPTIONS = {
    zoom: 15,
    center: { lat: 0, lng: +40},
  };

  var handlers = {

    markerMaker: function (place, locationLat, locationLng){

    var place = place;
    var locationLat =locationLat;
    var locationLng = locationLng;

      
    var marker = new google.maps.Marker({
      position: { lat: locationLat, lng: locationLng },
      map: map,
      title: place,
      animation: google.maps.Animation.DROP,
      infowindow:  new google.maps.InfoWindow({ content: place })
    });

    google.maps.event.addListener(marker, 'click', function() { 
      marker.infowindow.open(map, marker); 
      toggleBounce(marker);
    });

    mapMarkers.push(marker);
    }
  }

  var mapMarkers = [];

  var map = new google.maps.Map($('#map-canvas').get(0), MAP_OPTIONS);

  function toggleBounce(marker) {
    if (marker.getAnimation() != null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  //plots locations from html
  $('.location').each(function(){

    var $location = $(this);
    var locationLat = +$location.data('lat');
    var locationLng = +$location.data('lng');
    var place = $location.text();

    handlers.markerMaker(place, locationLat, locationLng);

  });

  //remove marker when checkbox in 
  $('.location').on('click', 'input', function(event) {
    title = $(this).closest('li').text();
    if ($(this).is(':checked')) {
      mapMarkers.filter(function(marker,index){ return marker.title === title })[0].setMap(map);
    } else{
      mapMarkers.filter(function(marker,index){ return marker.title === title })[0].setMap(null);
    };
  });

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are here!'
      });

      // handlers.markerMaker('Current Location', pos.k, pos.D );
      map.setCenter(pos);
    });
  }


});
