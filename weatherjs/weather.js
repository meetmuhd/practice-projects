class Weather {
  constructor(city, countryCode) {
    this.apiKey = "265c24f1f02b45ba20b32afdd3d5b3bb";
    this.city = city;
    this.countryCode = countryCode;
  }

  // fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&appid=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, countryCode) {
    this.city = city;
    this.countryCode = countryCode;
  }
}