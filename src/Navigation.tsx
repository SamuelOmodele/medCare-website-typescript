import React, { useEffect, useState } from 'react'
import './navigation.css'
import { Link } from 'react-router-dom'

type NavigationProps = {
  current_link: string;
}



const Navigation  = ({ current_link } : NavigationProps) => {


  useEffect(() => {

    setShowNav(false);

  }, [current_link])

  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <nav>
      <div className="logo">
        <div className='icon'>M</div>
        <span>Medicare Clinic</span>
      </div>
      <ul className= {showNav ? 'show' : ''}>
        <li className={current_link === 'home' ? 'active' : ''}><Link to='/'>Home</Link></li>
        <li className={current_link === 'services' ? 'active' : ''}><Link to=''>Services</Link></li>
        <li className={current_link === 'apps' ? 'active' : ''}><Link to=''>Apps</Link></li>
        <li className={current_link === 'about us' ? 'active' : ''}><Link to=''>About us</Link></li>
        <li className={current_link === 'login' ? 'active' : ''}><Link to='/login'>Login</Link></li>
      </ul>
      {!showNav && <div className='menu-container'><span className="material-symbols-outlined menu-icon" onClick={() => setShowNav(prev => !prev)}>menu</span></div>}
      {showNav && <div className='menu-container'><span className="material-symbols-outlined menu-icon" onClick={() => setShowNav(prev => !prev)}>close</span></div>}
    </nav>
  )
}

export default Navigation;
