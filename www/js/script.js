var mymap = L.map('mapid').setView([50.37039039587762, -4.142532348632813], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'chrisboothplymuni/ck6vyoaey085d1iplyo2njs25',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hyaXNib290aHBseW11bmkiLCJhIjoiY2s2Z3pvcTJjMGM1ZDNkcDg5OG0xMXV1byJ9.1C8-bGFiANy_BxzCNfYA5A'
}).addTo(mymap);


var latField = document.querySelector('#latField');
var lngField = document.querySelector('#lngField');
var w3wField = document.querySelector('#w3wField');

function onMapClick(e) {
    latField.value = e.latlng.lat;
    lngField.value = e.latlng.lng;

    fetch(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${e.latlng.lat}%2C${e.latlng.lng}&key=7144Y07L`)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            w3wField.value = myJson.words;
        });
}

mymap.on('click', onMapClick);

const queryString = window.location.search;
if (queryString == '?success') {
    alert('Location Saved');
}

var seedIcon = L.icon({
    iconUrl: '../assets/img/seedIcon.png',
    iconSize: [38, 38]
});

fetch('/api/getMarkers').then((response) => {
    return response.json();
}).then((myJson) => {
    myJson.forEach((loc) => {
        var marker = L.marker([loc.latitude, loc.longitude], { icon: seedIcon }).addTo(mymap);
    });
})

