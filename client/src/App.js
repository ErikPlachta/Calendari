//------------------------------------------------------------------------------
//-- MODULES

import React from 'react';
//-- url parameters
// import { useParams } from 'react-router-dom';
//-- Routing for URL params
import {  BrowserRouter, Router, Route, Routes  } from 'react-router-dom';

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

  // const { urlParams } = useParams();
  // console.log(urlParams)


  //TODO:: 04/09/22 #EP || Temp hardcoded to verify params passing
  const business_id_or_name = '0000-AAAA';
  const appointment_type_id = '0000-0000';  

  return (
    <section>
      <BrowserRouter>
        <Nav bob1={bob1} />

        <Routes>

        </Routes>

      </BrowserRouter>
    </section>
  );
}

export default App;


