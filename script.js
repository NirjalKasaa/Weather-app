const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepember', 'October', 'November', 'December'];

const apiKey ="64b172b9026bc2d101fb8a686d3ea89a";


    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
    
    
    let weather = {
    fetchWeather: function (city) {
      fetch(`http://localhost/prototype2/index.php?City=${city}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) { 
      const { City } = data;
      const { Icon, Weather_description } = data;
      const { Weather_temperature, Humidity } = data;
      const { Weather_wind } = data;
      const { Direction_of_wind } = data;
      const { Pressure} = data;

      document.querySelector(".city").innerText = "Weather in "+City;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + Icon + "@2x.png";
      document.querySelector(".description").innerText = Weather_description;
      document.querySelector(".temp").innerText = Math.round(Weather_temperature) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + Humidity + "%";
      document.querySelector(".pressure").innerText ="Pressure: " + Pressure + "hpa";
      document.querySelector(".wind").innerText ="Wind speed: " + Weather_wind + "km/h";
      document.querySelector(".deg").innerText ="Wind direction: " + Direction_of_wind + "°";
      document.querySelector(".weather").classList.remove("loading");


      localStorage.City=City;
      localStorage.Icon=Icon;
      localStorage.Weather_description=Weather_description;
      localStorage.Weather_temperature=Weather_temperature;
      localStorage.Humidity=Humidity;
      localStorage.Pressure=Pressure;
      localStorage.Weather_wind=Weather_wind;
      localStorage.Direction_of_wind=Direction_of_wind;

      localStorage.when = Date.now();
    },
      search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };

  document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();   
    }
});

if(localStorage.when != null
  && parseInt(localStorage.when) + 1800000 > Date.now()) {
    console.log('Data from localStorage')
  let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";

  document.querySelector(".city").innerText = "Weather in "+localStorage.City;
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + localStorage.Icon + "@2x.png";
  document.querySelector(".description").innerText = localStorage.Weather_description;
  document.querySelector(".temp").innerText = Math.round(localStorage.Weather_temperature) + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + localStorage.Humidity + "%";
  document.querySelector(".pressure").innerText ="Pressure: " + localStorage.Pressure + "hpa";
  document.querySelector(".wind").innerText ="Wind speed: " + localStorage.Weather_wind + "km/h";
  document.querySelector(".deg").innerText ="Wind direction: " + localStorage.Direction_of_wind + "°";
  document.querySelector(".weather").classList.remove("loading");

  } else {
weather.fetchWeather("Wolverhampton");
}