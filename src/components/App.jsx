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

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  return (
    <>
      <div className="app">
        <Header handleOpenAddClothesModal={handleOpenAddClothesModal} />
        <Main clothingItems={clothingItems} />
        {/* <ItemModal /> */}
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
