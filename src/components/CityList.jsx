import styles from "./CityList.module.css";
import CityItems from "./CityItems";
import Spinner from "./Spinner";
import { useCityHook } from "../Contexts/CitieszContext";
import Message from "./Message";
function CityList() {
  const { isloading, passObj } = useCityHook();
  if (isloading) return <Spinner />;
  if (!passObj) return <Message />;
  return (
    <ul className={styles.cityList}>
      {passObj.map((val) => (
        <CityItems key={val.id} cities={val} />
      ))}
    </ul>
  );
}

export default CityList;
