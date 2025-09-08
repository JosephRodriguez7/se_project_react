import "./blocks/weather.css";
import WeatherImg from "../assets/weather-card.svg";

function WeatherCard() {
  return (
    <>
      <section className="weather__card">
        <img src={WeatherImg} alt="weather" className="weather__card-image" />
        <h3 className="weather__data">currentTemp</h3>
      </section>
    </>
  );
}

export default WeatherCard;
