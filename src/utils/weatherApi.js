import { apiKey, coordinates } from "./constants";

const DEFAULT_COORDS = coordinates;

function getCoordsFromBrowser(
  options = { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
) {
  return new Promise((resolve, reject) => {
    if (!navigator || !navigator.geolocation) {
      return reject(new Error("Geolocation not available"));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude, longitude });
      },
      (err) => {
        reject(err);
      },
      options
    );
  });
}

export function getCurrentWeatherData() {
  // Try to get user geolocation; fall back to configured coordinates on any failure
  return getCoordsFromBrowser()
    .catch((err) => {
      // If user denies or geolocation fails, fallback to default coordinates
      console.warn(
        "Geolocation failed or denied, falling back to default coordinates:",
        err && err.message ? err.message : err
      );
      return DEFAULT_COORDS;
    })
    .then(({ latitude, longitude }) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
      );
    })
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error from Weather API: ${res.status}`);
    })
    .then((data) => {
      // console.log(data);
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
  const parsedData = { location: {}, weather: {}, temperature: {} };

  parsedData.location = data.name;
  parsedData.temperature.F = Math.round(data.main.temp);
  parsedData.temperature.C = Math.round(
    (parsedData.temperature.F - 32) * (5 / 9)
  );
  parsedData.weather = data.weather[0].main;
  parsedData.sunrise = data.sys.sunrise;
  parsedData.sunset = data.sys.sunset;
  parsedData.condition = getWeatherCondition(data.main.temp);
  console.log("Weather temp feels: " + parsedData.condition);

  return parsedData;
}
