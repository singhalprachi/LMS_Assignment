import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Digital Library</h2>
        <p className="about-intro">
          Welcome to <strong>Digital Library</strong> — your digital companion for managing and exploring books efficiently.
          Designed to simplify library operations, it provides an elegant and intuitive interface for both readers and
          administrators.
        </p>

        <div className="about-content">
          <div className="about-card">
            <h3>📚 Our Vision</h3>
            <p>
              To bridge the gap between readers and knowledge by providing an intelligent, easy-to-use, and accessible
              digital library experience for institutions and individuals alike.
            </p>
          </div>

          <div className="about-card">
            <h3>⚙️ What We Offer</h3>
            <ul>
              <li>Seamless book search and catalog management</li>
              <li>Smart tracking for issued and returned books</li>
              <li>Role-based access for librarians and users</li>
              <li>Responsive interface for desktop and mobile users</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>🤝 Our Mission</h3>
            <p>
              To empower learning through technology by making libraries more dynamic, connected, and efficient. We aim
              to build a system that promotes reading culture while saving time for librarians and students.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
