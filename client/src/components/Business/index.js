//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";

//-- JWT Auth
import Auth from "../../utils/authServices";

//------------------------------------------------------------------------------
//-- PAGES
import Aside from './components/Aside';
import Dashboard from './components/Dashboard';
import UserSettings from './components/UserSettings'; //- the actual user settings page
import BusinessSettings from './components/BusinessSettings'; //-- The business settings
import Appointments from './components/Appointments'; //-- Appointment Management

//------------------------------------------------------------------------------
//-- ASSETS
import { useQuery, useMutation } from '@apollo/client';
import  { QUERY_BUSINESSES, QUERY_BUSINESS_THOROUGH, QUERY_BUSINESS_THOROUGH_BY_ID } from '../../utils/queries';
// import  { QUERY_USER_APPTS } from '../../utils/queries';

//-- Hardcoded data used to simulate the Database
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =     require('../../assets/json/user.json');
const DB_Business = require('../../assets/json/business.json');

//------------------------------------------------------------------------------
//-- HELPERS
const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal,
  validateEmail
} = require('../../utils/helpers');

//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Business URL PARAMS: (business_id_or_name) The business they're signing in with. */
export default function Business() {

  
  //----------------------------------------------------------------------------
  /*  1. menu location awareness  - by default just the dashboard  */
  const [menuSelectLocation, setMenuSelectLocation] = useState(0);  //-- The current page
  

  const {business_id_or_brand_name, menuSelect} = useParams();
  //----------------------------------------------------------------------------
  /*  2. LOAD PROPER BUSINESS NAME ACCORDINGLY    */
  //-- business brand_name, business_id , and also option for specific menu
  
  const [Users, setUsers] = useState(DB_User); 
  
  //-- Business Page State
  const [business, setBusiness] = useState({
    // "config"        : {}, //-- placeholder for templates //TODO:: 04/10/22 #EP || Add these in Phase3
    "userData"        : "",
    "businessData"    : "",
    "appointmentsData" : "",
    "appointmentTypesData" : ""
  });
  
  //-- Database Query
  const { loading, data, error } = useQuery( QUERY_BUSINESS_THOROUGH, { variables: { brandName: business_id_or_brand_name } } );
  // const { loading, data, error } = useQuery( QUERY_BUSINESS_THOROUGH, { variables: { brandName: business_id_or_brand_name } } );

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false ); //TODO:: 04/13/22 #EP | REROUTING
  
  if(!Auth.isLoggedIn()) return(<Navigate replace to="/login" />)

  const setPage = setPageButton => { //-- load based on selection
    const menuChoice = setPageButton.target.id;
    if(menuChoice === "aside-dashboard"){
      setMenuSelectLocation(0)
    }
    // -- the aside menu that's always there with nav and business name
    else if(menuChoice === "aside-my-settings"){
      setMenuSelectLocation(1)
    }
    // 2 my-business
    else if(menuChoice === "aside-my-business"){
      setMenuSelectLocation(2)
    }
    // 3 my-Appointments
    else if(menuChoice === "aside-my-appointments"){
      setMenuSelectLocation(3)
    }
  };
  
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS - Is user signed in, is business from query in database */

  const validateParams = () => {  //-- Determine which params are sent in and route or re-route accordingly.
    
    // console.log("validating")

    let validRequest = null;  //-- is a valid request to Business component was made, true.

    //1. if NOT logged in, state false
    if(!Auth.isLoggedIn()){
      validRequest = false;
      setState(validRequest)
    }
     // 2. If No business_id, no business_name or invalid values found, exit
    else if(!business_id_or_brand_name){ 
      validRequest = false;
      // console.log("no params")
    }
    
    // 3. If  valid business_id or business_name extract just the business ID
    // else if(!Businesses[business_id_or_brand_name]){ validRequest = false } 
    else if(!loading && !data){ 
      validRequest = false 
      // console.log("not loading no data")
    } 
   
    // 4. If the param received matches, and If Logged in, load content
    // else if(Businesses[business_id_or_brand_name] && Auth.isLoggedIn()){ 
    else if(data && Auth.isLoggedIn()){ 

      // console.log("//-- business/index.js | data and auth found. setting variable")
      // console.log(data)      

      // const businessData = Businesses[business_id_or_brand_name];
      const businessData = data.businessByBrandName;
      const businessUsersRaw = businessData.users;
      // console.log(businessData.users)
      // const businessUsers = () =>{
      //   return businessUsersRaw.map( user => {
      //     return Users[user];
      //   })
      // };
      const appointmentsData = businessData.appointments;
      const appointmentTypesData = businessData.appointment_types;
      
      
      setBusiness({ //-- update Business Page state from query data
        ...business,
        "appointmentsData" : appointmentsData,
        "appointmentTypesData" : appointmentTypesData,
        "businessData": businessData,
        "businessUsers" :  businessData.users, 
        "userData"    : businessData.users,
      });

      //-- IF a sub-page was requested in route, see if it should route to it
      if(menuSelect){
        //-- force to lowercase
        const menuSelectLowercase = menuSelect.toLowerCase();
        
        // 0 dashboard
        if(menuSelectLowercase === "0" || menuSelectLowercase === "dashboard"){
          setMenuSelectLocation(0)
        }
        // 1 my-settings
        else if(menuSelectLowercase === "1" || menuSelectLowercase === "my-settings"){
          setMenuSelectLocation(1)
        }
        // 2 my-business
        else if(menuSelectLowercase === "2" || menuSelectLowercase === "my-business"){
          setMenuSelectLocation(2)
        }
        // 3 my-Appointments
        else if(menuSelectLowercase === "3" || menuSelectLowercase === "my-apppointments"){
          setMenuSelectLocation(3)
        }
      }

      validRequest = true; //-- was a valid request and completed
      setState(validRequest); //-- Update overall Business Page state as TRUE to allow content to load
    };

    // 5.  Return this value
    return validRequest;
  }
   
  //-- The ABOVE Function is what verifies IF/WHAT will Load on the page
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //-- Runs once, validates load state or directs the exit

  //----------------------------------------------------------------------------
  /* Page Location and Logic */
  const businessPages = { //-- This is an INDEX of available sub-components that can be rendered
    0 : <Dashboard  appointmentDetails={business.businessData.Appointment} 
                    businessName={business.businessData.name}
                    userName={business.userData.name} 
      />,
    // 0 : <Dashboard appointmentDetails={data.business.appointments} businessName={business.businessData.name} userName={business.userData.name} />,
    1 : <UserSettings     userData={business.userData} />,
    2 : <BusinessSettings businessData={business.businessData} />,
    3 : <Appointments     appointmentsData={business.appointmentsData} 
                          appointmentTypesData={business.appointmentTypesData} 
    />,
    // 4: <AppointmentTypes appointmentTypeData={business.appointmentTypeData} />,
  };

  
  //----------------------------------------------------------------------------
  /* TODO:: 04/09/22 #EP || Browser Local Storage AND CURRENT STATE CHECKING State checking */
  //----------------------------------------------------------------------------
  //-- STILL LOADING RETURN STATEMENTS


  if(loading)return(<h1>loading</h1>)
  //-- if Error or bad URl request, send to 404
  if(error || !data.businessByBrandName || !data) return(<Navigate replace to="/404" />)
  
  // console.log(data)

  return (
    <section className="page business">
        {/* if state false, run check validateParams to read the payload and update properly */}
        { !state ? validateParams()  : "" }
        {/* {!loading ? "done" : "LOADING..." } */}

        <section className="page business">
          {/* Aside bar within the business page */}
          <section className="businessAside">
            <Aside  setPage={setPage}
                    businessName={data.businessByBrandName.name} 
                    userName={Auth.getCurrentUser().data.username} />
          </section>
          {/* Main Content Area in Business Page */}
          <section className="businessMain"> 
            {businessPages[menuSelectLocation]}
          </section>
        </section>
    </section>
  )
}


// {(() => {
  {/* This switch checks the state to determine if loading, bad request, or good request. If good, loads content. */}
//   switch(state) {    
    
//     //-- Returns here if user is logged in and successful database request
//     case true:  return (
//       <section className="page business">
//         {/* Aside bar within the business page */}
//         <section className="businessAside">
//           <Aside setPage={setPage} businessName={business.businessData.name} userName={business.userData.name} />
//         </section>
//         {/* Main Content Area in Business Page */}
//         <section className="businessMain"> 
//           {businessPages[menuSelectLocation]}
//         </section>
//       </section>
//     );

//     //-- if NOT loading, return loading, otherwise not logged in
//     case false: return loading ? "Loading..." : "wanting to re-route away." // <Navigate replace to="/login" />
   
//     default:    return "Loading...";  //TODO::04/10/22 #EP | Add loading element
//   }
// })()}