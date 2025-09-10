import ItemCard from "./ItemCard";
import closeBtn from "../assets/close-btn.svg";

function ItemModal() {
  return (
    <>
      <div className="modal">
        <div className="modal__card">
          <button className="modal__close-btn">
            <img src={closeBtn} alt="close button" />
          </button>
          <img src={ItemCard.link} alt="" className="modal__card-img" />
          <p className="modal__item-name">Cap</p>
          <p className="modal__item-weather">Weather: hot</p>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
