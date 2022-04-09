import React from 'react';

//-- importing Router
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
//-- CONTENT
import calendarDynamic from './assets/svg/calender-dynamic-gradient.svg';
import calendarIso from './assets/svg/calender-iso-gradient.svg';
import calendarFront from './assets/svg/calender-front-gradient.svg';

//-- PAGES
import Nav from './components/Nav';
import Home from './pages/Home';
import Business from './pages/Business';
import BusinessScheduler from './pages/BusinessScheduler';
import Schedule from './pages/Schedule';


import { setContext } from '@apollo/client/link/context';

//-- AUTH TOKEN
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

{/* <div className="containerResults">
  <h2>Icons</h2>
  <img src={calendarDynamic} width="50px"></img>
  <img src={calendarFront} width="50px"></img>
  <img src={calendarIso} width="50px"></img>
</div> */}

function App() {
  return (
    <section>
      <BrowserRouter>
        <Nav />
        <main>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Business" element={< Business />} />
          <Route path="/BusinessScheduler" element={< BusinessScheduler />} />
          <Route path="/Schedule" element={< Schedule />} />
        </Routes>
        </main>
      </BrowserRouter>
    </section>
  );
}

export default App;
