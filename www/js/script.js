// var VistryOne = [
//     {x: 50.3771352438394, y: -4.048017492325089},
//      {x: 50.365603515737334, y:-4.065981969297147},
//      {x: 50.36234870952577, y:-4.05009856060597},
//      {x: 50.36098247105598, y:-4.036612576636438},
//      {x: 50.36506290058305, y:-4.013304261775685},
//      {x: 50.38007660496905, y:-4.023966083349215}
//  ]




 var vistryLocations = [
    [
        {x: 50.3771352438394, y: -4.048017492325089},
         {x: 50.365603515737334, y:-4.065981969297147},
         {x: 50.36234870952577, y:-4.05009856060597},
         {x: 50.36098247105598, y:-4.036612576636438},
         {x: 50.36506290058305, y:-4.013304261775685},
         {x: 50.38007660496905, y:-4.023966083349215}
     ],

    //Park Gate
    [
        {x: 52.415575765065824, y: -2.2217155194187366},
        {x: 52.41376962923729, y: -2.213990757455846},
        {x: 52.41405756889084, y: -2.2122741436863147},
        {x: 52.413324627893104, y: -2.2112870907688342},
        {x: 52.40905762236899, y: -2.2151494717502795},
        {x: 52.407853362072544, y: -2.2178960537815295},
        {x: 52.40887436748823, y: -2.220556805124303},
        {x: 52.40565419321642, y: -2.2223163342380725},
        {x: 52.40604690998161, y: -2.2236896252536975},
        {x: 52.40918851824626, y: -2.222058842172643},
        {x: 52.40955502463611, y: -2.2238612866306506},
        {x: 52.41285344510512, y: -2.22162968873026},
    ],
    [

    //Romney House, Romney Avenue, Lockleaze
        {x: 51.49568930697953, y: -2.55948694612516},
        {x: 51.49602995965467, y: -2.5615790691567764},
        {x: 51.49527517676927, y: -2.5626948681069717},
        {x: 51.49506811025321, y: -2.5628289785577163},
        {x: 51.49372215497093, y: -2.5602701511575088},
        {x: 51.49348168234903, y: -2.559261640567909},
        {x: 51.49373217463599, y: -2.5578239765359267},
    ],
    [
    //ALPHINGTON South West
        {x: 50.69091560717377, y: -3.522111217504178},
        {x: 50.69076607830722, y: -3.523012439733182},
        {x: 50.689202793437204, y: -3.5238922042900667},
        {x: 50.68905325911118, y: -3.526402751928006},
        {x: 50.688346363117795, y: -3.5271108551079378},
        {x: 50.68778899530549, y: -3.5238922042900667},
        {x: 50.6864023442153, y: -3.5232699317986116},
        {x: 50.68651110264466, y: -3.5226047439629182},
        {x: 50.6874219445935, y: -3.5223257942253694},
        {x: 50.69020873924211, y: -3.5218966407829866},
    ],
    [
    //Blackberry Hill Hosptial
        {x: 51.484616032020135, y: -2.5352135828288436},
        {x: 51.48395459716468, y: -2.533979766681993},
        {x: 51.482778689288125, y: -2.535224311664903},
        {x: 51.48261833586469, y: -2.5404599836619735},
        {x: 51.48428865637162, y: -2.5405136278422713},
        {x: 51.48429199695137, y: -2.5356212785991072},
    ]
]


//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}


function getIconForLocation(location){

    if(location.latitude && location.longitude){
        //check resides with geo fence.for each defined vistry boundry.
        for(var i =0; i < locations.length;i++ ){
            if(isPointInPoly(locations[i],{x:parseFloat(location.latitude),y:parseFloat(location.longitude)})){
                return {icon: `../assets/img/vistry/seedPacket0.png`,iconSize:[100, 57]}
            }
        }
    }
    return {icon: `../assets/img/seedPacket0.png`,iconSize:[50, 57]}
}


//Modal Control
var addSeedModal = document.getElementById("addSeedModal");
var welcomeModal = document.getElementById("welcomeModal");
window.onclick = function (event) {
    welcomeModal.style.display = "none";
    if (event.target == addSeedModal) {
        addSeedModal.style.display = "none";
    }
}

//Control for first visit pop-up
window.onload = (event) => {
    if (!sessionStorage.getItem('firstVisit')) {
        welcomeModal.style.display = "block";
        sessionStorage.setItem('firstVisit', 'visited');
    }

};

//Successful Save Message on redirect to ?success
const queryString = window.location.search;
if (queryString == '?success') {
    alert('Location Saved');
    window.location.search = '';
}

//Map Init
var mymap = L.map('mapid').setView([50.37039039587762, -4.142532348632813], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'fooldome/ck0xrpybh0rzq1crp6narwuyl',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZm9vbGRvbWUiLCJhIjoiY2pxcHJyb2c1MDBzajQzbzZoM2dlaHRkeiJ9.CDXrbrpZqfi6A5bg5mX9TA'
}).addTo(mymap);



