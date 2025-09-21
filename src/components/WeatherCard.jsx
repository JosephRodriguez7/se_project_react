import { useContext } from "react";

import { weatherImages } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);

  function getTimeOfDay(sunrise, sunset) {
    const now = Math.floor(Date.now() / 1000);
    return now >= sunrise && now < sunset ? "day" : "night";
  }

  // Simplify API Weather Conditions
  function standardizeWeatherConditions(condition) {
    if (!condition) return "clear";
    const standardized = String(condition).toLowerCase();
    const map = {
      clear: "clear",
      clouds: "cloudy",
      cloud: "cloudy",
      fog: "fog",
      mist: "fog",
      smoke: "fog",
      haze: "fog",
      drizzle: "rain",
      rain: "rain",
      thunderstorm: "storm",
      snow: "snow",
      squall: "storm",
      tornado: "storm",
    };
    return map[standardized] || "clear";
  }

  function getWeatherImage(condition, sunrise, sunset) {
    const name = standardizeWeatherConditions(condition);
    const timeOfDay = getTimeOfDay(sunrise, sunset);
    const match = weatherImages.find(
      (img) => img.name === name && img.time === timeOfDay
    );
    return (
      match?.image ||
      weatherImages.find(
        (img) => img.name === "clear" && img.time === timeOfDay
      )?.image
    );
  }

  const imageSrc = getWeatherImage(
    weatherData.weather,
    weatherData.sunrise,
    weatherData.sunset
  );

  return (
    <>
      <section className="weather__card">
        <img
          src={imageSrc}
          alt={weatherData.weather || "weather-condition"}
          className="weather__card-image"
        />
        <h3 className="weather__data">
          {weatherData.temperature?.[contextValue.currentTemperatureUnit]}&deg;
          {contextValue.currentTemperatureUnit}
        </h3>
      </section>
    </>
  );
}

export default WeatherCard;
