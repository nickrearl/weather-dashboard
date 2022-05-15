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
                $(".current-weather-display").append("<img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png'>" )
                $(".current-weather-display").append("<p>Temp: " + data.current.temp + "F</p>")
                $(".current-weather-display").append("<p>Wind: " + data.current.wind_speed + "MPH</p>")
                $(".current-weather-display").append("<p>Humidity: " + data.current.humidity + "%</p>")
                $(".current-weather-display").append("<p class='uv-index text-white'>UV Index: " + data.current.uvi + "</p>")
                    if(data.current.uvi <= 3){
                        $(".uv-index").addClass("bg-success")
                    }
                    else if (data.current.uvi > 3 && data.current.uvi <= 6){
                        $(".uv-index").addClass("bg-warning")
                    }
                    else if (data.current.uvi > 6) {
                        $(".uv-index").addClass("bg-danger")
                    }

            })
        }
        else{
            alert("City not found")
        }
    })
}

var showWeather = function(chosenCity){
    event.preventDefault()

    $(".current-weather-display").remove()

    chosenCity = $("#city-search-text").val()

    currentDay = moment().format("M/D/YYYY")

    currentDayDisplayEl.append("<div class='current-weather-display'></div>")

    fiveDayDisplayEl.append("<div class ='future-weather-display'></div>")

    $(".current-weather-display").append("<h3>" + chosenCity + " (" + currentDay + ")" + "</h3>")

    searchedCityEl.append("<button class='searched-city btn btn-secondary w-100 m-1'>" + chosenCity + "</button>")

    getCityData(chosenCity)
    
    $("#city-search-text").val("")
}

var previousSearchHandler = function(){
    var selectedCity = $(this).text()


    $("#city-search-text").val(selectedCity)
    
    showWeather()

    $(this).remove()
}





searchFormEl.on("submit", showWeather)
searchedCityEl.on("click", ".searched-city", previousSearchHandler)
