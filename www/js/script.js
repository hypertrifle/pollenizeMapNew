
var addSeedModal = document.getElementById("addSeedModal");
window.onclick = function (event) {
    if (event.target == addSeedModal) {
        addSeedModal.style.display = "none";
    }
}

const queryString = window.location.search;
if (queryString == '?success') {
    alert('Location Saved');
}

var mymap = L.map('mapid').setView([50.37039039587762, -4.142532348632813], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'fooldome/ck0xrpybh0rzq1crp6narwuyl',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZm9vbGRvbWUiLCJhIjoiY2pxcHJyb2c1MDBzajQzbzZoM2dlaHRkeiJ9.CDXrbrpZqfi6A5bg5mX9TA'
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

    addSeedModal.style.display = "block";
}

mymap.on('click', onMapClick);


//Create Seed Pack Icons and GET from API

var seedPacket1 = L.icon({
    iconUrl: '../assets/img/seedPacket1.png',
    iconSize: [38, 38]
});

var seedPacket2 = L.icon({
    iconUrl: '../assets/img/seedPacket2.png',
    iconSize: [38, 38]
});

var seedPacket3 = L.icon({
    iconUrl: '../assets/img/seedPacket3.png',
    iconSize: [38, 38]
});

var seedPacket4 = L.icon({
    iconUrl: '../assets/img/seedPacket4.png',
    iconSize: [38, 38]
});

fetch('/api/getMarkers').then((response) => {
    return response.json();
}).then((myJson) => {
    myJson.forEach((loc) => {
        if (loc.seedPacketColor === 'seedPacket1') {
            L.marker([loc.latitude, loc.longitude], { icon: seedPacket1 }).addTo(mymap);
        } else if (loc.seedPacketColor === 'seedPacket2') {
            L.marker([loc.latitude, loc.longitude], { icon: seedPacket2 }).addTo(mymap);
        } else if (loc.seedPacketColor === 'seedPacket3') {
            L.marker([loc.latitude, loc.longitude], { icon: seedPacket3 }).addTo(mymap);
        } else if (loc.seedPacketColor === 'seedPacket4') {
            L.marker([loc.latitude, loc.longitude], { icon: seedPacket4 }).addTo(mymap);
        }
    });
})


//Create Hive Icons and GET from API

var genesis = L.icon({
    iconUrl: '../assets/img/hiveIcons/genesis.png',
    iconSize: [52, 60]
});

var pml = L.icon({
    iconUrl: '../assets/img/hiveIcons/pml.png',
    iconSize: [52, 60]
});

var rwy = L.icon({
    iconUrl: '../assets/img/hiveIcons/rwy.png',
    iconSize: [52, 60]
});

var column = L.icon({
    iconUrl: '../assets/img/hiveIcons/column.png',
    iconSize: [52, 60]
});

fetch('/api/getHives').then((response) => {
    return response.json();
}).then((myJson) => {
    myJson.forEach((loc) => {
        if (loc.icon === 'column') {
            L.marker([loc.latitude, loc.longitude], { icon: column }).addTo(mymap);
        } else if (loc.icon === 'genesis') {
            L.marker([loc.latitude, loc.longitude], { icon: genesis }).addTo(mymap);
        } else if (loc.icon === 'pml') {
            L.marker([loc.latitude, loc.longitude], { icon: pml }).addTo(mymap);
        } else if (loc.icon === 'rwy') {
            L.marker([loc.latitude, loc.longitude], { icon: rwy }).addTo(mymap);
        }
    });
})


