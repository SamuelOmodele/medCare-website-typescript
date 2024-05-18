import React, { useEffect, useRef, useState } from 'react';
import './appointment.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const Appointment = () => {

  // --- state variables ---
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [appointmentTitle, setAppointmentTitle] = useState<string>('');
  const [appointmentMsg, setAppointmentMsg] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  // --- function to book an appointment when the form is submitted ---
  const bookAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const current_date_time = new Date();
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);

    if (appointmentDateTime < current_date_time){
      // alert('Appointment date and time must be in the future! ')
      setErrorMsg('Appointment date and time must be in the future! ');

      pageRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      return;
    }

    setErrorMsg('');

    try {
      await addDoc(collection(db, 'AppointmentRecord'), {
        uniqueId: v4(),
        email: userEmail,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        appointmentTitle: appointmentTitle,
        appointmentMsg: appointmentMsg,
        createdAt: new Date()
      });
      alert('Appointment Scheduled Successfully');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  // --- useEffect hook, to fetch the user data, and appointment list from the firestore database on page load ---
  useEffect(() => {
    let current_user = localStorage.getItem('userEmail');
    if (current_user) {
      setUserEmail(current_user);
    } else {
      console.log('User not found');
      navigate('/login');
    }
  }, []);

  // --- render ---
  return (
    <div className='appointment' ref={pageRef}>
      <div className="dashboard-nav">
        <p>Medicare Health Clinic</p>
      </div>

      {errorMsg !== '' && (
        <div className="error-appointment">
          <span className="material-symbols-outlined">error</span>
          <span className="error-text"> {errorMsg}</span>
          <span className="material-symbols-outlined" onClick={() => setErrorMsg('')}>
            close
          </span>
        </div>
      )}

      <div className="back" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined back-arrow" >arrow_back</span>
      </div>

      <div className="appointment-form">
        <form action="" onSubmit={bookAppointment}>
          <h2>Book an Appointment</h2>
          <div className="form-control">
            <label htmlFor="date">Appointment Date</label>
            <input type="date" name="date" id="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="date">Time</label>
            <input type="time" name="time" id="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor=''>Title <small>(15 characters max)</small></label>
            <input type="text" name="title" id="title" placeholder='Title ...' value={appointmentTitle} onChange={(e) => setAppointmentTitle(e.target.value)} required maxLength={20} />
          </div>
          <div className="form-control">
            <label htmlFor="message">Enter Message</label>
            <textarea name="message" id="message" cols={30} rows={10} placeholder='Enter your message ...' style={{ resize: 'none' }} value={appointmentMsg} onChange={(e) => setAppointmentMsg(e.target.value)} required></textarea>
          </div>
          <div className="form-control">
            <button type='submit' className='btn-appointment'>Book Appointment</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Appointment;
