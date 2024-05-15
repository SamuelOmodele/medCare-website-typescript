import React from 'react';
import appimage from '../../images/download-image.png';
import './ourapp.css';

const OurApp: React.FC = () => {
  return (
    <div className='ourapp'>
      <div className="content">
        <h2>Download our mobile apps</h2>
        <p>Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedious form, long calls, or administrative hassle) and securely</p>
        <button onClick={() => alert('Coming soon')}>Download</button>
      </div>
      <div className="image">
        <img src={appimage} alt="" />
      </div>
    </div>
  );
}

export default OurApp;
