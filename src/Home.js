import React, { useState } from "react";
import {Link} from 'react-router-dom'
import DonationAwareness from './DonationAwareness';
import { CiMenuBurger } from "react-icons/ci";

const Home = () => {

  const[open,setOpen]=useState(false)

  return (
    <div className="cardHome">

      <nav className="cardNav">
        <div className="cardLogo">BloodBank+</div>

        <div className="menuIcon" onClick={()=>setOpen(!open)}>
<CiMenuBurger />
        </div>

        <ul className={open? "cardLinks active":"cardLinks"}>
        <Link to="/home">
 <li>Home</li>
</Link>
<Link to="/donate">
 <li>Donate</li>
</Link>
         
       <Link to="/avail">
 <li>Availability</li>
</Link>
       <Link to="/contact">
 <li>Contact</li>
</Link>
        </ul>
      </nav>

      <section className="cardHero">
             <div className="firstcard">
 <div className="introCard">
          <h1>Donate Blood, Save Lives ❤️</h1>
          <p>Your simple act of kindness can give someone a second chance at life.</p>
        </div>
         <div className="split-image-container">
    <div className="quadrant quadrant-1"></div>
    <div className="quadrant quadrant-2"></div>
    <div className="quadrant quadrant-3"></div>
    <div className="quadrant quadrant-4"></div>
  </div>
             </div>
       

        <div className="optionsGrid">
<div className="card">
  <div className="content">
  <h2>Donate Blood</h2>
 <p>Help save lives by donating blood today</p> 
 <Link to="/donate">
 <button className="buttons">
  Donate
</button>
 </Link>

      </div>
</div>
<div className="card">
  <div className="content">
  <h2>Request Blood</h2>
    <p>Find blood quickly during emergency situations</p>
    <Link to="/request">
    <button className="buttons">
      Request
    </button></Link>
      </div>
</div>

<div className="card">
  <div className="content">
  <h2>Check Availability</h2>
    <p>View real-time blood stock by blood group</p>
     <Link to="/avail">
      <button className="buttons">
      Check
    </button></Link>
   
      </div>
</div>
        </div>
      </section>
<DonationAwareness/>
      

    </div>
  );
};

export default Home;
