import React, { useState } from 'react'
import {collection,addDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase/config';

const AddDonor = () => {

  const[form,setForm]=useState({
    name:"",
    age:"",
    blood:"",
    gender:"",
    city:"",
    phone:""
  });

  const handleChange=(e)=>{
setForm(
    {...form,[e.target.name]:e.target.value}
)
  }

  const handleSubmit=async(e)=>{
e.preventDefault();

await addDoc(collection(db,"donors"),{
    ...form,
    createdAt:serverTimestamp()
})

alert("Donor added Succesfully")

setForm({
    name:"",
    age:"",
    blood:"",
    gender:"",
    city:"",
    phone:""
})
  }

 return (
  <div className="add-donor-page">
    <div className="add-donor-card">
      <h2>🩸 Add New Donor</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Donor Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

        <select name="blood" value={form.blood} onChange={handleChange}>
          <option value="">Blood Group</option>
          <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>O+</option><option>O-</option>
          <option>AB+</option><option>AB-</option>
        </select>

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

        <button type="submit">Add Donor</button>
      </form>
    </div>
  </div>
);

}

export default AddDonor;
