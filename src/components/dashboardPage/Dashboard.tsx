import { useEffect, useRef, useState } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

type Appointment = {
  uniqueId: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentTitle: string;
  appointmentMsg: string;
  createdAt: Date;
};

type Service = {
  functionCall: () => void;
  icon: string;
  title: string;
  description: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userAppointmentList, setUserAppointmentList] = useState<Appointment[]>([]);
  const [comingSoonAlert, setComingSoonAlert] = useState<boolean>(false);
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current_user = localStorage.getItem('userEmail');
    if (current_user) {
      fetchCurrentUser(current_user);
      fetchUserAppointment(current_user);
    } else {
      console.log('User not found');
      navigate('/login');
    }
  }, []);

  // --- fetch appointment using the user email ---
  const fetchUserAppointment = async (email: string) => {
    try {
      const q = query(collection(db, 'AppointmentRecord'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          fetchAppointmentDocument(doc.id);
        });
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const fetchAppointmentDocument = async (id: string) => {
    try {
      const docRef = doc(db, 'AppointmentRecord', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const newAppointment = docSnap.data() as Appointment;
        
        // Check if the appointment ID already exists in the userAppointmentList
        if (!userAppointmentList.some(appointment => appointment.uniqueId === newAppointment.uniqueId)) {
          setUserAppointmentList(prevAppointments => [...prevAppointments, newAppointment]);
        } else {
          console.log("Appointment already exists in the list");
        }
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }
  
  // --- fetch the user data using the user email ---
  const fetchCurrentUser = async (email: string) => {
    try {
      const q = query(collection(db, 'UserRecord'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          fetchDocument(doc.id);
        });
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const fetchDocument = async (id: string) => {
    try {
      const docRef = doc(db, 'UserRecord', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  const goToAppointment = () => {
    navigate('/appointment');
  }

  const comingSoon = () => {
    setComingSoonAlert(true);
  }

  // --- services
  const services: Service[] = [
    {
      functionCall: comingSoon,
      icon: 'local_pharmacy',
      title: 'Online Pharmacy',
      description: 'Your online pharmacy for quality care, delivered.'
    },
    {
      functionCall: goToAppointment,
      icon: 'book_online',
      title: 'Schedule Appointment',
      description: 'Easily book appointments online with us. Your health, your schedule, our priority.'
    },
    {
      functionCall: comingSoon,
      icon: 'receipt_long',
      title: 'Pay Bills',
      description: 'Pay your bills hassle-free with our secure online portal. Convenient, efficient, and worry-free transactions'
    },
    {
      functionCall: comingSoon,
      icon: 'ambulance',
      title: 'Emergency',
      description: 'Urgent care when you need it most. Trust us for prompt and compassionate emergency services'
    },
  ];

  return (
    <div className='dashboard' ref={contentRef}>
      <div className="dashboard-nav">
        <p>Medicare Health Clinic</p>
      </div>
      
      {comingSoonAlert && <div className="coming-soon-alert">
        Coming Soon
        <span className="material-symbols-outlined" onClick={() => setComingSoonAlert(false)}>close</span>
      </div>}
      
      <div className='body-section'>
        {user && <>
          <div className="container">
            <p className='head-text'><span className="material-symbols-outlined">Dashboard</span> Dashboard</p>
            
            <div className="boxes">
              {services.map((service, index) => (
                <div className="box" onClick={service.functionCall} key={index}>
                  <span className="material-symbols-outlined">{service.icon}</span>
                  <div className="box-text">
                    <p className="thick">{service.title}</p>
                    <p className='small'>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="container2">
              <p className='head-text'><span className="material-symbols-outlined">list</span> Electronic History</p>
              {userAppointmentList.length === 0 && <p>No Appointment Created yet</p>}

              {userAppointmentList.length > 0 && <div className="medical-list">
                {userAppointmentList
                .slice()
                .sort((a, b) => {
                  const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`).getTime();
                  const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`).getTime();
                  return dateA - dateB; // Sort in descending order
                })
                .map((appointment, index) => {
                  const appointmentDateTime = new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`);
                  const appointmentTime = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                  
                  return(
                  <div className="row" key={index}>
                    <i className='bx bx-plus-medical'></i>
                    <div>
                      <h3>Appointment - {appointment.appointmentTitle}</h3>
                      <p>Date: {appointment.appointmentDate} | Time: {appointmentTime}</p>
                    </div>
                    {/* <i className='bx bx-right-arrow-alt right-arrow' onClick={() => setActiveAppointment(appointment)}></i> */}
                    <span className="material-symbols-outlined right-arrow first" onClick={() => setActiveAppointment(appointment)}>info_i</span>
                    <span className="material-symbols-outlined right-arrow" style={{right: '10px', fontSize: '20px'}}>more_vert</span>
                  </div>)

                })}
              </div>}
            </div>
            
            {activeAppointment &&
              <>
                <div className="background"></div>
                <div className="appointment-form modal rounded-border">
                  <form action="">
                    <span className="material-symbols-outlined" onClick={() => setActiveAppointment(null)}>close</span>
                    <h2>Appointment Schedule</h2>
                    <div className="form-control">
                      <label htmlFor="">Appointment Date</label>
                      <input type="date" name="date" id="date" value={activeAppointment.appointmentDate} readOnly/>
                    </div>
                    <div className="form-control">
                      <label htmlFor="">Appointment Time</label>
                      <input type="time" name="time" id="time" value={activeAppointment.appointmentTime} readOnly/>
                    </div>
                    <div className="form-control">
                      <label htmlFor="">Appointment Title</label>
                      <input type="text" name="title" id="title" value={activeAppointment.appointmentTitle} readOnly/>
                    </div>
                    <div className="form-control">
                      <label htmlFor="">Message</label>
                      <textarea name="message" id="message" cols={30} rows={6} placeholder='Enter your message ...' style={{ resize: 'none' }} value={activeAppointment.appointmentMsg} required readOnly></textarea>
                    </div>
                  </form>
                </div>
              </>
            }
          </div>
        </>}
        {!user && <p className='loading'>Loading...</p>}
      </div>
    </div>
  );
}

export default Dashboard;
