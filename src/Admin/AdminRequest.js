import { useEffect,useState } from "react";
import { collection,doc,getDocs, updateDoc } from "firebase/firestore";
import {db} from '../firebase/config'

const AdminRequests=()=>{

    const[request,setRequest]=useState([])

    useEffect(()=>{
        fetchRequest();
    },[])
    const fetchRequest=async()=>{
 const snap=await getDocs(collection(db,"bloodRequests"));
 const data=snap.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
 }))

 setRequest(data)
    }

    const approveRequest=async(id)=>{

        const ref=doc(db,"bloodRequests",id)
await updateDoc(ref,{
    status:"Approved"
});
fetchRequest();

    }

    console.log(request)

  return (
  <div className="admin-requests">
    <h2>🩸 Blood Requests</h2>

    <div className="request-list">
      {request.map((p) => (
        <div key={p.id} className="request-card">

          <div className="left">
            <h4>{p.patientName}</h4>
            <p>{p.bloodGroup} • {p.units} ml</p>
          </div>

          <div className="right">
            <span className={`status ${p.status.toLowerCase()}`}>
              {p.status}
            </span>

            {p.status === "Pending" && (
              <button
                className="approve-btn"
                onClick={() => approveRequest(p.id)}
              >
                Approve
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  </div>
);


}

export default AdminRequests;