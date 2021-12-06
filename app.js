const input = document.getElementById('ip');
const submit = document.getElementById('btn');
const text = document.querySelector('.input-text');

// Map
var map = L.map('map').setView([42.097, -79.23], 13);
var marker = L.marker([42.096, -79.236]).addTo(map);

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

submit.addEventListener('click', e => {
    e.preventDefault();
    input.value = '';
});