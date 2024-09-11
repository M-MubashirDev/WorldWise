import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCityHook } from "../Contexts/CitieszContext";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import Geolocation from "../hooks/Geolocation";
import GetUrl from "../hooks/GetUrl";
import User from "./User";
// import styles from "./Map.module.css";
function Map() {
  const [mapPosition, setMaposition] = useState([40, 0]);
  const { passObj } = useCityHook();
  const { lat, lng } = GetUrl();
  const { isloading, coordinate, Location } = Geolocation();
  useEffect(
    function () {
      console.log(coordinate);
      if (coordinate) setMaposition([coordinate.lat, coordinate.lng]);
    },
    [coordinate]
  );
  useEffect(
    function () {
      console.log(lat, lng);
      if (lat || lng) setMaposition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      {!coordinate && (
        <Button
          Goto="position"
          onClick={(e) => {
            e.preventDefault();
            Location();
          }}
        >
          {isloading ? "loading..." : "get own position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={8}
        scrollWheelZoom={true}
      >
        <LocationFinder />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {passObj.map((val) => (
          <Marker position={[val.position.lat, val.position.lng]} key={val.id}>
            <Popup>
              <span>{val.emoji}</span>
            </Popup>
          </Marker>
        ))}
        <View position={mapPosition} />
      </MapContainer>
      <User />
    </div>
  );
}
function View({ position }) {
  console.log(position);
  const map = useMap();
  map.setView(position);
  return null;
}
function LocationFinder() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;
