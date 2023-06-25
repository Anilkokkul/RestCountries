var countries = document.getElementById("countries")
var weather = document.getElementById('weather');

var RestCountriesAPI = 'https://restcountries.com/v3.1/all';
var WeatherAPI = "https://api.openweathermap.org/data/3.0";


async function getRestCountries(){
    const response = await fetch(`${RestCountriesAPI}`);
    const countriesList = await response.json();
    console.log(countriesList);
    countriesList.forEach((country, index) => {
        countries.innerHTML +=
        `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${country.name.common}</h5>
        <img src="${country.flags.png}" class="card-img-top" alt="flag">
        <div class="card-body">
          <p>${country.capital && country.capital[0]}</p>
          <p>${country.region}</p>
          <p>${country.cca3}</p>
          <a href="#" class="btn btn-primary" onclick='getWeather(${country.latlng[0]},${country.latlng[1]}, ${index})'>Click for Weather</a>
          <div id='weather-${index}'></div>
          </div>
      </div>`

        // `<div class="country" key="${index}">
        // <div class="country-name">${country.name.common}</div>
        // <img src="${country.flags.png}">
        // </div>`
        
    });
}
getRestCountries();

async function getWeather(lat, lng, index){
    var weatherOfCountry = document.getElementById(`weather-${index}`);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=f3414503a84e614ae22de22b4b156520`)
    const weatherOutput = await response.json();
    weatherOfCountry.innerHTML += `
        <p>Temperature: ${weatherOutput.main.temp} Celsius</p>
        <p>Feels like: ${weatherOutput.main.feels_like} Celsius</p>
        <p>Humidity: ${weatherOutput.main.humidity} </p>`
}