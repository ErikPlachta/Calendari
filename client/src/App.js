// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import Home from './pages/Home';
import Business from './pages/Business';

function App() {
  return (
    <section>
      <h1>Your Schedule</h1>
    
      {/* <Home></Home> */}
      {/* hard-coded business into default load for easy testing */}
      <main>
        <Business></Business>
        </main>
    </section>
  );
}

export default App;