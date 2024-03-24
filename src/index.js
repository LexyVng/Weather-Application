function updateWeatherData(response) {
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#current-country");
  let temperatureElement = document.querySelector("#current-temp-value");
  let descriptionElement = document.querySelector("#current-condition");

  let temperature = response.data.temperature.current;
  let country = response.data.country;
  let newCity = response.data.city;
  let condition = response.data.condition.description;

  cityElement.innerHTML = newCity;
  countryElement.innerHTML = `, ${country}`;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = condition;

  console.log(response.data);
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

let formElement = document.querySelector("#weather-app-form");
formElement.addEventListener("submit", handleSearchSubmit);

searchCity("Athens");
