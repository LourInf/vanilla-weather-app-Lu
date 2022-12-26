let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (hour < 10) {
  hour = "0" + hour;
}
let today = document.querySelector("#today-date");
today.innerHTML = `${day}, ${date} ${month}`;

let todayTime = document.querySelector("#last-updated-currentTime");
todayTime.innerHTML = `Last updated: ${hour}:${minutes}`;

function showTemperature(response) {
  //console.log(response);
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#display-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "6f9e9856e7cd0b15541eb1cfd3f417ee";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFarenheit(event) {
  event.preventDefault();
  let link = document.querySelector("#display-temperature");
  link.innerHTML = "66";
}
let showTempF = document.querySelector("#farenheit-link");
showTempF.addEventListener("click", showFarenheit);

searchCity("New York");

function searchLocation(position) {
  let apiKey = "6f9e9856e7cd0b15541eb1cfd3f417ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
