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
  const [errors, setErrors] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // simple validation
    const newErrors = {};
    if (!values.name || values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    try {
      // basic URL check
      const url = new URL(values.imageUrl);
      if (!url.protocol.startsWith("http")) throw new Error("Invalid protocol");
    } catch (e) {
      newErrors.imageUrl = "Please enter a valid image URL.";
    }
    if (!values.weather) {
      newErrors.weather = "Please select a weather type.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // submit and reset form
      handleAddItemSubmit(values);
      // reset values using setValues from useForm
      // useForm exposes setValues on the returned object
      setValues({ name: "", imageUrl: "", weather: "" });
      setErrors({});
      handleCloseModal();
    }
  };

  const { values, handleChange, setValues } = useForm({
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
        <label htmlFor="add-item-name" className="modal__form-label">
          Name
          <input
            id="add-item-name"
            type="text"
            className="modal__form-input"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-label="Garment name"
            aria-describedby={errors.name ? "add-item-name-error" : undefined}
          />
          {errors.name && (
            <span className="modal__field-error" id="add-item-name-error">
              {errors.name}
            </span>
          )}
        </label>
        <label htmlFor="add-item-imageUrl" className="modal__form-label">
          Image
          <input
            id="add-item-imageUrl"
            type="url"
            className="modal__form-input"
            placeholder="Image URL"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            aria-invalid={errors.imageUrl ? "true" : "false"}
            aria-label="Image URL"
            aria-describedby={
              errors.imageUrl ? "add-item-imageUrl-error" : undefined
            }
          />
          {errors.imageUrl && (
            <span className="modal__field-error" id="add-item-imageUrl-error">
              {errors.imageUrl}
            </span>
          )}
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
            aria-label="Hot weather"
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
            aria-label="Warm weather"
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
            aria-label="Cold weather"
          />
          Cold
        </label>
        {errors.weather && (
          <div className="modal__field-error" id="add-item-weather-error">
            {errors.weather}
          </div>
        )}
      </fieldset>
      <button className="modal__submit-btn" type="submit">
        Add garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
