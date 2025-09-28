import ModalWithForm from "./ModalWithForm";
import closeBtn from "../assets/close-btn.svg";

import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";

function AddItemModal({
  isOpen,
  onAddItem,
  onCloseModal,
  handleCloseModal,
  handleFormSubmit,
  handleAddItemSubmit,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddItemSubmit(values);
    handleCloseModal();
  };

  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <h3 className="modal__title">New garment</h3>
      <fieldset className="modal__fieldset">
        <label htmlFor="" className="modal__form-label">
          Name
          <input
            type="text"
            className="modal__form-input"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="" className="modal__form-label">
          Image
          <input
            type="URL"
            className="modal__form-input"
            placeholder="Image URL"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
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
            checked={values.weather === "warm"}
            onChange={handleChange}
            name="weather"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-label" name="weather">
          <input
            className="modal__radio-btn"
            type="radio"
            value="cold"
            id="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            name="weather"
          />
          Cold
        </label>
      </fieldset>
      <button
        className="modal__submit-btn"
        type="submit"
        onClick={handleCloseModal}
      >
        Add garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
