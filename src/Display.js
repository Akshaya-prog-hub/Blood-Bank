import React, { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Display = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "Data1"));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Firestore Data</h2>

      {users.map(user => (
        <div
          key={user.id}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid black",
            width: "200px"
          }}
        >
          <p><b>Name:</b> {user.Name}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Blood:</b> {user.bloodgroup}</p>
        </div>
      ))}
    </div>
  );
};

export default Display;
