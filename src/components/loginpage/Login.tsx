import React, { useEffect, useState } from 'react';
import './login.css';
import login_img from '../../images/new_login-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    auth.signOut(); // Sign out the current user when the component mounts
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userEmail', email);
      alert('LOGIN SUCCESSFUL');
      navigate('/dashboard');
    } catch (error : any) {
      if (error.code === 'auth/network-request-failed') {
        setErrorMsg('No connection');
      } else if (error.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid Email or Password');
      } else {
        setErrorMsg(error.code);
      }
      console.log(error);
    }
  };

  return (
    <div className='login'>
      {errorMsg !== '' && (
        <div className='error'>
          <span className="material-symbols-outlined">error</span>
          <span className='error-text'> {errorMsg}</span>
          <span className="material-symbols-outlined" onClick={() => setErrorMsg('')}>close</span>
        </div>
      )}
      <div className="card">
        <div className="login-form">
          <h2>Login</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder='Enter Email . . .' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password . . .' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="form-control">
              <button type='submit'>Login</button>
              <span className='forgot'>forgot password</span>
            </div>
            <div className="form-control">
              <span className='acct'>Don't have an account? <Link to='/signup'>sign up</Link>
              </span>
            </div>
          </form>
        </div>
        <div className="login-image">
          <img src={login_img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
