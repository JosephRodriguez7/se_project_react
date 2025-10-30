import { useContext } from "react";

import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  clothingItems,
  defaultClothingItems,
  handleOpenItemModal,
  weatherData,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <WeatherCard weatherData={weatherData} />
        <div className="main__container">
          <p className="main__text">
            Today is {weatherData.temperature?.[currentTemperatureUnit]}&deg;
            {currentTemperatureUnit} / You may want to wear:
          </p>
          <ul className="main__cards-list">
            {clothingItems
              .filter((item) => item.weather === weatherData.condition)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    data={item}
                    handleOpenItemModal={handleOpenItemModal}
                  />
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Main;
