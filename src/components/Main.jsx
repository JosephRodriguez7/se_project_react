import "./blocks/main.css";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";

function Main({ clothingItems }) {
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
              return <ItemCard key={item.id} data={item} />;
            })}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Main;
