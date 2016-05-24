// Reference to Google Map Sample https://developers.google.com/maps/documentation/javascript/examples/map-geolocation

// MapStyles
var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
          {
              "color": "#0b3d51"
          },
          {
              "lightness": 16
          }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
]
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7713451, lng: -73.9882315},
    styles: styles,
    scrollwheel: false,
    zoom: 12
  });

  // for user to find move the map center to their current location
  var geoloccontrol = new klokantech.GeolocationControl(map, 16);

  // If user allows geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(currentPosition)
        cMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: currentPosition,
        animation: google.maps.Animation.DROP,
        icon: '../img/yellowdot.png'
      });
      cMarker.addListener('click', toggleBounce);
    },
    function() {
      handleLocationError(true, marker, map.getCenter());
    });
  }else {
    // Browser doesn't support Geolocation
    handleLocationError(false, marker, map.getCenter());
  } // end navigator geolocation


  // address autocomplete for pick up address
  var input = document.getElementById('pickup_address');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var pMarker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  var infowindow = new google.maps.InfoWindow();
  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    pMarker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    pMarker.setIcon(/** @type {google.maps.Icon} */({
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      animation: google.maps.Animation.DROP,
      url: '../img/reddot.png'

    }));
    pMarker.setPosition(place.geometry.location);
    pMarker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, pMarker);

    google.maps.event.addListener(pMarker, 'click', function() { // Add a Click Listener to our marker
     infowindow.close();
     infowindow.open(map,pMarker); // Open the InfoWindow
    });

  });


  // to get all the donors data
  var parsedData = JSON.parse(localStorage.donateit);
  var donorsArray = [];

  // get all the donor info from the database
  parsedData.forEach((donors) =>{
    donorsArray.push({
      donor_id: donors.donor_id,
      address: donors.pickup_address,
      category: donors.category,
      desc: donors.item_description,
      name: donors.name,
      email: donors.email
    });
  });

var address;
donorsArray.forEach((donorinfo) =>{
  decodeAddress(donorinfo);
});

}// end initMap

function decodeAddress(donorinfo){
  address = {'address': donorinfo.address};
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode(address, function (results, status) {
   var lat = results[0].geometry.location.lat();
   var lng = results[0].geometry.location.lng();
   var origin = new google.maps.LatLng(lat, lng);

    // to check the status
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('in geo coder');
      map.setCenter(results[0].geometry.location);
        var aMarker = new google.maps.Marker({
          map: map,
          draggable: true,
          position: origin,
          animation: google.maps.Animation.DROP,
          icon: '../img/reddot.png'
        });

          var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
            content:"<p>Name: "+donorinfo.name+" Email: "+donorinfo.email+"<br>"+"Address "+donorinfo.address+"<br>"+"Category: "+donorinfo.category+"</p><p>"+"Item desc: "+donorinfo.desc+"</p>" // HTML contents of the InfoWindow
          });

           google.maps.event.addListener(aMarker, 'click', function() { // Add a Click Listener to our marker
            infowindow.open(map,aMarker); // Open the InfoWindow
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
      }
   });
 }

function toggleBounce() {
  if (cMarker.getAnimation() !== null) {
    cMarker.setAnimation(null);
  } else {
    cMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
