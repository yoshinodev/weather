

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};



function getWeather() {
    let tempOutput = document.getElementById("currentTemp");
    let conditionOutput = document.getElementById("summary");
    let location = document.getElementById("location");
    let dateOutput = document.getElementById("dayTime");
    let windOutput = document.getElementById("wind");
    let humidityOutput = document.getElementById("humidity");
    let precipOutput = document.getElementById("precipitation");
    let dailyForecast = document.getElementById("dailyForecast");
    let weeklyForecast = document.getElementById("weeklyForecast");

    
    const apiKey = document.getsc;
    var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
    let wApi = `${DsProxyLink}https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&`;
    //to avoid the cors issue you need to run through a proxy or make the call server side.

    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        let url =
          wApi +
          "q=" +
          latitude +
          "," +
          longitude +
          "&days=3" +
          "&units=imperial";
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.current.temp_c;
        tempOutput.innerHTML = temp + "°C";
        location.innerHTML = data.location.region;
        dateOutput.innerHTML = data.location.localtime;
        conditionOutput.innerHTML = data.current.condition.text;
        windOutput.innerHTML = "Wind: " + data.current.wind_kph + " km/h";
        humidityOutput.innerHTML = "Humidity: " + data.current.humidity + " %";
        precipOutput.innerHTML = "Precipitation: " + data.current.precip_mm*100 + " %";
        var tableHTML = "";
        var resultsHTML = "";

    // Render the weekly forecast
    function teste1(data){
        let resultsHTML= "<tr><th>Day</th><th>Conditions</th><th>Max Temp</th></tr>";
        rowCount = 3;
    for (i = 0; i < rowCount; i++) {
        let dateTeste = data.forecast.forecastday[i].date;
        let summary = data.forecast.forecastday[i].day.condition.text;
        let tempHigh = data.forecast.forecastday[i].day.maxtemp_c + " °C";
        resultsHTML += renderRow(dateTeste, summary, tempHigh);
    }
    return resultsHTML;
}
// Render the daily forecast
    function teste2(data){
        let resultsHTML= "<tr><th>Day</th><th>Conditions</th><th>Max Temp</th><th>Feels Like</th></tr>";
            rowCount = 20;
       
        for (i = 0; i < rowCount; i++) {
            let summary = "";
            let tempHigh = 0;
            let dateTeste;
            //let dateTeste = data.forecast.forecastday[0].hour[i].time;
            const now = new Date();
            const current = now.getHours() + ':' + now.getMinutes();
            let hours = new Date(data.forecast.forecastday[0].hour[i].time_epoch * 1000);
            dateTeste = hours.toLocaleTimeString();
            summary = data.forecast.forecastday[0].hour[i].condition.text;
            tempHigh = data.forecast.forecastday[0].hour[i].temp_c  + " °C";
            let feelsLike = data.forecast.forecastday[0].hour[i].feelslike_c + " °C";


            resultsHTML += renderRow(dateTeste, summary, tempHigh, feelsLike);
           
        }
        return resultsHTML;
        
    }
            //render the forecasts tabs
        weeklyForecast.innerHTML = teste1(data);
        dailyForecast.innerHTML = teste2(data);
        
        

      })
    }
    
    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }
}
getWeather();


// template function to render grid colums
function renderRow(dateTeste, summary, tempHigh, colVal4) {
    return `<tr><td>${dateTeste}</td><td>${summary}</td><td>${tempHigh}</td><td>${colVal4}</td></tr>`
}