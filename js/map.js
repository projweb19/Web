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

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', autoSugg);

}

function autoSugg () {
  var options = {
      maxResults: 6,
      map: map
  };
  var manager = new Microsoft.Maps.AutosuggestManager(options);
  manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
}

function selectedSuggestion(suggestionResult) {
    map.entities.clear();
    map.setView({ bounds: suggestionResult.bestView });
    pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location, {'draggable': true, color: 'cyan'});
    Microsoft.Maps.Events.addHandler(pushpin, 'dragend', function () { pushpinLocation(); });
    map.entities.push(pushpin);

    document.getElementById('printoutPanel').innerHTML =
                        'Suggestion: ' + suggestionResult.formattedSuggestion +
                            '<br> Lat: ' + suggestionResult.location.latitude +
                            '<br> Lon: ' + suggestionResult.location.longitude;


}


function createPushPin (e) {
  if (e.targetType == "map") {
     var point = new Microsoft.Maps.Point(e.getX(), e.getY());
     var locTemp = e.target.tryPixelToLocation(point);
     var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);

     map.entities.remove(pushpin);
     pushpin = new Microsoft.Maps.Pushpin(location, {'draggable': true, color: 'cyan'});
     map.entities.push(pushpin);
     Microsoft.Maps.Events.addHandler(pushpin, 'dragend', function () { pushpinLocation(); });
     pushpinLocation();

  }

}

function highlight(e) {
  //alert("&");
}

function pushpinLocation () {
  //alert(pushpin.getLocation().latitude + "\n" + pushpin.getLocation().longitude);
}
