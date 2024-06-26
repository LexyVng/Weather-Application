function updateWeatherData(response) {
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#current-country");
  let temperatureElement = document.querySelector("#current-temp-value");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity-percentage");
  let windSpeedElement = document.querySelector("#wind-value");
  let dayTimeElement = document.querySelector("#current-data-date");
  let emojiElement = document.querySelector("#current-temp-emoji");

  let temperature = response.data.temperature.current;
  let country = response.data.country;
  let newCity = response.data.city;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let date = new Date(response.data.time * 1000);

  emojiElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class = "weather-emoji" />`;
  cityElement.innerHTML = newCity;
  countryElement.innerHTML = `, ${country}`;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = condition;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed}km/h`;
  dayTimeElement.innerHTML = formatDate(date);

  getForecast(newCity);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2b4a0533t1055afa3fbo41efac5059ad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#weather-app-form-input");

  searchCity(inputElement.value);
}

function getForecast(city) {
  let apiKey = "2b4a0533t1055afa3fbo41efac5059ad";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateForecast);
}

function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day.getDay()];
}

function updateForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="row">
            <div class="col-2">
              <div class="forecast-date">${formatDay(day.time)}</div>
                <img
                  src="${day.condition.icon_url}"
                  alt=""
                  width="60"
                  class="forecast-picture"
                />
              <div class="forecast-temperatures">
                <span class="forecast-temp-max">${Math.round(
                  day.temperature.maximum
                )}°</span> /
                <span class="forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#weather-app-form");
formElement.addEventListener("submit", handleSearchSubmit);

searchCity("Athens");

updateForecast();
