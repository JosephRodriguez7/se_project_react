import closeBtn from "../assets/close-btn.svg";

function ModalWithForm({ isOpen, handleCloseModal, children, handleSubmit }) {
  return (
    <>
      <div className={`modal${isOpen ? " modal__is-opened " : ""}`}>
        <div className="modal__container">
          <button className="modal__close-btn" onClick={handleCloseModal}>
            <img src={closeBtn} alt="close button" />
          </button>
          <form className="modal__form" onSubmit={handleSubmit}>
            {children}
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
