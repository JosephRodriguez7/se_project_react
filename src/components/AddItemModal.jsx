import ModalWithForm from "./ModalWithForm";
import closeBtn from "../assets/close-btn.svg";
import { useEffect, useState } from "react";

function AddItemModal({ isOpen, onAddItem, onCloseModal, handleCloseModal }) {
  return (
    <ModalWithForm isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <div className={`modal${isOpen ? " modal__is-opened " : ""}`}>
        <div className="modal__container">
          <button className="modal__close-btn" onClick={handleCloseModal}>
            <img src={closeBtn} alt="close button" />
          </button>
          <form action="submit" className="modal__form">
            <h3 className="modal__title">New garment</h3>
            <fieldset className="modal__fieldset">
              <label htmlFor="" className="modal__form-label">
                Name
                <input
                  type="text"
                  className="modal__form-input"
                  placeholder="Name"
                  required
                />
              </label>
              <label htmlFor="" className="modal__form-label">
                Image
                <input
                  type="URL"
                  className="modal__form-input"
                  placeholder="Image URL"
                  required
                />
              </label>
            </fieldset>
            <fieldset className="modal__form-buttons">
              <h3 className="modal__buttons-title">Select the weather type:</h3>
              <label htmlFor="hot" className="modal__radio-label">
                <input
                  className="modal__radio-btn"
                  type="radio"
                  value="hot"
                  id="hot"
                  name="weather"
                />
                Hot
              </label>
              <label htmlFor="warm" className="modal__radio-label">
                <input
                  className="modal__radio-btn"
                  type="radio"
                  value="warm"
                  id="warm"
                  name="weather"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__radio-label"
                name="weather"
              >
                <input
                  className="modal__radio-btn"
                  type="radio"
                  value="cold"
                  id="cold"
                  name="weather"
                />
                Cold
              </label>
            </fieldset>
            <button className="modal__submit-btn" type="submit">
              Add garment
            </button>
          </form>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
