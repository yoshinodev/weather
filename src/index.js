

function getWeather() {
    let tempOutput = document.getElementById("currentTemp");
    let conditionOutput = document.getElementById("summary");
    const icon = document.querySelector('.icon');
    let location = document.getElementById("location");
    let dateOutput = document.getElementById("dayTime");
    let windOutput = document.getElementById("wind");
    let humidityOutput = document.getElementById("humidity");
    let precipOutput = document.getElementById("precipitation");
    let dailyForecast = document.getElementById("dailyForecast");
    let weeklyForecast = document.getElementById("weeklyForecast");

    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const { latitude: lat, longitude: lon } = position.coords

    fetch(`/.netlify/functions/fetch-weather?lat=${lat},&long=${lon}`)
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

    
        // Render the daily forecast
    function dailyForecastRender(data){
        let resultsHTML= "<tr><th>Day</th><th>Conditions</th><th>Max Temp</th><th>Feels Like</th></tr>";
            rowCount = 9;
       
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
    // Render the weekly forecast
    function weeklyForecastRender(data){
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

            //render the forecasts tabs
        dailyForecast.innerHTML = dailyForecastRender(data);
        weeklyForecast.innerHTML = weeklyForecastRender(data);

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