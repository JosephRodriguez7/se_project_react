import ItemCard from "./ItemCard";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddClothesModal,
}) {
  return (
    <section className="clothes__section">
      <div className="clothes__header">
        <h3 className="clothes__title">Your items</h3>
        <button
          className="clothes__add-btn"
          onClick={handleOpenAddClothesModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__container">
        <ul className="clothes__cards-list">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                data={item}
                handleOpenItemModal={handleOpenItemModal}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ClothesSection;
