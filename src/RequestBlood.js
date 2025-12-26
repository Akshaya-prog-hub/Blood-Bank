import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/config";

const RequestBlood = () => {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    units: "",
    urgency: "",
    hospital: "",
    city: "",
    contactName: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientName || !form.bloodGroup || !form.units || !form.phone) {
      alert("Fill all the Details");
      return;
    }

    await addDoc(collection(db, "bloodRequests"), {
      ...form,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      createdAt: Timestamp.now()
    });

    alert("Blood request submitted successfully 🩸");

    setForm({
      patientName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      units: "",
      urgency: "",
      hospital: "",
      city: "",
      contactName: "",
      phone: "",
      notes: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="requestForm">
      <h2>Blood Request</h2>

      <input name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
        <option value="">Select Blood Group</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>O+</option><option>O-</option>
        <option>AB+</option><option>AB-</option>
      </select>

      <input name="units" placeholder="Units (ml)" value={form.units} onChange={handleChange} />

      <select name="urgency" value={form.urgency} onChange={handleChange}>
        <option value="">Urgency</option>
        <option>Normal</option>
        <option>Emergency</option>
      </select>

      <input name="hospital" placeholder="Hospital Name" value={form.hospital} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="contactName" placeholder="Contact Person" value={form.contactName} onChange={handleChange} />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}></textarea>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestBlood;
