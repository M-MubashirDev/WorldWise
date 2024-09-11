import { useState } from "react";

function Geolocation(position = null) {
  const [coordinate, setCoordinate] = useState(position);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  if (!navigator.geolocation)
    setError("your device does not support geolocation");
  function Location() {
    setIsloading(true);
    navigator.geolocation.getCurrentPosition(
      function (e) {
        setCoordinate({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
        });
        setIsloading(false);
      },
      function (err) {
        setError(err.message);
        setIsloading(false);
      }
    );
  }
  // Location();
  return { isloading, error, coordinate, Location };
}

export default Geolocation;
