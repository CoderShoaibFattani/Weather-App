const apiKey = "ce063887cfe52a06e7e7ee9ebbe202a2";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");

let weatherData = async () => {
  const city = cityInput.value.trim();
  if (city) {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => {
        const { name, main, weather, wind, sys } = response;
        const temperature = Math.round(main.temp);
        const feelsLike = Math.round(main.feels_like);
        const description = weather[0].description;
        const iconCode = weather[0].icon;
        const humidity = main.humidity;
        const windSpeed = wind.speed;
        const html = `
        <div class="col-md-6">
            <div class="weather-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="mb-0">${name}</h2>
                    <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" class="weather-icon">
                </div>
                <div class="temp-box mb-4">${temperature}°C</div>
                <p class="lead weather-description mb-4">${description}</p>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="detail-box">
                            <i class="fas fa-thermometer-half"></i> Feels like: ${feelsLike}°C
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="detail-box">
                            <i class="fas fa-tint"></i> Humidity: ${humidity}%
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="detail-box">
                            <i class="fas fa-wind"></i> Wind: ${windSpeed} m/s
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        weatherInfo.innerHTML = html;
      });
  }
};

searchBtn.addEventListener("click", weatherData);
