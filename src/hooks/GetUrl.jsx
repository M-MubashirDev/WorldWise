import { useSearchParams } from "react-router-dom";

function GetUrl() {
  const [searchparam] = useSearchParams();
  const lat = searchparam.get("lat");
  const lng = searchparam.get("lng");
  return { lat, lng };
}

export default GetUrl;
