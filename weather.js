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
function fetchWeatherReport(accKey, latitude, longitude) {
//to avoid the cors issue you need to run through a proxy or make the call server side
let accApiLink = `https://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806&q=lisbon&aqi=yes`
// api url here

fetch(accApiLink)
.then(response => {
    return response.json()
})
.then(data => {
// work with the data
    var resultsHTML = "";
    var tableHTML = "";
    var summary = data.currently.summary;
    var temperature = data.currently.temperature;
    var icon = data.currently.icon;
    var precipProbability = data.currently.precipProbability;
    var humidity = data.currently.windspeed;
    var ts = new Date(data.currently.time * 1000);
    var forecast = `${wDay[ts.getDay()]} ${wMonth[ts.getMonth()]} ${ts.getDate()}`

    //Set values for the current conditions
    // document.getElementById("location").innerHTML = name;
    document.getElementById("dayTime").innerHTML = forecastDate;
    document.getElementById("summary").innerHTML = summary;
    document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&deg`;
    document.getElementById("weatherIcon").src = getICON(icon);
    document.getElementById("perciptation").innerHTML = `Precipitation ${precipProbability*100}%`;
    document.getElementById("humidty").innerHTML = `Humidity ${Math.round(humidity*100)}%`;
    document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;

     //render the forecasts tabs
     document.getElementById("dailyForecast").innerHTML = renderWeeklyForecast(data.daily);
     document.getElementById("weeklyForecast").innerHTML = renderDailyForecast(data.hourly);

})
.catch(err => {
    throw (`Sorry, an Error occured. ${err}`);
})

};

//render the daily forecast
function renderDailyForecast(fcData) {

    let resultsHTML = "<tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Precip</th></tr>";
    rowcount = fcData.data.length;
    if (rowcount > 8) {
        rowcount = 8;
    }

    for (i = 0; i < rowcount; i++) {

        let ts = new Date(fcData.data[i].time * 1000);
        let summary = "";
        let tempHigh = 0;
        let timeValue;

        //unix time needs to be formatted for display
        let hours = ts.getHours();
        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }
        timeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM

        summary = fcData.data[i].summary;
        tempHigh = `${Math.round(fcData.data[i].temperature)}&deg`;
        let precipProbability = `${Math.round(fcData.data[i].precipProbability * 100)}%`;
        resultsHTML += renderRow(timeValue, summary, tempHigh, precipProbability);

    }

    return resultsHTML;
}

//render the weekly forecast
function renderWeeklyForecast(fcData) {

    let resultsHTML = "<tr><th>Day</th><th>Conditions</th><th>Hi</th><th>Lo</th></tr>";
    rowcount = fcData.data.length;
    if (rowcount > 8) {
        rowcount = 8;
    }

    for (i = 0; i < rowcount; i++) {

        let ts = new Date(fcData.data[i].time * 1000);

        let dayTime = wDay[ts.getDay()];
        let summary = fcData.data[i].summary;
        let tempHigh = `${Math.round(fcData.data[i].temperatureHigh)}&deg`;
        let tempLow = `${Math.round(fcData.data[i].temperatureLow)}&deg`;

        resultsHTML += renderRow(dayTime, summary, tempHigh, tempLow);
    }

    return resultsHTML;
}

//template function to render grid colums
function renderRow(dayTime, summary, tempHigh, colVal4) {
    return `<tr><td>${dayTime}</td><td>${summary}</td><td>${tempHigh}</td><td>${colVal4}</td></tr>`
}


//render the correct icon
function getICON(icon){
    switch (icon) {
        case iconValue.CLEARDAY:
            return "images/sunnyDay.png";

        case iconValue.CLOUDY:
        case iconValue.PARTLY_CLOUDY_DAY:
            return "images/mostlySunny.png";

        case iconValue.CLEARNIGHT:
            return "images/clearMoon.png";

        case iconValue.PARTLY_CLOUDY_NIGHT:
            return "images/cloudyMoon.png";

        case iconValue.RAIN:
            return "images/rain.png";

        case iconValue.SNOW:
            return "images/snow.png";

        case iconValue.SLEET:
            return "images/Sleet.png";

        default:
            return "images/sunnyDay.png";
    }
};

// fetch the address
function fetchLocation(apiKey, latitude, longitude){
    //var googleApiKey = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    var acclocation = `https://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806&q=lisbon&aqi=yes`;
    fetch(acclocation)
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
    // just to test
    fetchLocation(`https://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806&q=lisbon&aqi=yes`);
    fetchWeatherReport(`https://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806&q=lisbon&aqi=yes`);
    //fetchLocation(accKey, position.coords.latitude, position.coords.longitude);
    //fetchWeatherReport(accKey, position.coords.latitude, position.coords.longitude);
}

function fail(){
    // I can default to my fav city
    alert("Sorry, your browser doesn't support geolocation.");
}