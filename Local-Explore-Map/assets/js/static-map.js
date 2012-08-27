/*#####################################################
  # STATIC MAP NOTE: Hotel Marker assets are stored in DAY
  # to update marker URL use www.bit.ly to get tiny URL
  # Update var urlMarkerIcon below with the tiny URL
  ####################################################*/

// GET GOOGLE API 
google.load("maps", "3", {
    other_params: "sensor=false"
});

// Set path to XML file here and in google-map.js
var xmlPath = "xml/markers.xml";

// GET URL FOR 'Explore this Hotel' BUTTON IN POPUP.
(function($) {
    $.get(xmlPath, function(data) {
        $(data).find("hotel").each(function() {
            var eachMarker = $(this);
            hotelUrl = eachMarker.find("url").text();
            // Update the URL to the "Explore this Hotel" btn in green content box
                var trimUrl = $.trim(hotelUrl);
                hotelUrl = trimUrl;
                if(!hotelUrl == ""){
                    $(".exploreBtn").attr("href", hotelUrl);
                }else{
                    //Else use link to home page.
                    $(".exploreBtn").attr("href", "http://www.ichotelsgroup.com/hotelindigo/hotels/us/en/reservation");
                }
        });
    });
})(jQuery);
// RUN ONLY WHEN DOM IS READY
(function($) {
    $(function() {        
        var originalHotelSrc;
        $.get(xmlPath, function(data) {
            $(data).find("hotel").each(function() {
                var eachMarker = $(this);
                var hotelCoords = new google.maps.LatLng(
                parseFloat(eachMarker.find("latitude").text()), parseFloat(eachMarker.find("longitude").text()));
                var lat = parseFloat(eachMarker.find("latitude").text());
                var lng = parseFloat(eachMarker.find("longitude").text());
                // Manually offset the lng to correct point position on map
                //If pointer of custom icon is center then use only lng value in urlLatLng below
                var lngOffset = (Number(lng) + 0.0007);
                var urlPrefix = "http://maps.googleapis.com/maps/api/staticmap?";
                var urlMarker = "&markers=";
                //DAY URL for map marker 
                //http://www.ichotelsgroup.com/content/dam/etc/media_library/branded/in/en/us/Indigo_neighborhoods/image.gif
                var urlMarkerIcon = "icon:http://bit.ly/PVNjSd";
                var urlPipe = "%7C";
                var urlSensor = "&sensor=false";
                var urlLatLng = lat + "," + lngOffset;
                var urlMapCenter = "center=" + urlLatLng;
                var urlMapSize = "&size=324x277";
                var imgMapSrc = urlPrefix + urlMapCenter + urlMarker + urlMarkerIcon + urlPipe + urlLatLng;
                originalHotelSrc = imgMapSrc;
                hotelUrl = eachMarker.find("url").text();

            });

            $(data).find("marker").each(function() {
                var eachMarker = $(this);
                var markerCoords = new google.maps.LatLng(
                parseFloat(eachMarker.find("latitude").text()), parseFloat(eachMarker.find("longitude").text()));
                var type = eachMarker.find("type").text();
                var typeClass = eachMarker.find("class").text();
                var lat = parseFloat(eachMarker.find("latitude").text());
                var lng = parseFloat(eachMarker.find("longitude").text());
                var urlMarker = "&markers=";
                //turn color off when using custom markers
                var urlColor = "color:0xe37222";
                // flags for static map
                // Google Static API will only allow 5 unique markers
                /* OFF
                if (typeClass == "buyLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/O4dVPb";
                } else if (typeClass == "doLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/MwGg3J";
                } else if (typeClass == "drinkLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/OLp5r0";
                } else if (typeClass == "hearLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/Nntxel";
                } else if (typeClass == "seeLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/NntAXC";
                } else if (typeClass == "tasteLabel") {
                    var urlMarkerIcon = "icon:http://bit.ly/ONgNBO";
                }
                */
                var urlLabel = "label:" + type.charAt(0);
                var urlPipe = "%7C";
                var urlLatLng = lat + "," + lng;
                var markerSize = "size:tiny"; 
                /* add urlMarkerIcon after urlMarker for custom icons - can only have up to 5 custom markers*/
                imgEachMapSrc = urlMarker + urlColor + urlPipe + urlLatLng;
                originalHotelSrc = originalHotelSrc + imgEachMapSrc;
            });
            var urlMapSize = "&size=324x277";
            var urlSensor = "&sensor=false";
            var scale = "&scale=0";
            // Manually set zoom, 14 or 15 work best
            var urlZoom = "&zoom=15";
            originalHotelSrc = originalHotelSrc + urlMapSize + scale + urlZoom + urlSensor;
            console.log(originalHotelSrc);
            $("#previewMap").attr("src", originalHotelSrc);
        });

    });
})(jQuery);