var map;
var pushpin = null;
var addresse;
var addresseOld;
nbHash = 0;
var tabHash = [];
var tabHashID = [];


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
    document.getElementById("btnHash").addEventListener("click", hashtagAjouter);
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

  locationToAddress ();
  return pushpin.getLocation();
}


function locationToAddress ()  {
    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
    var reverseGeocodeRequestOptions = {
        location: pushpin.getLocation(),
        callback: function (answer, userData) {
          adresse = answer.address
          hashtagCreer();

        }
    };
    searchManager.reverseGeocode(reverseGeocodeRequestOptions);

}

function hashtagCreer () {
  //hashtagVider();
  var ville = document.createElement("BUTTON");
  var pays = document.createElement("BUTTON");
  ville.innerHTML = adresse.locality;
  adresse.locality = adresse.locality.toLowerCase();
  adresse.locality = adresse.locality.replace(/\s/g, '');
  tabHash.push(adresse.locality);
  ville.id = "boutonNum" + nbHash;
  tabHashID.push(ville.id);
  ville.classList.add("hashStyle");
  nbHash++;
  pays.innerHTML = adresse.countryRegion;
  tabHash.push(adresse.countryRegion.toLowerCase());
  pays.id = "boutonNum" + nbHash;
  tabHashID.push(pays.id);
  pays.classList.add("hashStyle");
  nbHash++;
  document.getElementById('printoutHash').appendChild(ville);
  document.getElementById('printoutHash').appendChild(pays);
  document.getElementById(ville.id).addEventListener("click", hashtagSupprimer);
  document.getElementById(pays.id).addEventListener("click", hashtagSupprimer);
  newGalleryFeed();

  //affichetab ();
}

function hashtagAjouter () {
  var btn = document.createElement("BUTTON");
  var texte = prompt("Entrez le hashtag", "");
  if (texte != null && texte != "") {
  	  btn.innerHTML = texte;
  	  btn.innerHTML = btn.innerHTML.replace(/\s/g, '');
	  tabHash.push(btn.innerHTML.toLowerCase());
	  btn.id = "boutonNum" + nbHash;
	  tabHashID.push(btn.id);
	  btn.classList.add("hashStyle");
	  nbHash++;
	  document.getElementById("printoutHash").appendChild(btn);
	  document.getElementById(btn.id).addEventListener("click", hashtagSupprimer);
	  newGalleryFeed();
	  //affichetab ();
  }
}

function hashtagSupprimer () {
  var element = document.getElementById(this.id);
  element.remove();
  tabHash.splice(tabHashID.indexOf(this.id), 1);
  tabHashID.splice(tabHashID.indexOf(this.id), 1);

  newGalleryFeed();
  //affichetab ();
}

function hashtagVider () {
  while (nbHash > 0) {

    var idElem = "boutonNum" + nbHash;
    var element = document.getElementById(idElem);
    tabHash.splice(tabHash.indexOf(element.innerHTML),1);
    element.remove();
    nbHash--;
  }
  nbHash = 0;
}

//Affiche dans la console le contenu du tableau de hastags. Utilisé pour vérifier que le tableau se remplit et se vide correctement.
function affichetab () {
  var contenu = "";
  tabHash.forEach (function(item, index, array) {
  console.log(item, index);
});
}
