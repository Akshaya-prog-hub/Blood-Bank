import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ManageStock = () => {

  const [stock, setStock] = useState([]);

  const fetchStock = async () => {
    const snap = await getDocs(collection(db, "bloodStock"));
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setStock(data);
     console.log("Stock data:", data);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const updateStock = async (id, change) => {
    const current = stock.find(s => s.id === id);
    const ref = doc(db, "bloodStock", id);

    await updateDoc(ref, {
      units: Number(current.units) + change
    });

    fetchStock();
  };

 


  return (
    <div className="stock">
      <h2>Manage Blood Stock</h2>

      {stock.map((p) => (
        <div className="stock-cards">
           <div className="stock-card" key={p.id}>
          <h3>{p.id}</h3>
          <p>{p.units} ml</p>

          <button onClick={() => updateStock(p.id, 100)}>+100</button>
          <button onClick={() => updateStock(p.id, -100)}>-100</button>
        </div>
        </div>
       
      ))}
    </div>
  );
};

export default ManageStock;
