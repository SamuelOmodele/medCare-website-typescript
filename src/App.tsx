import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navigation from './Navigation';
import Home from './components/landingPage/Home';
import Services from './components/landingPage/Services';
import HealthCareProvider from './components/landingPage/HealthCareProvider';
import OurApp from './components/landingPage/OurApp';
import Footer from './components/landingPage/Footer';
import Login from './components/loginpage/Login';
import Signup from './components/loginpage/Signup';
import Sidebar from './components/sidebarFolder/Sidebar';
import Dashboard from './components/dashboardPage/Dashboard';
import Appointment from './components/BookingAppointment/Appointment';
import MedicalServices from './components/servicesPage/MedicalServices';
import AppointmentList from './components/appointment_list/AppointmentList';
import Emergency from './components/emergency/Emergency';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={
        <>
          <Navigation current_link={'home'}/>
          <Home />
          <Services />
          <HealthCareProvider />
          <OurApp />
          <Footer />
        </>
        }/>
        <Route path='/login' element={
        <>
          <Navigation current_link={'login'}/>
          <Login />
        </>
        }/>
        <Route path='/signup' element={
        <>
          <Navigation current_link={'login'}/>
          <Signup />
        </>
        }/>
        <Route path='/dashboard' element={
        <div className='flex'>
          <Sidebar current={'Dashboard'}/>
          <Dashboard />
          
        </div>
        }/>
        <Route path='/services' element={
        <div className='flex'>
          <Sidebar current={'Services'}/>
          <MedicalServices />
          
        </div>
        }/>

        <Route path='/schedule-appointment' element={
        <div className='flex'>
          <Sidebar current={'Services'}/>
          <Appointment />
          
        </div>
        }/>

        <Route path='/appointments' element={
        <div className='flex'>
          <Sidebar current={'Appointments'}/>
          <div style={{width: '100%'}}>
            <AppointmentList />
          </div>
          
        </div>
        }/>

        <Route path='/emergency' element={
        <div className='flex'>
          <Sidebar current={'Appointments'}/>
          <div style={{width: '100%'}}>
            <Emergency />
          </div>
          
        </div>
        }/>

      </Routes>
      
    </div>
  );
}

export default App;
