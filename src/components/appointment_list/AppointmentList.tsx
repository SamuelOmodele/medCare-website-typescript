import { useEffect, useRef, useState } from 'react';
import '../dashboardPage/dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import ActiveAppointment from '../active_appointment/ActiveAppointment';

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


const AppointmentList = () => {

    const navigate = useNavigate();

    // --- state vaariables ---
    const [user, setUser] = useState<any>(null);
    const [userAppointmentList, setUserAppointmentList] = useState<Appointment[]>([]);
    const [comingSoonAlert, setComingSoonAlert] = useState<boolean>(false);
    const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeEditDeleteID, setActiveEditDeleteID] = useState<string | null>(null);

    // --- fetch user data from firestore database using the email
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

    // --- scroll to top of the page when appointment is 
    useEffect(() => {
        if (activeAppointment) {

            contentRef.current?.scrollTo({
                top: 80,
                behavior: 'smooth'
            });
        }

    }, [activeAppointment])

    // --- fetch appointments using the user email ---
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


    const setID = (id: string) => {
        if (!activeEditDeleteID) {
            setActiveEditDeleteID(id);
        } else {
            setActiveEditDeleteID(null);
        }
    }

    // -- delete appointment --
    const deleteAppointment = async (id: string) => {
        try {
            const appointmentQuery = query(collection(db, 'AppointmentRecord'), where("uniqueId", "==", id));
            const querySnapshot = await getDocs(appointmentQuery);

            if (querySnapshot.empty) {
                console.log('Appointment does not exist.');
                return;
            }

            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, 'AppointmentRecord', docSnapshot.id));
                console.log(`Appointment Deleted`);
                alert('Appointment Deleted');
                window.location.reload();
            });
        } catch (error) {
            console.log('error deleting appointment', error);
        }
    }

    return (
        <div className='dashboard' ref={contentRef}>

            <div className="dashboard-nav">
                <p>Medicare Health Clinic</p>
            </div>

            <div className='body-section'>
                {user && <>
                    <div className="container" style={{minHeight: (activeAppointment)? '100vh': ''}}>
                        <p className='head-text'>
                            <span className="material-symbols-outlined">schedule</span> All Appointments
                        </p>
                        <div className="container2" style={{ marginTop: '0px' }}>

                            {userAppointmentList.length === 0 && <p>No Appointment Created yet</p>}

                            {userAppointmentList.length > 0 && <div className="medical-list">
                                {userAppointmentList
                                    .slice()
                                    .sort((a, b) => { // --- to sort appointment in descending order, latest comes first ---
                                        const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`).getTime();
                                        const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`).getTime();
                                        return dateA - dateB;
                                    })
                                    .map((appointment, index) => { // --- sort display time in 12 hour format ---
                                        const appointmentDateTime: Date = new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`);
                                        const appointmentTime: string = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                        const current_dateTime = new Date();
                                        const isAppointmentValid: boolean = (current_dateTime < appointmentDateTime);

                                        return (
                                            <div className="row" key={index}>

                                                {isAppointmentValid ?
                                                    <i className='bx bx-plus-medical'></i> :
                                                    <i style={{ backgroundColor: 'red', fontSize: '20px' }}>!</i>
                                                }
                                                <div>
                                                    <h3>Appointment - {appointment.appointmentTitle} {isAppointmentValid ? '' : <span style={{ color: 'red', fontWeight: '500', fontSize: '15px' }}> * Elapsed *</span>}</h3>
                                                    <p>Date: {appointment.appointmentDate} | Time: {appointmentTime}</p>
                                                </div>
                                                <span className="material-symbols-outlined right-arrow first" onClick={() => setActiveAppointment(appointment)}>info_i</span>
                                                <span className="material-symbols-outlined right-arrow more" style={{ right: '10px', fontSize: '20px' }} onClick={() => setID(appointment.uniqueId)}>more_vert</span>
                                                {(activeEditDeleteID === appointment.uniqueId) && <div className="edit-delete-box">
                                                    <span onClick={() => deleteAppointment(appointment.uniqueId)}>Delete<span className="material-symbols-outlined edit-delete">delete</span></span>
                                                </div>}

                                            </div>)

                                    })}
                            </div>}
                        </div>

                        {activeAppointment &&
                            <>
                                <ActiveAppointment activeAppointment={activeAppointment} setActiveAppointment={setActiveAppointment} />
                            </>
                        }
                    </div>
                </>}
                {!user && <p className='loading'>Loading...</p>}
            </div>
        </div>
    );
}

export default AppointmentList