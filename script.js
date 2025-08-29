const inputBox = document.querySelector('.inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImage = document.querySelector('.weatherImage');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const locationNotFound = document.querySelector('.locationNotFound');
const weatherBody = document.querySelector('.weatherBody');

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = 'e06cddbc0b79fe8d9505b1e6435d907e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            
            return;
        }
        
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${Math.round(weatherData.main.temp)} <sup>°C</sup>`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity} %`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/h`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImage.src = "assets/cloud.png";
                break;
            case 'Clear':
                weatherImage.src = "assets/clear.png";
                break;
            case 'Rain':
                weatherImage.src = "assets/rain.png";
                break;
            case 'Mist':
                weatherImage.src = "assets/mist.png";
                break;
            case 'Snow':
                weatherImage.src = "assets/snow.png";
                break;
            default:
                weatherImage.src = "assets/default.png";
                break;
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please try again later.");
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value.trim());
});
