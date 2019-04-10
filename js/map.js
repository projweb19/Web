var map;
var pushpin = null;
var address;


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
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', locationToAddress);
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


    map.setView({ bounds: suggestionResult.bestView });
    map.entities.remove(pushpin);
    pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location, {'draggable': true, color: 'cyan'});
    Microsoft.Maps.Events.addHandler(pushpin, 'dragend', function () { pushpinLocation(); });
    map.entities.push(pushpin);
    pushpinLocation();
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

     locationToAddress();

  }
}

function pushpinLocation () {
  //alert(pushpin.getLocation().latitude + "\n" + pushpin.getLocation().longitude);
  document.getElementById('printoutPanel').innerHTML =
                          '<br> Lat: ' + pushpin.getLocation().latitude +
                          '<br> Lon: ' + pushpin.getLocation().longitude;
  return pushpin.getLocation();
}


function locationToAddress ()  {
    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
    var reverseGeocodeRequestOptions = {
        location: pushpin.getLocation(),
        callback: function (answer, userData) {

            document.getElementById('printoutPanel').innerHTML =
                answer.address.formattedAddress;
        }
    };
    searchManager.reverseGeocode(reverseGeocodeRequestOptions);
}
