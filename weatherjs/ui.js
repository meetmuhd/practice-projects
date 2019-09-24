class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.temperature = document.getElementById("w-temperature");
    this.pressure = document.getElementById("w-pressure");
    this.windSpeed = document.getElementById("w-wind-speed");
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = weather.weather[0].main;
    this.icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
    this.temperature.textContent = `Temperature: ${weather.main.temp}`;
    this.pressure.textContent = `Pressure: ${weather.main.pressure}`;
    this.windSpeed.textContent = `Wind Speed: ${weather.wind.speed}`;
  }
}