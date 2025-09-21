const apiKey = "2708f9e61472d0bb662f680c459458ca";

const coordinates = {
  latitude: "25.818056",
  longitude: "-80.122222",
};

const weatherImages = [
  {
    name: "clear",
    time: "day",
    image: new URL("../assets/day/clear-day.svg", import.meta.url).href,
  },
  {
    name: "cloudy",
    time: "day",
    image: new URL("../assets/day/cloudy-day.svg", import.meta.url).href,
  },
  {
    name: "fog",
    time: "day",
    image: new URL("../assets/day/fog-day.svg", import.meta.url).href,
  },
  {
    name: "rain",
    time: "day",
    image: new URL("../assets/day/rain-day.svg", import.meta.url).href,
  },
  {
    name: "snow",
    time: "day",
    image: new URL("../assets/day/snow-day.svg", import.meta.url).href,
  },
  {
    name: "storm",
    time: "day",
    image: new URL("../assets/day/storm-day.svg", import.meta.url).href,
  },
  {
    name: "clear",
    time: "night",
    image: new URL("../assets/night/clear-night.svg", import.meta.url).href,
  },
  {
    name: "cloudy",
    time: "night",
    image: new URL("../assets/night/cloudy-night.svg", import.meta.url).href,
  },
  {
    name: "fog",
    time: "night",
    image: new URL("../assets/night/fog-night.svg", import.meta.url).href,
  },
  {
    name: "rain",
    time: "night",
    image: new URL("../assets/night/rain-night.svg", import.meta.url).href,
  },
  {
    name: "snow",
    time: "night",
    image: new URL("../assets/night/snow-night.svg", import.meta.url).href,
  },
  {
    name: "storm",
    time: "night",
    image: new URL("../assets/night/storm-night.svg", import.meta.url).href,
  },
];

export { apiKey, coordinates, weatherImages };
