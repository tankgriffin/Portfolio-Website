import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div
      className="contact-page"
      style={{
        backgroundImage: "url('contact-background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="contact-box">
        <h1>Contact Me</h1>
        <p>📧 tankgriffin16@gmail.com</p>
        <p>💼 linkedin.com/in/teancumgriffin</p>
        <p>💻 github.com/teancumgriffin</p>
      </div>

      <img
        src="/mission.png"
        alt="Mission"
        className="mission-stamp"
      />
    </div>
  );
}

export default Contact;
