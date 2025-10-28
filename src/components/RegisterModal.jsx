import ModalWithForm from "./ModalWithForm";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

function RegisterModal({ isOpen, handleCloseModal, handleRegisterUser }) {
  const [errors, setErrors] = useState({});

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

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

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!values.password || values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleRegisterUser(values);
      setValues({ email: "", password: "", name: "", avatar: "" });
      setErrors({});
      handleCloseModal();
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    values.email &&
    values.password &&
    values.name &&
    values.avatar;

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <h3 className="modal__title">Sign Up</h3>
      <fieldset className="modal__fieldset">
        <label htmlFor="email" className="modal__form-label">
          Email*
          <input
            id="email"
            type="email"
            className="modal__form-input"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <span className="modal__field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </label>

        <label htmlFor="password" className="modal__form-label">
          Password*
          <input
            id="password"
            type="password"
            className="modal__form-input"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            required
          />
          {errors.password && (
            <span className="modal__field-error" id="password-error">
              {errors.password}
            </span>
          )}
        </label>

        <label htmlFor="name" className="modal__form-label">
          Name*
          <input
            id="name"
            type="text"
            className="modal__form-input"
            placeholder="Name"
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
          Avatar URL*
          <input
            id="avatar"
            type="url"
            className="modal__form-input"
            placeholder="Avatar URL"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
            aria-invalid={errors.avatar ? "true" : "false"}
            aria-describedby={errors.avatar ? "avatar-error" : undefined}
          />
          {errors.avatar && (
            <span className="modal__field-error" id="avatar-error">
              {errors.avatar}
            </span>
          )}
        </label>
      </fieldset>

      <div className="modal__buttons">
        <button
          className="modal__signup-btn"
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
        <button
          className="modal__login-btn"
          type="button"
          onClick={handleCloseModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
