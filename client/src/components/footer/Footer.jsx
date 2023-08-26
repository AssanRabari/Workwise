 import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Programming & Tech</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Graphics & Design</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Photography</span>
            <span>Business</span>
            <span>Lifestyle</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Workwise</span>
            <span>Buying on Workwise</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From Workwise</h2>
            <span>Workwise Business</span>
            <span>Workwise Pro</span>
            <span>Workwise Logo Maker</span>
            <span>Workwise Guides</span>
            <span>Get Inspired</span>
            <span>Workwise Select</span>
            <span>ClearVoice</span>
            <span>Workwise Workspace</span>
            <span>Learn</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Workwise</h2>
            <span>© Workwise International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
