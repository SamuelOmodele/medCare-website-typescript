import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="col">
        <div className="head">
          <div className="logo">
            <div className='icon' role="img" aria-label="Medicare Logo">M</div>
            <span>Medicare Clinic</span>
          </div>
        </div>
        <div className="mid">
          <p>Medicare provides progressive, and affordable healthcare, accessible on mobile and online for everyone</p>
        </div>
        <div className="mid">
          <p>© Medicare PTY LTD 2023. All rights reserved.</p>
        </div>
      </div>
      <div className="col">
        <div className='list'>
          <h3><b>Company</b></h3>
          <ul>
            <li>About</li>
            <li>Find a doctor</li>
            <li>Apps</li>
          </ul>
        </div>
      </div>
      <div className="col">
        <div className='list'>
          <h3><b>Region</b></h3>
          <ul>
            <li>Indonesia</li>
            <li>Singapore</li>
            <li>Hongkong</li>
            <li>Canada</li>
          </ul>
        </div>
      </div>
      <div className="col">
        <div className='list'>
          <h3><b>Help</b></h3>
          <ul>
            <li>Help center</li>
            <li>Contact Support</li>
            <li>Instruction</li>
            <li>How it works</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
