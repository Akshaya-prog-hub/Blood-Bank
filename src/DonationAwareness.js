import React from "react";


const DonationAwareness = () => {
  return (
    <section className="awareness-section">
      <h2>Why Donate Blood?</h2>

      <div className="awareness-grid">
        <div className="awareness-card">
          <h3>Every Drop Counts</h3>
          <p>
            One blood donation can save up to three lives. Your small act
            creates a big impact.
          </p>
        </div>

        <div className="awareness-card ">
          <h3>Be a Hero Today</h3>
          <p>
            During emergencies, your donated blood becomes someone’s second
            chance at life.
          </p>
        </div>

        <div className="awareness-card">
          <h3>Safe & Simple</h3>
          <p>
            Blood donation is a safe, simple process that helps hospitals save
            lives every day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationAwareness;
