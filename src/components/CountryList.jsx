import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCityHook } from "../Contexts/CitieszContext";

function CountryList() {
  const { isloading, passObj } = useCityHook();
  if (isloading) return <Spinner />;
  if (!passObj) return <Message />;
  const countryObj = passObj.reduce((acc, val) => {
    if (
      !acc
        .map((value) => {
          return value.country;
        })
        .includes(val.country)
    )
      return [...acc, { country: val.country, emoji: val.emoji, id: val.id }];
    else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countryObj.map((val) => (
        <CountryItem key={val.id} country={val} />
      ))}
    </ul>
  );
}

export default CountryList;
