var map;
var pushpin = null;
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

    Microsoft.Maps.Events.addHandler(map, 'click',createPushPin );




}

function createPushPin (e) {
  if (e.targetType == "map") {
     var point = new Microsoft.Maps.Point(e.getX(), e.getY());
     var locTemp = e.target.tryPixelToLocation(point);
     var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);

     map.entities.remove(pushpin);
     pushpin = new Microsoft.Maps.Pushpin(location, {'draggable': true});
     map.entities.push(pushpin);
     Microsoft.Maps.Events.addHandler(pushpin, 'drag', function () { highlight(); });
     pushpinLocation();

  }

}

function highlight(e) {
  alert("&");
}

function pushpinLocation () {
  alert(pushpin.getLocation().latitude + "\n" + pushpin.getLocation().longitude);
}
