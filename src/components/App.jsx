import { useEffect, useState } from "react";
import { defaultClothingItems } from "../utils/clothingItems";
import { getCurrentWeatherData } from "../utils/weatherApi";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Main from "./Main";
// import ModalWithForm from "./ModalWithForm";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setHeaderMobile] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function handleMobileMenu() {
    setHeaderMobile((prev) => !prev);
  }

  function handleCloseMobileMenu() {
    setHeaderMobile(false);
  }

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleTempUnitChange(evt) {
    if (currentTemperatureUnit == "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  }

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    getCurrentWeatherData()
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((err) => console.error("There has been an error", err));
  }, []);

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleTempUnitChange }}
      >
        <div className="app">
          <Header
            handleOpenAddClothesModal={handleOpenAddClothesModal}
            handleMobileMenu={handleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            handleCloseMobileMenu={handleCloseMobileMenu}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  weatherData={weatherData}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  handleCloseModal={handleCloseModal}
                  handleOpenAddClothesModal={handleOpenAddClothesModal}
                />
              }
            ></Route>
          </Routes>
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            handleCloseModal={handleCloseModal}
          />
          <AddItemModal
            isOpen={activeModal === "add-clothes-modal"}
            handleCloseModal={handleCloseModal}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
