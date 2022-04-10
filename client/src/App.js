//------------------------------------------------------------------------------
//-- MODULES
import React,{useEffect} from 'react';
import {  BrowserRouter, Route, Routes, useParams  } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { setContext } from '@apollo/client/link/context';

//------------------------------------------------------------------------------
//-- PAGES
import Nav from './components/Nav';
import Home from './pages/Home';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer'
import Appointment from './pages/Appointment';

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


const httpLink = createHttpLink({
  // uri: '/graphql'
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {

  useEffect(() => {
    document.title = `Calendari`;
  },[]);

  return (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Nav bob1={bob1} />
      <main>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Home" element={< Home />} />
          {/* scheduler */}
          {/* Expecting the business_id OR brand_name, optional appointment_type_id to skip landing page */}
          {/* <Route path="/s/:business_id_or_brand_name(/:appointment_type_id)" element={ <Scheduler/> } */}
          <Route path="/s/:business_id_or_brand_name"   element={<Scheduler/>}/>
          <Route path="/schedule/:business_id_or_brand_name"   element={<Scheduler/>}/>
          <Route path="/scheduler/:business_id_or_brand_name"   element={<Scheduler/>}/>
          <Route path='/a/:appointment_id' element={<Appointment/>}/>
          <Route path='/appointment/:appointment_id' element={<Appointment/>}/>
        </Routes>
      </ApolloProvider>
    </main>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
