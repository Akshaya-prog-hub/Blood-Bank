import React, { useState } from "react";
import { db } from "./firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="contact-wrapper">
      <form className="form_main" onSubmit={handleSubmit}>
        <h2 className="heading">Contact Us</h2>
        <p className="subtext">Need help or emergency support?</p>

        <div className="inputContainer">
          <input
            className="inputField"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <input
            className="inputField"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <input
            className="inputField"
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <textarea
            className="inputField textarea"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button className="sendBtn">Send Message</button>

        <div className="contact-info">
          <p>📧 support@bloodbank.com</p>
          <p>📍 Coimbatore, Tamil Nadu</p>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
