const timeOutput = document.getElementById('currentTemp');
const conditionOutput = document.querySelector('#wpConditions');
const nameOutput = document.getElementById('name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('#humidity');
const windOutput = document.querySelector('#wind');
const form = document.querySelector('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// Default city when the page Loads
let cityInput = "Lisbon";

// Add submit event to the form
form.addEventListener('submit', (e) => {
    // if the input field (search bar) is empty, throw alert
    if(search.ariaValueMax.length == 0) {
        alert('Please type in a city name');
    } else {
        /* Change from default city to the
         one written in the input field */
         cityInput = search.ariaValueMax;
         /*function that fetches and displays all the data
         the weather api */
         fetchWeatherData();
         // remove all text from the input field
         search.value = "";
         // fade out the app (simple animation)
         app.style.opacity = "0";
    }
    //prevents the default behaviour of the form
    e.preventDefault();
});

/* function that returns a day of the week
(Monday, tuesday ...) from a date (12 03 2021) */
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

/*function that fetches and displays the data
from the weather api */
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806=${cityInput}`)
    /* take the data (which is in JSON format)
    and convert it to a regular JS object */
    .then(response => response.json())
    .then(data => {
        console.log(data);

        /* adding the temperature
        and weather condition to the page */
        timeOutput.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        /* get the date and time from the city and extract
        the day, month, year and time into individual variables */
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        /* reformat the date into something more
        appealing and add it to the page */
        
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`
        time.output.innerHTML = time;
        // add the name of the city into the page
        nameOutput.innerHTML = data.location.name;
        /* get the corresponding icon url for
        the weather and extract a part of it 
        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length);
            /* reformat the icon url to your own
            local folder path and add it to the page */
            icon.src = "./images/" + iconId;

            // Add the weather details to the page
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";
        })
        /* If the user types a city that doesn't exist,
            throw an alert */
    .catch(() => {
         alert('City not found, please try again');
        app.style.opacity = "1";
    });
        /* function iconChange ( => {
            // set default time of day
            let timeOfDay = "day";
            // get the unique id for each weather condition
            const code = data.current.condition.code;

            //change to night if its night time in the city
            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                /* change the button bg color
                depending on if its day or night */
             /*   btn.style.background = "#e5ba92";
                if(timeOfDay == "night") {
                    btn.style.background ="#181e27";
                }
           /* } 
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282 
            ) {
                app.style.backgroundImage = `url(./images/$(timeOfDay)/WeatherPrpBG.png)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                } 
                // and rain
                else if (
                    code == 1063 ||
                    code  == 1069 ||
                    code == 1072 ||
                    code == 1150 ||
                    code == 1153 ||
                    code == 1180 ||
                    code == 1183 ||
                    code == 1186 ||
                    code == 1189 ||
                    code == 1192 ||
                    code == 1195 ||
                    code == 1204 ||
                    code == 1207 ||
                    code == 1240 ||
                    code == 1243 ||
                    code == 1246 ||
                    code == 1249 ||
                    code == 1252
                ){
                    app.style.backgroundImage = 
                    `url(./images/$(timeOfDay)/WeatherPrpBG.png)`;
                    btn.style.background = "647d75";
                    if(timeOfDay == "night") {
                        btn.style.background = "#325c80";
                    }
                }
                // snow 
                else {
                    app.style.backgroundImage = app.style.backgroundImage = `url(./images/$(timeOfDay)/snow.png)`;
                    btn.style.background = "#4d72aa";
                    if (timeOfDay == "night") {
                        btn.style.background ="#1b1b1b";
                    }
                }
                //fade in the page once all is done
                app.style.opacity = "1";
            }) */

            


//call the function on page load
fetchWeatherData();
        };

/* fade in the page
app.style.opacity = "1"; */


/* function fetchLocation(wLocation){
    let wLocation = `http://api.weatherapi.com/v1/current.json?key=b589cfcc2e754751aed11744220806&`;
    fetch(wLocation)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data);

        
        //work json with data
        document.getElementById("location").innerHTML = data.location.name;
    })
    .catch (err => {
        throw (`Sorry, An error occured ${err}`);
        })
}

/*function initGeoLocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        alert("Sorry, your browser doesn't support geolocation weather.");
    }
}
*/

//if navigation is available show weather for the current location
/*function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let url =
      wLocation +
      "q=" +
      latitude +
      "," +
      longitude +
      "&units=imperial";

}

function fail() {

    //You could default to your favorite city like Kernersville, NC the home of Coder Foundry!
    alert("Sorry, your browser does not support geolocation services.");
}

fetchLocation(); */