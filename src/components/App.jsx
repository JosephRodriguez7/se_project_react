import { useEffect, useState } from "react";
import { defaultClothingItems } from "../utils/clothingItems";
import { getCurrentWeatherData } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";
import { Routes, Route } from "react-router-dom";
import { userRegistration, userLogin } from "../utils/auth";

import Header from "./Header";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Main from "./Main";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setHeaderMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function handleMobileMenu() {
    setHeaderMobile((prev) => !prev);
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  function handleRegisterUser({ email, password, name, avatar }) {
    userRegistration({ email, password, name, avatar })
      .then((res) => {
        console.log("User registered successfully", res);
        return userLogin({ email, password });
      })
      .then((loginRes) => {
        console.log("User logged in:", loginRes);
        localStorage.setItem("jwt", loginRes.token);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Registration or auto-login failed:", err);
      });
  }

  function handleLoginUser({ email, password }) {
    console.log("User logged in:", { email, password });
    userLogin({ email, password })
      .then((data) => {
        console.log("User logged in:", data);
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  }

  function handleLogoutUser() {
    console.log("User logged out");
    setIsLoggedIn(false);
  }

  function handleCloseMobileMenu() {
    setHeaderMobile(false);
  }

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
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

  function handleFormSubmit(evt, newItem) {
    evt.preventDefault();
    newItem.name = {};
  }

  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((clothing) => clothing._id !== item._id)
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleAddItemSubmit({ name, imageUrl, weather }) {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
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
            isLoggedIn={isLoggedIn}
            handleCloseMobileMenu={handleCloseMobileMenu}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    handleCloseModal={handleCloseModal}
                    handleOpenAddClothesModal={handleOpenAddClothesModal}
                    handleLogoutUser={handleLogoutUser}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            handleCloseModal={handleCloseModal}
            handleDeleteItem={handleDeleteItem}
          />
          <AddItemModal
            isOpen={activeModal === "add-clothes-modal"}
            handleCloseModal={handleCloseModal}
            handleFormSubmit={handleFormSubmit}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register-modal"}
            handleCloseModal={handleCloseModal}
            handleFormSubmit={handleFormSubmit}
            handleRegisterUser={handleRegisterUser}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            handleCloseModal={handleCloseModal}
            handleFormSubmit={handleFormSubmit}
            handleLoginUser={handleLoginUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
