import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Brand */}
        <div className="footer-left">
          <img src="/assets/logo.jpg" alt="Logo" className="footer-logo" />
          <h2>CAKE Aura</h2>
        </div>

        {/* Columns */}
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="/our-story">Our Story</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/locate-us">Locate Us</a></li>
              <li><a href="/career">Career</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="/help">Need Help</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/cancellation-policy">Cancellation Policy</a></li>
              <li><a href="/policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Varunavi Cake. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
