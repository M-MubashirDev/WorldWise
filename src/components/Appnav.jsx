import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function Appnav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="country">country</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Appnav;
