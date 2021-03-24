if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken = "pk.eyJ1IjoibmljaG9mZXJleiIsImEiOiJja2R6MGozYjkyZmpoMzBscTBweHg1dWRjIn0.0hLtqRVLovWKojOT_EWixQ";
getPlaces();


function createMap(places) {
  console.log(places);
  var layerIDs = []; // Will contain a list used to filter against.
  var filterInput = document.getElementById("filter-input");
  var filterGroup = document.getElementById("filter-group");
  var text = document.getElementsByClassName("text")

  
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/nichoferez/ckdz0rnb4001a19ogq8bdc0a4",
    center: [-73.960806, 40.751098],
    zoom: 11,

  });

var chapters = {

'sincerely': {
duration: 4000,
center: [-73.94427940249443, 40.686007742352075],
zoom: 18,

},
'start': {

center: [-73.960806, 40.751098],

zoom: 11,

},
'description': {
  center: [-73.960806, 40.751098],

zoom: 11,
}


};

// On every scroll event, check which element is on screen
document.getElementById("newbox").onscroll = function () {
var chapterNames = Object.keys(chapters);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};
 
var activeChapterName = 'start';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
map.flyTo(chapters[chapterName]);
 
document.getElementById(chapterName).setAttribute('class', 'active');
document.getElementById(activeChapterName).setAttribute('class', '');
 
activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}



var resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", function(event) {
  var inputs =  document.querySelectorAll(".filter_group_div input")
  console.log(inputs)

  inputs.forEach(function(input) {
    input.checked = false;
    var layerID = input.id;

    map.setLayoutProperty(
      layerID,
      "visibility",
      "none"
      )
  })
})

var selectAllButton = document.getElementById("select-all");
selectAllButton.addEventListener("click", function () {
  var inputs = document.querySelectorAll(".filter_group_div input")
  inputs.forEach(function(input) {
    input.checked = true;
    var layerID = input.id;

    map.setLayoutProperty(layerID, "visibility", "visible")
  })
})

  
  map.on("load", function () {
    map.addSource("places", {
      type: "geojson",
      data: places
    }); 



  map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
types: 'postcode'
})

);
    

  
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    ); //closed tag 6

  
    places.features.forEach(function (feature) {
      var symbol = feature.properties["icon"];
      var categories = feature.properties["category"];
      var layerID = "poi-" + symbol + categories;
  
      if (!map.getLayer(layerID)) {
        map.addLayer({
          id: layerID,
          type: "symbol",
          source: "places",
          layout: {
            "icon-image"          : symbol + "-15",
            "icon-allow-overlap"  : true,
  
            "text-field"          : categories,
            "text-font"           : ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-size"           : 11,
            "text-transform"      : "uppercase",
            "text-letter-spacing" : 0.05,
            "text-offset"         : [0, 1.5],
          },
          paint: {
            "text-color"      : "#202",
            "text-halo-color" : "white",
            "text-halo-width" : 2,
          },
          filter: ["==", "icon", symbol],
        });
  
        function createPopUp(currentFeature) {
          var popUps = document.getElementsByClassName("mapboxgl-popup");
          /** Check if there is already a popup on the map and if so, remove it */
          if (popUps[0]) popUps[0].remove();
  
          var popup = new mapboxgl.Popup({
            closeOnClick: false,
          })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(
              "<h3></h3>" +
                "<h4>" +
                currentFeature.properties.description +
                "</h4>"
            )
            .addTo(map);
        } //close tag for currentfeature
  
        function flyToStore(currentFeature) {
          map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15,
          });
        } //close tag for function
  
        map.on("click", function (e) {
          /* Determine if a feature in the "locations" layer exists at that point. */
          var features = map.queryRenderedFeatures(e.point, {
            layers: [layerID],
          }); //closetag for features
  
          /* If yes, then: */
          if (features.length) {
            var clickedPoint = features[0];
  
            /* Fly to the point */
            flyToStore(clickedPoint);
  
            /* Close all other popups and display popup for clicked store */
            createPopUp(clickedPoint);
  
            /* Highlight listing in sidebar (and remove highlight for all other listings) */
          }
        }); //close tag for entire maponclick
        map.on("mouseenter", layerID, function () {
          map.getCanvas().style.cursor = "pointer";
        }); //close function
  
        map.on("mouseleave", layerID, function () {
          map.getCanvas().style.cursor = "";
        }); //closefunction
  

$('input:text').attr('placeholder','Zipcode');

  
        var div = document.createElement('div');
        div.classList.add('filter_group_div');


  
        var reset = document.getElementsByClassName("reset");
     var selectall = document.getElementsByClassName("selectall");

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = layerID;
        input.checked = true;

// $('input[type=checkbox]').prop('checked',false);
    
    
        div.appendChild(input);










        var label = document.createElement("label");
        label.setAttribute("for", layerID);
        label.textContent = categories;
        div.appendChild(label);
        filterGroup.appendChild(div);



  
        input.addEventListener("change", function (e) {
          map.setLayoutProperty(
            layerID,
            "visibility",

            e.target.checked ? "visible" : "none"
          );
        });



// var reset = document.getElementsByClassName("reset");
// var selectall = document.getElementsByClassName("selectall");









// reset.onclick =  

//           map.setLayoutProperty(
//             layerID,
//             "visibility",

//             input.checked ? "visible" : "none"
//           );

  
// selectall.onclick =   


//           map.setLayoutProperty(
//             layerID,
//             "visibility",

//             input.checked ? "visible" : "none"
//           );
        




// $(document).ready(function(){
// $(".reset").click(function(){
// $('input[type=checkbox]').prop('checked',false);
// $("map.").toggle();
// });
// });

// $(document).ready(function(){
// $(".selectall").click(function(){
// $('input[type=checkbox]').prop('checked',true);
// $("").toggle();
// });
// });

      }
    });

  });

 function toggleSidebar(id) {
var elem = document.getElementById(id);
var classes = elem.className.split(' ');
var collapsed = classes.indexOf('collapsed') !== -1;
 
var padding = {};
 
if (collapsed) {
// Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
classes.splice(classes.indexOf('collapsed'), 1);
 
padding[id] = 250; // In px, matches the width of the sidebars set in .sidebar CSS class

} else {
padding[id] = 0;
// Add the 'collapsed' class to the class list of the element
classes.push('collapsed');
 

}
 
// Update the class list on the element
elem.className = classes.join(' ');
}
map.on('load', function () {
toggleSidebar('left');
});

}



