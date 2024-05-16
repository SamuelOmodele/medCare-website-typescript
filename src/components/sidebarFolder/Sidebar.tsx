import React, { useState, useEffect } from 'react';
import './sidebar.css';
import userImg from '../../images/user-icon.png';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

type User = {
  name: string;
  email: string;
}

type SidebarProps = {
  current: string;
}

const Sidebar: React.FC<SidebarProps> = ({ current }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
      // Handle error appropriately (e.g., show error message to user)
    }
  }

  const fetchDocument = async (id: string) => {
    try {
      const docRef = doc(db, 'UserRecord', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  useEffect(() => {
    let current_user = localStorage.getItem('userEmail');
    if (current_user) {
      fetchCurrentUser(current_user)
    } else {
      console.log('User not found')
    }
  }, []);

  return (
    <div className='sidebar'>
      <div className="side-logo">
        <div className="img-logo">
          <img src={userImg} alt="" />
        </div>
        {user?.name && <p style={{ color: '#111' }}> {user.name}</p>}
        {user?.email && <p style={{ fontSize: '13px', color: '#fafafa' }}>{user.email}</p>}
      </div>
      <div className="menu">
        <ul>
          <li className={current === 'Dashboard' ? 'active-link' : ''}><span className="material-symbols-outlined">Dashboard</span><Link to='/dashboard'>Dashboard</Link></li>
          <li className={current === 'Services' ? 'active-link' : ''}><i className='bx bx-list-ul'></i><Link to='/services'>Services</Link></li>
          <li className={current === 'Orders' ? 'active-link' : ''}><span className="material-symbols-outlined">orders</span><Link to=''>Orders</Link></li>
          <li className={current === 'Appointments' ? 'active-link' : ''}><span className="material-symbols-outlined">schedule</span><Link to=''>Appointments</Link></li>
        </ul>
      </div>
      <div className="menu bottom">
        <ul>
          <li><i className='bx bx-log-out-circle'></i><Link to='/login'>Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
