import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import { defaultClothingItems } from "../utils/clothingItems";
import { getCurrentWeatherData } from "../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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
      <div className="app">
        <Header
          handleOpenAddClothesModal={handleOpenAddClothesModal}
          handleMobileMenu={handleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          handleCloseMobileMenu={handleCloseMobileMenu}
          weatherData={weatherData}
        />
        <Main
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          weatherData={weatherData}
        />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          handleCloseModal={handleCloseModal}
        />
        <ModalWithForm
          isOpen={activeModal === "add-clothes-modal"}
          handleCloseModal={handleCloseModal}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
