// import logo from './logo.svg';

import calendarDynamic from './assets/svg/calender-dynamic-gradient.svg';
import calendarIso from './assets/svg/calender-iso-gradient.svg';
import calendarFront from './assets/svg/calender-front-gradient.svg';
import bob1 from './assets/svg/bob_1.0_tr_nbg_ds.svg'
import './assets/css/styles.css';
import './assets/css/animations.css';


import React from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';

//-- final page with appt details to confirm

import Scheduler from './components/Scheduler';

function App() {

  //TODO:: 04/09/22 #EP || Temp hardcoded to verify params passing
  const business_id = '0000-AAAA';
  const appointment_type_id = '0000-0000';

  return (
    <section>
      <Nav bob1={bob1}></Nav>
    
      {/* <Home></Home> */}
      {/* hard-coded business into default load for easy testing */}
      <main>
      <hr />
        <hr />
        <h2>BUSINESS SCHEDULER CONCEPT</h2>
        
        <hr />
        <hr />
        <h2>Scheduler</h2>
        <Scheduler business_id={business_id} appointment_type_id={appointment_type_id}  />

        {/* <hr />
        <hr />
        <div className="containerResults">
          <h2>Icons</h2>
          <img src={calendarDynamic} width="50px"></img>
          <img src={calendarFront} width="50px"></img>
          <img src={calendarIso} width="50px"></img>
        </div>
        <hr />
        <hr />
        <h2>BUSINESS DASHBOARD CONCEPT</h2>
        <Business></Business>
        <hr />
        <hr />
        <h2>BUSINESS SCHEDULER CONCEPT</h2>
        <BusinessScheduler></BusinessScheduler>
        <hr />
        <hr />
        <h2>SCHEDULE CONCEPT</h2>
        <Schedule></Schedule> */}
        </main>
    </section>
  );
}

export default App;
