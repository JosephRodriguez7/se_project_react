import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";

function Main({ clothingItems, handleOpenItemModal }) {
  return (
    <>
      <main className="main">
        <WeatherCard />
        <div className="main__container">
          <p className="main__text">
            Today is 75&deg;F / You may want to wear:
          </p>
          <ul className="main__cards-list">
            {clothingItems.map((item) => {
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
