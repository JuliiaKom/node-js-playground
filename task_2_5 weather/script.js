document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "caf2e775502869dcdfd9bbdb3dfdfd43";
    const SUCCESS_STATUS_CODE = "200";

    const cityInput = document.querySelector("#city-input");
    const cleanBtn = document.querySelector("#clean-btn");
    const selectedCityElement = document.querySelector("#selected-city");
    const conditionElement = document.querySelector(".condition");
    const weatherIconElement = document.querySelector(".forecast-icon");
    const temperatureElement = document.querySelector(".temperature-box");
    const cityNameElement = document.querySelector(".city-name-box");
    const forecastBox = document.querySelector(".forecast-box");
    const forecastItems = forecastBox.querySelectorAll(".forecast-item");
    const errorMessageElement = document.querySelector(".error-text");

    const defaultCity = "Prague";
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


    // Function for formatting temperature
    function formatTemperature(temp) {
        return `${temp > 0 ? '+' : ''}${Math.round(temp)}°C`
    }

    // Function for error handling
    function handleError(message) {
        errorMessageElement.textContent = message;
        errorMessageElement.classList.add("visible");
        errorMessageElement.classList.remove("hidden");

        forecastBox.classList.add("hidden");
        forecastBox.classList.remove("visible");
    }

    function getWeatherIcon(weatherCondition) {
        switch (weatherCondition) {
            case "Clear":
                return "sunny.png";
            case "Clouds":
                return "cloudy.png";
            case "Rain":
                return "rain.png";
            case "Thunderstorm":
                return "thunderstorm.png";
            case "Snow":
                return "snow.png";
            default:
                return "img-header.png";
        }
    }

    // Weather update
    function updateWeather() {
        fetchWeather(cityInput.value.trim() || defaultCity);
    }

    // Handler for clicking on the clear button
    cleanBtn.addEventListener("click", () => {
        cityInput.value = "";
        selectedCityElement.textContent = "";
        conditionElement.textContent = "";
        weatherIconElement.src = "";
        temperatureElement.textContent = "";
        cityNameElement.textContent = "";
        errorMessageElement.style.display = "none";
        forecastBox.style.display = "block";

        fetchWeather(defaultCity);
        fetchForecast(defaultCity);
    });

    // Handling pressing the Enter key in the input
    cityInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            updateWeather();
        }
    });

    // Get the weather for the city
    function fetchWeather(city) {
        const unitSys = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitSys}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {

                if (data.cod.toString() !== SUCCESS_STATUS_CODE) {
                    throw new Error("City not found");
                }

                errorMessageElement.classList.add("hidden");
                errorMessageElement.classList.remove("visible");

                forecastBox.classList.add("visible");
                forecastBox.classList.remove("hidden");

                const cityNameUa = data.name;
                const country = data.sys.country;

                temperatureElement.textContent = formatTemperature(data.main.temp);
                conditionElement.textContent = data.weather[0].description;
                cityNameElement.textContent = `${cityNameUa}, ${country}`;
                selectedCityElement.textContent = `${cityNameUa}, ${country}`;

                const weatherCondition = data.weather[0].main;
                weatherIconElement.src = `./images/${getWeatherIcon(weatherCondition)}`;
                weatherIconElement.alt = weatherCondition;

                fetchForecast(city);
            })

            .catch(() => handleError("City not found, try again!"));
    }

    // Get 5-day forecast
    function fetchForecast(city) {
        const unitSys = "metric";
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unitSys}&lang=en&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {

                if (data.cod.toString() !== SUCCESS_STATUS_CODE) {
                    throw new Error("Error retrieving forecast");
                }

                errorMessageElement.classList.add("hidden");
                errorMessageElement.classList.remove("visible");

                forecastBox.classList.add("visible");
                forecastBox.classList.remove("hidden");

                const dailyData = {};
                data.list.forEach(entry => {
                    const date = entry.dt_txt.split(" ")[0];
                    if (!dailyData[date]) {
                        dailyData[date] = entry;
                    }
                });

                Object.values(dailyData).slice(0, 5).forEach((day, index) => {
                    const forecastItem = forecastItems[index];
                    if (!forecastItem) return;

                    const date = new Date(day.dt_txt);
                    const dayName = days[date.getDay()];

                    forecastItem.querySelector(".day-name").textContent = dayName;
                    forecastItem.querySelector(".forecast-day-temperature").textContent = formatTemperature(day.main.temp_max);
                    forecastItem.querySelector(".forecast-night-temperature").textContent = formatTemperature(day.main.temp_min);

                    const weatherCondition = day.weather[0].main;
                    forecastItem.querySelector(".forecast-icon").src = `./images/${getWeatherIcon(weatherCondition)}`;
                    forecastItem.querySelector(".weather-condition").textContent = day.weather[0].description;
                });
            })

            .catch(() => handleError("Error retrieving forecast, please try again!"));
    }

    fetchWeather(defaultCity);
    fetchForecast(defaultCity);
});
