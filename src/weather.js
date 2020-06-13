const COORDINATES = "coordinates";
const API_KEY = "5d89c497bb40c3ac4100a842fdd5c3ec";
const weather = document.querySelector(".js-weather");
const localPlace = document.querySelector(".js-location");

function getWeather(lat,lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}`;
        localPlace.innerText = `${place}`;
    });
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    }
    getWeather(latitude,longitude);
    localStorage.setItem(COORDINATES,JSON.stringify(coordsObj));
}

function handleGeoError() {
    weather.innerText = "Location and Weather not found error";
}

function askForCoordinate() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoordinate() {
    const loadedCoordinates = localStorage.getItem(COORDINATES);
    if(loadedCoordinates === null) {
        askForCoordinate();
    } else {
    const parseCoords = JSON.parse(loadedCoordinates)
    getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}





function init() {
    loadCoordinate();
}
init();