// GET GOOGLE API 
google.load("maps", "3", {
    other_params: "sensor=false"
});

// Set path to XML file here and static-map.js
var xmlPath = "xml/markers.xml";

// RUN ONLY WHEN DOM IS READY
(function($) {
    $(function() {

        var infowindow;
        var map;

        function initialize() {
            var bounds = new google.maps.LatLngBounds();
            // Customize map appearance
            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                mapTypeControl: false,
                mapTypeId: 'roadmap',
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL,
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                scaleControl: false,
                streetViewControl: false,
                zoom: 15
            } // end mapOptions();

            // Load the Google map into the #mapCanvas div
            map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);

            var xmlMarkers = xmlPath + "?ts" + "=" + new Date().getTime();
            $.get(xmlMarkers, function(data) {
                $(data).find("hotel").each(function() {
                    var eachMarker = $(this);
                    var hotelCoords = new google.maps.LatLng(
                    parseFloat(eachMarker.find("latitude").text()), parseFloat(eachMarker.find("longitude").text()));
                    var name = eachMarker.find("name").text();
                    var address = eachMarker.find("address").text();
                    var city = eachMarker.find("city").text();
                    var state = eachMarker.find("state").text();
                    var zip = eachMarker.find("zip").text();
                    var url = eachMarker.find("url").text();
                    var html = "<div class='iw'><div>" + "<span class='title'>" + "<a href='" + url + "' target='_blank'>" + name + "</a>" + "</span>" + "<div class='basicinfo'>" + "<div>" + address + ", " + city + ", " + state + ", " + zip + "</div>" + "</div>";
                    var hotelMarker = addHotel(html, hotelCoords);
                    bounds.extend(hotelCoords);
                });

                $(data).find("marker").each(function() {
                    var eachMarker = $(this);
                    var markerCoords = new google.maps.LatLng(
                    parseFloat(eachMarker.find("latitude").text()), parseFloat(eachMarker.find("longitude").text()));
                    var name = eachMarker.find("name").text();
                    var type = eachMarker.find("type").text();
                    var url = eachMarker.find("url").text();
                    var typeClass = eachMarker.find("class").text();
                    var html = "<div class='iw'><div>" + "<span class='title'>" + name + "</span>" + "<div>" + "<span>" + "<a href='" + url + "' target='_blank'>view website »</a>" + "</span>" + "</div>" + "</div>";
                    var marker = addMarker(html, markerCoords, type, typeClass);
                    bounds.extend(markerCoords);
                    // This is needed to set the zoom after fitbounds,
                    map.fitBounds(bounds);
                });
            });

        } // end initialize();

        // Create a marker for each XML entry

        function addMarker(html, markerCoords, type, typeClass) {
            var image = new google.maps.MarkerImage('../../assets/img/marker.png',
            // This marker is 40 pixels wide by 26 pixels tall.
            new google.maps.Size(40, 26),
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 2,24.
            new google.maps.Point(2, 33));

            // Add shadow
            var shadow = new google.maps.MarkerImage('../../assets/img/shadow-hotel-marker.png',
            // This marker is 40 pixels wide by 26 pixels tall.
            new google.maps.Size(71, 34),
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 2,24.
            new google.maps.Point(7, 27));

            // Place the new marker
            var marker = new MarkerWithLabel({
                position: markerCoords,
                draggable: false,
                map: map,
                icon: image,
                //shadow: shadow,
                labelContent: type,
                labelAnchor: new google.maps.Point(2, 34),
                labelClass: typeClass,
                // the CSS class for the label
                labelStyle: {
                    opacity: 1
                }
            }); // end place the new marker

            // Add event listener. On marker click, close all open infoWindows open current infoWindow.
            google.maps.event.addListener(marker, "click", function() {
                if (infowindow) infowindow.close();
                infowindow = new google.maps.InfoWindow({
                    content: html,
                    pixelOffset: new google.maps.Size(0, 0)
                });
                infowindow.open(map, marker);
            }); // end add event listener

            // Display marker
            return marker;

        } // end addMarker();

        function addHotel(html, hotelCoords) {
            var hotelFlag = new google.maps.MarkerImage('../../assets/img/flag_hotel.gif',
            // This marker is 50 pixels wide by 28 pixels tall.
            new google.maps.Size(53, 34),
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at -6,23.
            new google.maps.Point(-6, 23));

             // Add shadow
            var shadow = new google.maps.MarkerImage('../../assets/img/shadow-hotel-marker.png',
            // This marker is 40 pixels wide by 26 pixels tall.
            new google.maps.Size(71, 34),
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 2,24.
            new google.maps.Point(-3, 23));

            // Place the new marker
            var hotelMarker = new MarkerWithLabel({
                position: hotelCoords,
                draggable: false,
                map: map,
                shadow: shadow,
                icon: hotelFlag
            }); // end place the new marker

            // Add event listener. On marker click, close all open infoWindows open current infoWindow.
            google.maps.event.addListener(hotelMarker, "click", function() {
                if (infowindow) infowindow.close();
                infowindow = new google.maps.InfoWindow({
                    content: html
                });

                infowindow.open(map, hotelMarker);
            }); // end add event listener
            // Display marker
            return addHotel;

        } // end addMarker();

        // On page lod, initialize the map
        google.setOnLoadCallback(initialize);
    });
})(jQuery);