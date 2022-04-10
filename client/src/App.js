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
import Appointment from './pages/Appointment';
import Business from "./pages/Business"
import BusinessNew from "./components/Business"

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
        <Route path="/bn" element={<BusinessNew/>} />
        <Route path="/bn/:business_id_or_brand_name" element={<BusinessNew/>} />
        <Route path="/b/"   element={<Business/>}/>
        <Route path="/s/:business_id_or_brand_name"   element={<Scheduler/>}/>
        <Route path="/schedule/:business_id_or_brand_name"   element={<Scheduler/>}/>
        <Route path="/scheduler/:business_id_or_brand_name"   element={<Scheduler/>}/>
        <Route path='/a/:appointment_id' element={<Appointment/>}/>
        <Route path='/appointment/:appointment_id' element={<Appointment/>}/>

      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
