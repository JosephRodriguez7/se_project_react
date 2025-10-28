import ModalWithForm from "./ModalWithForm";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

function LoginModal({
  isOpen,
  handleCloseModal,
  handleLogin,
  handleLoginUser,
}) {
  const [errors, setErrors] = useState({});

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newErrors = {};

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!values.password || values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleLoginUser(values);
      setValues({ email: "", password: "" });
      setErrors({});
      handleCloseModal();
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && values.email && values.password;

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <h3 className="modal__title">Log In</h3>
      <fieldset className="modal__fieldset">
        <label htmlFor="email" className="modal__form-label">
          Email
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
          Password
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
      </fieldset>

      <div className="modal__buttons">
        <button
          className="modal__signup-btn"
          type="submit"
          disabled={!isFormValid}
        >
          Log In
        </button>
        <button
          className="modal__login-btn"
          type="button"
          onClick={handleCloseModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
