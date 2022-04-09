//------------------------------------------------------------------------------
//-- MODULES
import React,{useEffect} from 'react';
import {  BrowserRouter, Route, Routes, useParams  } from 'react-router-dom';

//------------------------------------------------------------------------------
//-- PAGES
import Nav from './components/Nav';
import Home from './pages/Home';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer'

// import { setContext } from '@apollo/client/link/context';

//------------------------------------------------------------------------------
//-- ASSETS

//-- icons
import calendarDynamic from './assets/svg/calender-dynamic-gradient.svg';
import calendarIso from './assets/svg/calender-iso-gradient.svg';
import calendarFront from './assets/svg/calender-front-gradient.svg';
import bob1 from './assets/svg/bob_1.0_tr_nbg_ds.svg'

//-- STYLESHEET
//TODO:: 05/09/22 #EP || Move stylesheet to root
import './assets/css/styles.css';
import './assets/css/animations.css';

function App() {

  useEffect(() => {
    document.title = `Calendari`;
  },[]);



  //TODO:: 04/09/22 #EP || Temp hardcoded to verify params passing
  // const business_id_or_brand_name = '0000-AAAA';
  // const appointment_type_id = '0000-0000';  

  return (
    <BrowserRouter>
    <Nav bob1={bob1} />
    <main>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Home" element={< Home />} />
        
        {/* scheduler */}
        {/* Expecting the business_id OR brand_name, optional appointment_type_id to skip landing page */}
        {/* <Route path="/s/:business_id_or_brand_name(/:appointment_type_id)" element={ <Scheduler/> } */}
        <Route path="/s/:business_id_or_brand_name" element={ <Scheduler/> }
        />

        
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  );
}

export default App;

/* verified working no routes version
<section>
  <Nav bob1={bob1} />
  <main>
    <Home></Home>
    <Scheduler business_id_or_name={business_id_or_name} appointment_type_id={appointment_type_id}  />
  </main>
</section>

*/

/* ROUTE VERSION BACKUP
  <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/Business" element={< Business />} />
        <Route path="/BusinessScheduler" element={< BusinessScheduler />} />
        <Route path="/Scheduler" 
          element={
              <Scheduler business_id_or_name={business_id_or_name} appointment_type_id={appointment_type_id}  />
          }
        />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
*/