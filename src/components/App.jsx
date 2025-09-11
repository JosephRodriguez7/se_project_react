import { useState } from "react";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import { defaultClothingItems } from "../utils/clothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setHeaderMobile] = useState(false);

  function handleMobileMenu() {
    setHeaderMobile("set-header-mobile");
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

  return (
    <>
      <div className="app">
        <Header
          handleOpenAddClothesModal={handleOpenAddClothesModal}
          handleMobileMenu={handleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Main
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
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