function getPlaces() {
  var features_data = [];
  var url = "https://script.google.com/a/name-glo.com/macros/s/AKfycbxFhTDp_BUkkdklwvHxaon6AaBTL_4zOaIoPkodRg/exec";

  fetch(url).then(response => {
    response.json().then(result => {
      var obj = result;
      for(var key in obj) {
        var category = key;
        console.log(category);
        var boroughs = obj[key]['boroughs'];
        for(var j in boroughs) {
          for(var k = 0; k < boroughs[j].length; k++) {
            var row = boroughs[j][k];
            var address       = row['adderess'];
            var owner         = row['owner'];
            var lat           = parseFloat(row['lat']);
            var long          = parseFloat(row['long']);
            var website       = row['website'];
            var icon          = row['icon'];
            var business_name = row['business'];
            var marker        = row['markers'];
            var maps          = row['maps'];

            if(category.toUpperCase() == 'WELLNESS')
              icon = 'hospital';
            else if(category.toUpperCase() == 'VEGAN')
              icon = 'restaurant';
            else if(category.toUpperCase() == 'BEAUTY')
              icon = 'monument'

            var feature = {
              type: "Feature",
              properties: {
                description:  '<strong>' + business_name + '</strong>'+
            '<img src="' + icon + '" alt="">' +
                              '<p>Owner: '+
                              '<b>' + owner + '</b>' + '<br>' +

                               '<a href="' + maps + 
                               '" target=_blank" title="Opens in a new window">' + 
                               '<i>' + 

                               
                              address + '</i>'+'</a>'+ '<br>' +

                              '<a href="http://' + 
                              website +
                              '" target=_blank" title="Opens in a new window">' + 
                              '<b>' + website + '</b>' + 
                              '</a>' + '<br>' +

                            '</p>',
                icon: marker,
                category: category
              },
              geometry: {
                type: "Point",
                coordinates: [lat, long]
              }
            };
            features_data.push(feature);
          }
        }
      }
      var places = {
        type: "FeatureCollection",
        features: features_data
      };
      createMap(places);
    })
  }).catch(e => {
    console.log(e);
  })
}















