import React from 'react'
import './navigation.css'
import { Link } from 'react-router-dom'

interface NavigationProps {
  current_link: string;
}

const Navigation  = ({ current_link } : NavigationProps) => {
  return (
    <nav>
      <div className="logo">
        <div className='icon'>M</div>
        <span>Medicare Clinic</span>
      </div>
      <ul>
        <li className={current_link === 'home' ? 'active' : ''}><Link to='/'>Home</Link></li>
        <li className={current_link === 'services' ? 'active' : ''}><Link to='/services'>Services</Link></li>
        <li className={current_link === 'apps' ? 'active' : ''}><Link to='/apps'>Apps</Link></li>
        <li className={current_link === 'about us' ? 'active' : ''}><Link to='/about-us'>About us</Link></li>
        <li className={current_link === 'login' ? 'active' : ''}><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation;
