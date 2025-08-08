const apikey = "2a098b3e7702895dfc6077ee09909edc";

const btn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherinfo");
const errorMsg = document.getElementById("errorMsg");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

btn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const mainWeather = data.weather[0].main;

    // Update UI
    cityName.textContent = data.name;
    temperature.textContent = `${temp}°C`;
    description.textContent = desc;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    // Optional: Change background based on weather
    document.body.style.background = getBackground(mainWeather);
  } catch (error) {
    showError("City not found. Please try again.");
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
}

function getBackground(weather) {
  switch (weather.toLowerCase()) {
    case "clear":
      return "linear-gradient(to right, #fbc2eb, #a6c1ee)";
    case "clouds":
      return "linear-gradient(to right, #d7d2cc, #304352)";
    case "rain":
    case "drizzle":
      return "linear-gradient(to right, #4e54c8, #8f94fb)";
    case "thunderstorm":
      return "linear-gradient(to right, #1f1c2c, #928dab)";
    case "snow":
      return "linear-gradient(to right, #e0eafc, #cfdef3)";
    default:
      return "linear-gradient(to right, #83a4d4, #b6fbff)";
  }
}
