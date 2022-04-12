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
import Login from './pages/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer'
import Appointment from './pages/Appointment';
import Business from "./components/Business";

//------------------------------------------------------------------------------
//-- ASSETS

//-- icons
import calendarDynamic from './assets/svg/calender-dynamic-gradient.svg';
import calendarIso from './assets/svg/calender-iso-gradient.svg';
import calendarFront from './assets/svg/calender-front-gradient.svg';
import bob1 from './assets/svg/bob_1.0_tr_nbg_ds.svg';
// import bob_wave_single from './assets/svg/bob_wave_single.svg';
// import bob_wave_15s from './assets/svg/bob_wave_15s.svg';
import bob_static from './assets/svg/bob_static.svg';

//-- STYLESHEET
//TODO:: 05/09/22 #EP || Move stylesheet to root
import './assets/css/styles.css';
import './assets/css/animations.css';
import PageNotFound from './pages/PageNotFound';


//-- used to know what to do with graphQL uri based on if development or production
let uri = "";

 //-- if in development mode, use graphql local pathing
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  console.log('//-- client in development');
  uri = `http://localhost:${ process.env.PORT || 3001 }/graphql`;
} ;

//-- if in production mode, used by heroku so needs to update accordingly
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production'){
  console.log('//-- client in production')
  uri = '/graphql';
} ;

const httpLink = createHttpLink({
  "uri": uri
  // uri: `http://localhost:${PORT}/graphql`
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
      <Nav bob_static={bob_static} />
      <main>
        <Routes>

          <Route path="/" element={< Home />} />
          <Route path="/Home" element={< Home />} />

          <Route path="/Login" element={< Login />} />
          <Route path="/signup" element={< Signup />} />

          <Route path="/b/:business_id_or_brand_name"         element={<Business/>} />
          <Route path="/business/:business_id_or_brand_name"  element={<Business/>} />
          
          <Route path="/b/:business_id_or_brand_name/:menuSelect"         element={<Business/>} />
          <Route path="/business/:business_id_or_brand_name:/menuSelect"  element={<Business/>} />

          <Route path="/s/:business_id_or_brand_name"           element={<Scheduler/>}/>
          <Route path="/schedule/:business_id_or_brand_name"    element={<Scheduler/>}/>
          <Route path="/scheduler/:business_id_or_brand_name"   element={<Scheduler/>}/>

          <Route path='/a/:appointment_id' element={<Appointment/>}/>
          <Route path='/appointment/:appointment_id' element={<Appointment/>}/>

          {/* push Page Not Found if bad route */}
          <Route path='*' element={ <PageNotFound />} ></Route>
        </Routes>
      </main>{}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <Footer bob_static={bob_static}/>
    </BrowserRouter>
  </ApolloProvider>
  );
}

export default App;
