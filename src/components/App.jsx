import { useEffect, useState } from "react";
import { defaultClothingItems } from "../utils/clothingItems";
import { getCurrentWeatherData } from "../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  likeItem,
  updateUser,
} from "../utils/api";
import { Routes, Route } from "react-router-dom";
import { userRegistration, userLogin, checkTokenValidity } from "../utils/auth";

import Header from "./Header";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Main from "./Main";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import AddItemModal from "./AddItemModal";
import UpdateUserModal from "./UpdateUserModal";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setHeaderMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isTokenValid, setTokenValidity] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function handleMobileMenu() {
    setHeaderMobile((prev) => !prev);
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  // function handleUserState

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
      .then((loginRes) => {
        console.log("User logged in:", loginRes);
        localStorage.setItem("jwt", loginRes.token);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  }

  function handleLogoutUser() {
    console.log("User logged out");
    localStorage.removeItem("jwt");
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

  function handleOpenEditUserModal() {
    setActiveModal("edit-user-modal");
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
    const token = localStorage.getItem("jwt");
    deleteItem(item._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((clothing) => clothing._id !== item._id)
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleLikeItem(item) {
    const token = localStorage.getItem("jwt");
    likeItem({ card: item._id, token })
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((currentItem) =>
            currentItem._id === item._id ? updatedItem : currentItem
          )
        );
      })
      .catch(console.error);
  }

  function handleUpdateUser(userData) {
    const token = localStorage.getItem("jwt");
    updateUser(userData, token)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Failed to update user:", err);
      });
  }

  function handleAddItemSubmit({ name, imageUrl, weather }) {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather, token })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch(console.error);
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      console.log(token);
      checkTokenValidity(token)
        .then((userData) => {
          console.log(userData);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.error("Token invalid or expired:", err);
        });
    }
  }, [isLoggedIn]);

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
        <CurrentUserContext.Provider value={{ currentUser }}>
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
                    defaultClothingItems={defaultClothingItems}
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
                      defaultClothingItems={defaultClothingItems}
                      handleOpenItemModal={handleOpenItemModal}
                      handleCloseModal={handleCloseModal}
                      handleOpenAddClothesModal={handleOpenAddClothesModal}
                      handleLogoutUser={handleLogoutUser}
                      handleOpenEditUserModal={handleOpenEditUserModal}
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
            <UpdateUserModal
              isOpen={activeModal === "edit-user-modal"}
              handleCloseModal={handleCloseModal}
              handleFormSubmit={handleFormSubmit}
              handleUpdateUser={handleUpdateUser}
            />
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
