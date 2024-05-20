import React from 'react'
import './emergency.css'
import { useNavigate } from 'react-router-dom'

const Emergency = () => {

  const navigate = useNavigate();

  return (
    <div className='dashboard'>

      <div className="dashboard-nav">
        <p>Medicare Health Clinic</p>
      </div>

      <div className='body-section'>
        <div className="container">

          <p className='head-text'>
            <span className="material-symbols-outlined">ambulance</span> Emergency
          </p>

          <div className="emergency-box">
            <p>Reach out for emergencies using our hot lines</p>
            <li><span className="material-symbols-outlined">phone</span> 07022992718</li>
            <li><span className="material-symbols-outlined">phone</span> 08002348819</li>
            <li><span className="material-symbols-outlined">phone</span> 09023894992</li>
          </div>

          <div className="back-btn" onClick={() => navigate(-1)}>
            <div className='back-icon'>
              <span className="material-symbols-outlined back-arrow" >arrow_back</span>
            </div>
            <span>Back</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Emergency