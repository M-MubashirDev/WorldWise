// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import Spinner from "./Spinner";
// import { useState } from "react";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import GetUrl from "../hooks/GetUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCityHook } from "../Contexts/CitieszContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const urlform = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const navigate = useNavigate();
  const { lat, lng } = GetUrl();
  console.log(lat);
  const [cityName, setCityName] = useState("");
  const [ErrorForm, setFromError] = useState("");
  const [country, setCountry] = useState("");
  const [date, setdate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isloadingForm, setisloadingForm] = useState(false);
  const [emoji, setEmoji] = useState("");
  const { AddCity } = useCityHook();
  function SubmissionForm(e) {
    e.preventDefault();
    if (!lat && !lng) return;
    const objCityPass = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat,
        lng,
      },
    };
    AddCity(objCityPass);
    navigate("/layout/cities");
  }
  useEffect(
    function () {
      if (!lat && !lng) return;
      setisloadingForm(true);
      setFromError("");
      async function dataForm() {
        try {
          console.log(lat);
          const resp = await fetch(
            `${urlform}?latitude=${lat}&longitude=${lng}`
          );
          const data = await resp.json();
          if (!data.city) throw new Error("Its not a city try somewhere else");
          setCountry(data.countryName);
          console.log(data);
          setCityName(data.city);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.error(err.message);
          setFromError(err.message);
        } finally {
          setisloadingForm(false);
        }
      }
      dataForm();
    },
    [lat, lng]
  );
  // const [startDate, setStartDate] = useState(new Date());
  if (isloadingForm) return <Spinner />;
  if (ErrorForm)
    return <Message message={"Its not a city try somewhere else"} />;
  if (!lat && !lng)
    return <Message message={"Please select location from map"} />;

  return (
    <form className={styles.form} onSubmit={SubmissionForm}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setdate(date)}
          dateFormat="dd/mm/yyyy"
        />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button Goto="primary">Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          Goto="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
