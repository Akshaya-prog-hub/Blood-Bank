import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [donors, setDonors] = useState(0);
  const [requests, setRequests] = useState(0);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);
  const [groupCount, setGroupCount] = useState({});
  const [todayCount, setTodayCount] = useState(0);



  useEffect(() => {
    const fetchDashboard = async () => {
      const donorSnap = await getDocs(collection(db, "donors"));
      setDonors(donorSnap.size);

      const requestSnap = await getDocs(collection(db, "bloodRequests"));
      setRequests(requestSnap.size);

      let p = 0, a = 0, units = 0;
      let groups = {};
      let todayReq = 0;
      const recent = [];
      const today = new Date().toISOString().split("T")[0];

      requestSnap.forEach((d) => {
        const data = d.data();

        if (data.status === "Pending") p++;
        if (data.status === "Approved") a++;

        units += Number(data.units || 0);

        if (data.bloodGroup) {
          groups[data.bloodGroup] = (groups[data.bloodGroup] || 0) + 1;
        }

        if (data.date === today) todayReq++;

        recent.push(data);
      });

      setPending(p);
      setApproved(a);
      setTotalUnits(units);
      setGroupCount(groups);
      setTodayCount(todayReq);
      setRecentRequests(recent.slice(0, 5));
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h2 style={{textAlign:"center"}}>Admin Dashboard</h2>

      <div className="cards2">
        <div className="card2">
          <p>Total Donors</p>
          <h2>{donors}</h2>
        </div>
        <div className="card2">
          <p>Total Requests</p>
          <h2>{requests}</h2>
        </div>
        <div className="card2">
          <p>Total Units Requested</p>
          <h2>{totalUnits}</h2>
        </div>
        <div className="card2 blue">
          <p>Today Requests</p>
          <h2>{todayCount}</h2>
        </div>
      </div>

      <div className="cards2">
        <div className="card2Yellow">
          <p>Pending Requests</p>
          <h2>{pending}</h2>
        </div>
        <div className="card2green">
          <p>Approved Requests</p>
          <h2>{approved}</h2>
        </div>
      </div>

      {pending > 0 && (
        <div className="alertBox">
          {pending} blood requests are waiting for approval
        </div>
      )}

      <div className="section">
        <h3>Blood Group Demand</h3>
        <ul className="simpleList">
          {Object.keys(groupCount).length > 0 ? (
            Object.keys(groupCount).map((bg) => (
              <li key={bg}>
                {bg} → {groupCount[bg]} requests
              </li>
            ))
          ) : (
            <li>No data</li>
          )}
        </ul>
      </div>

      <div className="section">
        <h3>Quick Actions</h3>
        <div className="actions">
          <Link to="/add"><button>Add Donor</button></Link>
          <Link to="/status"><button>View Requests</button></Link>
          <Link to="/stock"><button>Manage Stock</button></Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
