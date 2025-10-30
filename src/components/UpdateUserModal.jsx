import ModalWithForm from "./ModalWithForm";
import { useEffect, useState, useContext } from "react";
import { useForm } from "../hooks/useForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function UpdateUserModal({ isOpen, handleCloseModal, handleUpdateUser }) {
  const [errors, setErrors] = useState({});

  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newErrors = {};

    if (!values.name || values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    try {
      const url = new URL(values.avatar);
      if (!url.protocol.startsWith("http")) throw new Error("Invalid protocol");
    } catch (e) {
      newErrors.avatar = "Please enter a valid image URL.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleUpdateUser(values);
      setValues({ name: "", avatar: "" });
      setErrors({});
      handleCloseModal();
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && values.name && values.avatar;

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <h3 className="modal__title">Change profile data</h3>
      <fieldset className="modal__fieldset">
        <label htmlFor="name" className="modal__form-label">
          Name *
          <input
            id="name"
            type="text"
            className="modal__form-input"
            placeholder="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && (
            <span className="modal__field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </label>

        <label htmlFor="avatar" className="modal__form-label">
          Avatar *
          <input
            id="avatar"
            type="url"
            className="modal__form-input"
            placeholder="avatar"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
            aria-invalid={errors.avatar ? "true" : "false"}
            aria-describedby={errors.avatar ? "avatar-error" : undefined}
            required
          />
          {errors.avatar && (
            <span className="modal__field-error" id="avatar-error">
              {errors.avatar}
            </span>
          )}
        </label>
      </fieldset>
      <button className="modal__save-btn" type="submit" disabled={!isFormValid}>
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default UpdateUserModal;
