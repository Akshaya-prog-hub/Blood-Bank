import React, { useState } from 'react'
import {db} from './firebase/config'
import {collection,addDoc} from 'firebase/firestore'

const Donate = () => {
  const[form,setForm]=useState({
    name:"",
    age:"",
    blood:"",
    phone:"",
    city:"",
  })
const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
  e.preventDefault();

  try{
  await addDoc(collection(db,"donors"),{
    ...form,
    createdAt:new Date(),
  });
  alert("Form submitted Successfully!!")
  setForm({
      name: "",
        age: "",
        blood: "",
        phone: "",
        city: "",
  })
  }
  catch(error){
    console.log(error)
  }

}
  return (
       <div className="donate">
        <form className="form_main" onSubmit={handleSubmit}>
      <p className="heading">Donate Blood</p>

      <div className="inputContainer">
        <input
          type="text"
          className="inputField"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="inputContainer">
        <input
          type="number"
          className="inputField"
          placeholder="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="inputContainer">
        <select
          className="inputField"
          name="blood"
          value={form.blood}
          onChange={handleChange}
          required
        >
          <option value="">Blood Group</option>
          <option>A+</option><option>A-</option>
          <option>B+</option><option>B-</option>
          <option>O+</option><option>O-</option>
          <option>AB+</option><option>AB-</option>
        </select>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          className="inputField"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="inputContainer">
        <input
          type="text"
          className="inputField"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      <button id="button" type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Donate

