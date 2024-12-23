const apiKey = '3a71b4011a9baaa6076f38b7b418a5bd';

$(document).ready(function () {
  $('#searchBtn').click(function () {
    const city = $('#cityInput').val().trim();
    if (!city) {
      alert('Please enter a city name!');
      return;
    }
    getWeather(city);
  });
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('City not found. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again later.');
    });
}

function displayWeather(data) {
  $('#cityName').text(`${data.name}, ${data.sys.country}`);
  $('#weatherDescription').text(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
  $('#temperature').text(`Temperature: ${data.main.temp}°C`);
  $('#humidity').text(`Humidity: ${data.main.humidity}%`);
  $('#windSpeed').text(`Wind Speed: ${data.wind.speed} m/s`);
  $('#weatherDetails').removeClass('d-none');
}
