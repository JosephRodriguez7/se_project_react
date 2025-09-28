import ItemCard from "./ItemCard";
import closeBtn from "../assets/close-btn.svg";

function ItemModal({ card, isOpen, handleCloseModal, handleDeleteItem }) {
  function handleDelete() {
    handleDeleteItem(card);
  }

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
            <button className="modal__item-del-btn" onClick={handleDelete}>
              Delete item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
