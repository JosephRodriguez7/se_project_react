import { useContext } from "react";
import ItemCard from "./ItemCard";
import closeBtn from "../assets/close-btn.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, handleCloseModal, handleDeleteItem }) {
  function handleDelete() {
    handleDeleteItem(card);
  }

  // `CurrentUserContext.Provider` provides an object like { currentUser }
  // so we need to destructure it here to get the actual user object.
  const { currentUser } = useContext(CurrentUserContext);

  // Compare IDs as strings to avoid mismatches between ObjectId and string
  const isOwn =
    currentUser && card && String(card.owner) === String(currentUser._id);
  console.log("currentUser:", currentUser);
  console.log("card:", card);
  console.log("card.owner:", card?.owner);
  console.log("currentUser._id:", currentUser?._id);
  console.log("isOwn:", isOwn);

  return (
    <>
      <div className={`modal${isOpen ? " modal__is-opened " : ""}`}>
        <div className="modal__item">
          <button className="modal__item-close-btn" onClick={handleCloseModal}>
            <img src={closeBtn} alt="close button" />
          </button>
          <img src={card.imageUrl} alt="" className="modal__item-img" />
          <div className="modal__item-panel">
            <div className="modal__item-info">
              <p className="modal__item-name">{card.name}</p>
              <p className="modal__item-weather">Weather: {card.weather}</p>
            </div>
            {isOwn && (
              <button className="modal__item-del-btn" onClick={handleDelete}>
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
