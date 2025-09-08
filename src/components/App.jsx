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

  return (
    <>
      <div className="app">
        <Header />
        <Main clothingItems={clothingItems} />
        <ItemModal />
        <ModalWithForm />
        <Footer />
      </div>
    </>
  );
}

export default App;
