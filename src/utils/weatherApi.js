import { apiKey, coordinates } from "./constants";

const { latitude, longitude } = coordinates;

export function getCurrentWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error from Weather API: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
      return parseWeatherData(data);
    });
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function parseWeatherData(data) {
  const parsedData = {};

  parsedData.location = data.name;
  parsedData.temperature = Math.round(data.main.temp);
  parsedData.weather = data.weather[0].main;

  return parsedData;
}
