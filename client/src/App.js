// import logo from './logo.svg';
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
        <h2>SCHEDULE CONCEPT</h2>
        <Schedule></Schedule>
        <hr />
        <hr />
        <h2>BUSINESS DASHBOARD CONCEPT</h2>
        <Business></Business>
        <hr />
        <hr />
        <h2>BUSINESS SCHEDULER CONCEPT</h2>
        <BusinessScheduler></BusinessScheduler>
        
        </main>
    </section>
  );
}

export default App;