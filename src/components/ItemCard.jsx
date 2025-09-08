import "./blocks/ItemCard.css";

function ItemCard({ data }) {
  return (
    <>
      <li className="card">
        <p className="card__caption">{data.name}</p>
        <img src={data.link} alt={data.name} className="card__image" />
      </li>
    </>
  );
}

export default ItemCard;
