var apiKey = "b70365d507b967b4456d0c5985720e31"
var searchFormEl = $("#city-search")
var searchedCityEl = $("#search-locations-container")
var currentDayDisplayEl = $("#current-day")
var fiveDayDisplayEl = $("#five-day-forcast")

var getCityData = function(cityName){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey

    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                getWeatherData(data.coord.lat, data.coord.lon)
            })
        }
        else{
            alert("City not found")
        }
    })
}

var getWeatherData = function(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey

    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
            })
        }
        else{
            alert("City not found")
        }
    })
}

var showWeather = function(){
    event.preventDefault()

    $(".current-weather-display").remove()

    chosenCity = $("#city-search-text").val()

    currentDay = moment().format("M/D/YYYY")

    currentDayDisplayEl.append("<div class='current-weather-display'></div>")

    $(".current-weather-display").append("<h3>" + chosenCity + " (" + currentDay + ")" + "</h3>")

    searchedCityEl.append("<button class='searched-city btn btn-secondary w-100 m-1'>" + chosenCity + "</button>")

    // getCityData(chosenCity)
    
}





searchFormEl.on("submit", showWeather)
