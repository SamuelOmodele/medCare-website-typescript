import React, { useState, useEffect, FormEvent } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../../images/new_signup-removebg-preview.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    auth.signOut(); // Sign out the current user when the component mounts
  }, []);

  const navigate = useNavigate();
  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
    } else if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, 'UserRecord'), {
          name: name,
          email: email,
          phone: phone
        });
        alert('REGISTRATION SUCCESSFUL');
        navigate('/login');
      } catch (error: any) {
        setErrorMsg(error.code);
        console.log(error);
      }
    }
  };

  return (
    <div className="signup">
      {errorMsg !== '' && (
        <div className="error">
          <span className="material-symbols-outlined">error</span>
          <span className="error-text"> {errorMsg}</span>
          <span className="material-symbols-outlined" onClick={() => setErrorMsg('')}>
            close
          </span>
        </div>
      )}

      <div className="card">
        <div className="signup-image">
          <img src={signup} alt="" />
        </div>
        <div className="signup-form">
          <h2>Sign up</h2>
          <form action="" onSubmit={register}>
            <div className="form-control">
              <label htmlFor="">Full Name</label>
              <input type="text" placeholder="Enter Full Name" id="" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="">Email</label>
              <input type="text" placeholder="Enter Email" id="" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Enter Password" id="" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" id="" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="">Phone</label>
              <input type="number" placeholder="Contact" id="" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
              <button type="submit">Sign Up</button>
            </div>
            <div className="form-control">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
