import "./blocks/itemModal.css";
import ItemCard from "./ItemCard";
import closeBtn from "../assets/close-btn.svg";

function ItemModal({ card, isOpen, handleCloseModal }) {
  return (
    <>
      <div className={`modal${isOpen ? " modal__is-opened " : ""}`}>
        <div className="modal__item">
          <button className="modal__item-close-btn" onClick={handleCloseModal}>
            <img src={closeBtn} alt="close button" />
          </button>
          <img src={card.link} alt="" className="modal__item-img" />
          <p className="modal__item-name">{card.name}</p>
          <p className="modal__item-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
