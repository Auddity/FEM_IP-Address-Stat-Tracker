const input = document.getElementById('ip');
const submit = document.getElementById('form');
const text = document.querySelector('.input-text');

const ipDisplay = document.getElementById('ip-value');
const locationDisplay = document.getElementById('location-value');
const timezoneDisplay = document.getElementById('utc-value');
const ispDisplay = document.getElementById('isp-value');

const url = `https://geo.ipify.org/api/v2/country?apiKey=at_MymqsTtuG8SAD5sJKUXPTV80DVOkG&ipAddress=`;

// Geolocation
const getIpData = e => {
    e.preventDefault();
    const search = input.value;

    if(search) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_MymqsTtuG8SAD5sJKUXPTV80DVOkG&ipAddress=${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                ipDisplay.textContent = `${data.ip}`;
                locationDisplay.textContent = `${data.location.region}`;
                timezoneDisplay.textContent = `UTC ${data.location.timezone}`
                ispDisplay.textContent = `${data.isp}`;
            });
    } else {
        alert('Enter valid search term')
    }

    input.value = '';
};  

// Map
let map = L.map('map').setView([42.097, -79.23], 13);
let marker = L.marker([42.096, -79.236]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXVkZGl0eSIsImEiOiJja3dwNHNrYm0wOWFyMnVxa2FsYThzeWRzIn0.kABzAZLo21TAdRYScR26Mg'
}).addTo(map);

// Event Listeners
input.addEventListener('focus', () => {
    text.style.display = 'none';
});
input.addEventListener('blur', () => {
    text.style.display = 'block';
})

submit.addEventListener('submit', getIpData);