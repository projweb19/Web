var map;
var pushpin;
function loadMapScenario() {

    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
      center: new Microsoft.Maps.Location(48.85, 2.34),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 5

    });

    map.setOptions({
      zoom: 20,
      minZoom: 3
    });

    Microsoft.Maps.Events.addHandler(map, 'click',getLatlng ); 


}

function getLatlng(e) {
        if (e.targetType == "map") {
           var point = new Microsoft.Maps.Point(e.getX(), e.getY());
           var locTemp = e.target.tryPixelToLocation(point);
           var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);
         alert(locTemp.latitude+"&"+locTemp.longitude);


           var pin = new Microsoft.Maps.Pushpin(location, {'draggable': false});

             map.entities.push(pin);
             alert("Done");

        }
       }
