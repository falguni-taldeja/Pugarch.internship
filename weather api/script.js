const apikey =("2a098b3e7702895dfc6077ee09909edc");
const btn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

btn.addEventListener("click", async () => {
   const city = cityInput.value.trim();
    if(city == "") {
        showError("Please Enter a city name.");
        return;
    }

    try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!response.ok) throw new  Error("city not found");

        const data = await response.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const mainWeather = data.weather[0].main;

        cityName.textContent =  data.name;
        temperature.textContent =  `${temp}°C`;
        description.textContent = desc;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    document.body.style.background = getBackground(mainWeather);
    } catch(error){
        showError("city not found. Please try again");
    }}
    );

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
