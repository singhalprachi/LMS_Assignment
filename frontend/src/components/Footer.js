import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div>
        <div className='footer-data'>
          <div className="contact-details">
            <h1>Contact Us</h1>
            <p><b>Email:</b> prachisinghal@gmail.com</p>
          </div>
          <div className='librarian-details'>
            <h1>Librarian</h1>
            <p>Prachi Singhal</p>
            <p>BTech Graduate</p>
            <p>Contact: +91 943569321</p>
          </div>
        </div>
      </div>
      <div className='copyright-details'>
        <p className='footer-copyright'>
          &#169; 2025 All rights reserved<br />
          <span>Designed with ❤️ by Prachi Singhal</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