//Populate Add Seed Form on Click
var latField = document.querySelector('#latField');
var lngField = document.querySelector('#lngField');
var w3wField = document.querySelector('#w3wField');

function onMapClick(e) {
    latField.value = e.latlng.lat;
    lngField.value = e.latlng.lng;
    //Fetch form what 3 words api
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

fetch('/api/getMarkers').then((response) => {
    return response.json();
}).then((myJson) => {
    myJson.forEach((loc) => {
        var {icon, iconSize} = getIconForLocation(loc);
        var seedPacket = L.icon({
            iconUrl: icon,
            iconSize: iconSize,
            className: 'rewildingSeedsLayer'
        });

        L.marker([loc.latitude, loc.longitude], { icon: seedPacket }).addTo(mymap);
    });
})


//Create Hive Icons and GET from API

var genesis = L.icon({
    iconUrl: '../assets/img/hiveIcons/genesis.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var pml = L.icon({
    iconUrl: '../assets/img/hiveIcons/pml.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var rwy = L.icon({
    iconUrl: '../assets/img/hiveIcons/rwy.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var column = L.icon({
    iconUrl: '../assets/img/hiveIcons/column.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var kings = L.icon({
    iconUrl: '../assets/img/hiveIcons/kings.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var theatre = L.icon({
    iconUrl: '../assets/img/hiveIcons/theatre.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var box = L.icon({
    iconUrl: '../assets/img/hiveIcons/box.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var mba = L.icon({
    iconUrl: '../assets/img/hiveIcons/mba.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var nma = L.icon({
    iconUrl: '../assets/img/hiveIcons/nma.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
});

var newIcon = L.icon({
    iconUrl: '../assets/img/hiveIcons/new.png',
    iconSize: [52, 60],
    className: 'hivesLayer'
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
        else if (loc.icon === 'kings') {
            L.marker([loc.latitude, loc.longitude], { icon: kings }).addTo(mymap);
        }
        else if (loc.icon === 'theatre') {
            L.marker([loc.latitude, loc.longitude], { icon: theatre }).addTo(mymap);
        }
        else if (loc.icon === 'box') {
            L.marker([loc.latitude, loc.longitude], { icon: box }).addTo(mymap);
        }
        else if (loc.icon === 'mba') {
            L.marker([loc.latitude, loc.longitude], { icon: mba }).addTo(mymap);
        }
        else if (loc.icon === 'nma') {
            L.marker([loc.latitude, loc.longitude], { icon: nma }).addTo(mymap);
        }
        else {
            L.marker([loc.latitude, loc.longitude], { icon: newIcon }).addTo(mymap);
        }
    });
})


//Create Seed Shop Icons and GET from API
var seedShop = L.icon({
    iconUrl: '../assets/img/seedShopIcons/seedShopIcon.png',
    iconSize: [52, 60],
    className: 'seedShopsLayer'
});

fetch('/api/getSeedShops').then((response) => {
    return response.json();
}).then((myJson) => {
    myJson.forEach((loc) => {
        console.log(loc);
        L.marker([loc.latitude, loc.longitude], { icon: seedShop }).addTo(mymap);
    });
})

//Layers Menu Controls

var linksTrigger = document.querySelector('#linksTrigger');
var links = document.querySelector('.links');
linksTrigger.addEventListener('click', () => {
    linksTrigger.classList.toggle('active');
    links.classList.toggle('open');
})

var layerControls = document.querySelectorAll('.layerControl');
layerControls.forEach(layerControl => {
    layerControl.addEventListener('click', () => {
        layerControl.classList.toggle('layerHidden');
    })
})

const rewildingLayerControl = document.querySelector('#rewildingLayerControl');
const hivesLayerControl = document.querySelector('#hivesLayerControl');
const seedShopsLayerControll = document.querySelector('#rewildingLayerControl');

rewildingLayerControl.addEventListener('click', () => {
    var rewildingSeedsLayerMarkers = document.querySelectorAll('.rewildingSeedsLayer');
    rewildingSeedsLayerMarkers.forEach(rewildingSeedsLayerMarker => {
        rewildingSeedsLayerMarker.classList.toggle('hideLayer');
    })
})

hivesLayerControl.addEventListener('click', () => {
    var hivesLayerMarkers = document.querySelectorAll('.hivesLayer');
    hivesLayerMarkers.forEach(hivesLayerMarker => {
        hivesLayerMarker.classList.toggle('hideLayer');
    })
})

seedShopsLayerControl.addEventListener('click', () => {
    var seedShopsLayerMarkers = document.querySelectorAll('.seedShopsLayer');
    seedShopsLayerMarkers.forEach(seedShopsLayerMarker => {
        seedShopsLayerMarker.classList.toggle('hideLayer');
    })
})

