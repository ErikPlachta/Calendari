// import logo from './logo.svg';
import './assets/css/styles.css';
import './assets/css/animations.css';


import React from 'react';
import Home from './pages/Home';
import Business from './pages/Business';
import Business_id from './pages/Business_id';

function App() {
  return (
    <section>
      <h1>Your Schedule</h1>
    
      {/* <Home></Home> */}
      {/* hard-coded business into default load for easy testing */}
      <main>
        <Business_id></Business_id>
        </main>
    </section>
  );
}

export default App;
