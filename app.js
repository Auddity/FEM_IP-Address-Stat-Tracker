const input = document.getElementById('ip');
const submit = document.getElementById('form');
const text = document.querySelector('.input-text');

const ipDisplay = document.getElementById('ip-value');
const locationDisplay = document.getElementById('location-value');
const timezoneDisplay = document.getElementById('utc-value');
const ispDisplay = document.getElementById('isp-value');

const mapContainer = document.querySelector('.map-container');

let lat;
let long;

// Display
const display = (data) => {
    ipDisplay.textContent = `${data.ip}`;
    locationDisplay.textContent = `${data.location.region}`;
    timezoneDisplay.textContent = `UTC ${data.location.timezone}`
    ispDisplay.textContent = `${data.isp}`;
}

// Location On Load
const getLocOnLoad = (lat, long) => {
    fetch(`http://localhost:8000/geoloc`)
        .then(res => res.json())
        .then(data => {
            lat = data.location.lat;
            long = data.location.lng;
            newMap(lat, long);
            display(data);
        }).catch(err => {
            console.log(err)
            alert(err)
        });
};

// IP Data 
const getIpData = () => {
    const search = input.value;
    
    if(search) {
        fetch(`http://localhost:8000/geoloc/:${search}`)
        .then(res => res.json())
        .then(data => {
            lat = data.location.lat;
            long = data.location.lng;
            newMap(lat, long);
            display(data);
        }).catch(err => {
            alert(err)
            newMap(lat, long);
        })} else {
            alert('Search cannot be empty');
        }

    input.value = '';
};  

// Map
const newMap = (lat, long) => {
    let mapEl = document.createElement('div');
    mapEl.classList.add('map');
    mapEl.id = 'map';
    mapContainer.appendChild(mapEl);

    let map = L.map('map').setView([lat, long], 13);
    let marker = L.marker([lat, long]).addTo(map);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // Will only work with one URL
        accessToken: 'pk.eyJ1IjoiYXVkZGl0eSIsImEiOiJja3dwNHNrYm0wOWFyMnVxa2FsYThzeWRzIn0.kABzAZLo21TAdRYScR26Mg'
    }).addTo(map);
};

// Check for Map After Search
const checkForMap = e => {
    e.preventDefault();
    if(map != null) {
        map.remove();
    } 
    getIpData();
}

// Event Listeners
input.addEventListener('focus', () => {
    text.style.display = 'none';
});
input.addEventListener('blur', () => {
    text.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', getLocOnLoad(lat, long));
submit.addEventListener('submit', checkForMap);