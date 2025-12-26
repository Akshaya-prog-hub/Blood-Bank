import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

const Available = () => {
  const [donors, setDonors] = useState([]);
  const[blood,setBlood]=useState("");
  const[city,setCity]=useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      const snapshot = await getDocs(collection(db, "donors"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonors(list);
    };
    fetchDonors();
  }, []);

  return (
    <div className="available">
      <div className="inputs">
        <div className="filters">
  <select onChange={(e)=>setBlood(e.target.value)}>
    <option value="">All Blood Groups</option>
  <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>O+</option><option>O-</option>
          <option>AB+</option><option>AB-</option>
  </select>

  <input type="text" placeholder="Search city" 
  onChange={(e)=>setCity(e.target.value)}/>
</div>
      </div>

<div className="container">
{
  donors.filter(d=>
  (blood==="" || d.blood===blood)&&
  (city==="" || d.city.toLowerCase().includes(city.toLowerCase()))
  )
  .map((p)=>(
    <div className="container1">
      <h3>{p.name}</h3>
              <p>🩸 {p.blood}</p>
              <p>📍 {p.city}</p>
              <p>📞 {p.phone}</p>
    </div>
  ))
}
</div>
    </div>
  );
};

export default Available;
