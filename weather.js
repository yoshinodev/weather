const wDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const wMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "October", "November", "December"];

const iconValue = {
    CLEARDAY: 'clear-day',
    CLEARNIGHT: 'clear-night',
    RAIN: 'rain',
    SNOW: 'snow',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night'
}

//fetch the weather
function fetchWeatherReport(apiKey, latitude, longitude) {
//to avoid the cors issue you need to run through a proxy or make the call server side

var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;

var DsApiLink = `${DsProxyLink}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,alerts,flags`;


}

// fetch the address
function fetchLocation(apiKey, latitude, longitude){
    var googleApiKey = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

    fetch(googleApiLink)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        //work json with data
        document.getElementById("location").innerHTML = data.results[4].formatted_address;
    })
    .catch (err => {
        throw (`Sorry, An error occured ${err}`);
        })
};

// To find the lat and long of the users location
function initGeoLocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, fail)
    } else {
        alert("Sorry, your browser doesn't support geolocation weather.")
    }
}

function success(position){
    // add keys to the api here but it isnt so secure. Or locate in other js file.
    // var dsKey = "";
    // var googleApiKey = "";

    fetchLocation(googleApiKey, position.coords.latitude, position.coords.longitude);
    fetchWeatherReport(dsKey, position.coords.latitude, position.coords.longitude);
}

function fail(){
    // I can default to my fav city
    alert("Sorry, your browser doesn't support geolocation.");
}