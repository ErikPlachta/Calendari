// import logo from './logo.svg';

import calendarDynamic from './assets/svg/calender-dynamic-gradient.svg';
import calendarIso from './assets/svg/calender-iso-gradient.svg';
import calendarFront from './assets/svg/calender-front-gradient.svg';
import './assets/css/styles.css';
import './assets/css/animations.css';


import React from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';

import Business from './pages/Business';
import BusinessScheduler from './pages/BusinessScheduler';
import Schedule from './pages/Schedule';

function App() {
  return (
    <section>
      <Nav></Nav>
    
      {/* <Home></Home> */}
      {/* hard-coded business into default load for easy testing */}
      <main>
        <hr />
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
        <Schedule></Schedule>
        </main>
    </section>
  );
}

export default App;
