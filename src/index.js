function handleSearchSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#weather-app-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = inputElement.value;
}

let formElement = document.querySelector("#weather-app-form");
formElement.addEventListener("submit", handleSearchSubmit);
