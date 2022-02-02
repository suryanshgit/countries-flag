import storage from "../firebase/config";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import "../saas/DisplayRecord.css";

export default function DisplayRecord() {
  const [target, setTarget] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(async () => {
    const res = await fetch(
      "https://upload-download-img-default-rtdb.firebaseio.com/data.json"
    );
    const result = await res.json();
    console.log(Object.values(result));
    setData(Object.values(result));
  }, []);

  useEffect(() => {
    setTarget(data.filter((item) => item.name == selectedCountry));
  }, [selectedCountry]);

  return (
    <div>
      <select
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="selector"
      >
        <option>-select-</option>
        {data.map((item, index) => (
          <option key={index}>{item.name}</option>
        ))}
      </select>

      {target.map((item, index) => (
        <div key={index} className="content-container">
          <div>
            <img className="image-card" src={item.flag} />
          </div>
          <div>{item.name}</div>
          <div>{item.rank}</div>
          <div>{item.continent}</div>
        </div>
      ))}
    </div>
  );
}
