function ItemCard({ data, handleOpenItemModal }) {
  function handleOpenCard() {
    handleOpenItemModal(data);
  }

  return (
    <>
      <li className="card">
        <p className="card__caption">{data.name}</p>
        <img
          src={data.imageUrl}
          alt={data.name}
          className="card__image"
          onClick={handleOpenCard}
        />
      </li>
    </>
  );
}

export default ItemCard;
