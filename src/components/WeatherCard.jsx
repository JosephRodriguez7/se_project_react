import { useContext } from "react";

// import "./blocks/weather.css";
import WeatherImg from "../assets/weather-card.svg";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);

  return (
    <>
      <section className="weather__card">
        <img src={WeatherImg} alt="weather" className="weather__card-image" />
        <h3 className="weather__data">
          {weatherData.temperature?.[contextValue.currentTemperatureUnit]}&deg;
          {contextValue.currentTemperatureUnit}
        </h3>
      </section>
    </>
  );
}

export default WeatherCard;
