import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCityHook } from "../Contexts/CitieszContext";
function CityItems({ cities }) {
  const { DeleteCity } = useCityHook();
  const { cityName, emoji, date, id, position } = cities;
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  function DeleteFun(e) {
    e.preventDefault();
    console.log(id);
    DeleteCity(id);
  }
  // const par = useParams();
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={DeleteFun}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItems;
