//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";

//-- JWT Auth
import Auth from "../../utils/authServices"

//------------------------------------------------------------------------------
//-- PAGES
import Aside from './sub-components/Aside';
import Dashboard from './sub-components/Dashboard';
import UserSettings from './sub-components/UserSettings'; //- the actual user settings page
import BusinessSettings from './sub-components/BusinessSettings'; //-- The business settings
import Appointments from './sub-components/Appointments'; //-- Appointment Management

//------------------------------------------------------------------------------
//-- ASSETS
import { useQuery, useMutation } from '@apollo/client';
import  { QUERY_BUSINESSES } from '../../utils/queries';
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

  const [menuSelection, setMenuSelection] = useState(1);  //-- The current page

  //------------------------------------------------------------------------------
  /*  1. VERIFY IF LOGGED IN    */
  //TODO:: 04/05/22 #EP || Add auth, for now assuming logged in
  const authCheck = true;

  //------------------------------------------------------------------------------
  /*  2. IF LOGGED IN GET AUTH TOKEN THAT CONTAINS BUSINESS ID AND USER ID  */
  if(!authCheck){ 
    console.log("Reload page placeholder");
  }

  //------------------------------------------------------------------------------
  /*  3. LOAD PROPER BUSINESS NAME ACCORDINGLY    */

  const {business_id_or_brand_name, appointment_type_id} = useParams();

  //-- Database Query
  const { loading, data } = useQuery( QUERY_BUSINESSES );
  // const { loading, data } = useQuery(QUERY_USER_APPTS, {
  //   variables: {brandName: business_id_or_brand_name} 
  // });


  //TODO:: 05/09/22 #EP || useState(DB_Business) to be replaced with GraphQL Query
  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query   
  const [Users, setUsers] = useState(DB_User); 
  // const user_id     = '0000-0000';
  // const user     = Users[user_id];

  //-- Business Page State
  const [business, setBusiness] = useState({
    // "config"        : {}, //-- placeholder for templates //TODO:: 04/10/22 #EP || Add these in Phase3
    "userData"        : "",
    "businessData"    : "",
    "appointmentData" : ""
  })

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS - Is user signed in, is business from query in database */

  const validateParams = async () => {  //-- Determine which params are sent in and route or re-route accordingly.
    
    let validRequest = null;  //-- is a valid request to Business component was made, true.

    //1. if NOT logged in, state false
    if(!Auth.isLoggedIn()){
      validRequest = false;
      setState(validRequest)
    }

    // 2. If No business_id, no business_name or invalid values found, exit
    else if(!business_id_or_brand_name){ validRequest = false; }
    
    // 3. If  valid business_id or business_name extract just the business ID
    else if(!Businesses[business_id_or_brand_name]){ validRequest = false }
    
    // 4. If the param received matches, and If Logged in, load content
    else if(Businesses[business_id_or_brand_name] && Auth.isLoggedIn()){

      //TODO:: 04/10/22 #EP || Need to simplify this massively.
      const businessData = Businesses[business_id_or_brand_name];
      const businessUsersRaw = Businesses[business_id_or_brand_name].Users;
      const businessUsers = () =>{
        return Businesses[business_id_or_brand_name].Users.map( user => {
          return Users[user];
        })
      };
      const usersClean = businessUsers();
      const appointmentData = businessData.Appointment;
      
      setBusiness({ //-- update Business Page state from query data
        ...business,
        "appointmentData" : appointmentData,
        "businessData": businessData,
        "businessUsers" :  businessUsersRaw, 
        //TODO:: 04/10/22 #EP || Know the Specific User here, or use JWT for that?
        "userData"    : usersClean,
      });

      validRequest = true; //-- was a valid request and completed
      setState(validRequest); //-- Update overall Business Page state as TRUE to allow content to load
    };

    // 5.  Return this value
    return validRequest;
  }
   
  //----------------------------------------------------------------------------
  //-- Runs once, validates load state or directs the exit

  useEffect( () => {
    const validRequest = validateParams();
    
    //-- IF valid request is TRUE, update title with business name. 
    if(validRequest){ document.title = `Calendari - ${business.businessData.name}`};
    
    //-- IF NOTE valid request is TRUE, update title with Invalid Request
    if(!validRequest){ document.title = `Calendari - Invalid Request`};
  },[]);


  //----------------------------------------------------------------------------
  /* Page Location and Logic */
  const businessPages = { //-- This is an INDEX of available sub-components that can be rendered
    1 : <UserSettings     userData={business.userData} />,
    2 : <BusinessSettings businessData={business.businessData} />,
    3 : <Appointments     appointmentData={business.appointmentData} />,
    // 4: <AppointmentTypes appointmentTypeData={business.appointmentTypeData} />,
  };

  //----------------------------------------------------------------------------
  /* TODO:: 04/09/22 #EP || Browser Local Storage AND CURRENT STATE CHECKING State checking */

  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page business">
    
      {/* This switch checks the state to determine if loading, bad request, or good request. If good, loads content. */}
      {(() => {
        switch(state) {    
          
          //-- Returns here if user is logged in and successful database request
          case true:  return (
            <section className="page business">
              
              {/* Aside bar within the business page */}
              <section className="businessAside">
                {/* TODO:: 04/10/22 #EP || Hide or stylize */}
                <Aside businessName={business.businessData.name} userName={business.userData.name} />
              </section>
              
              <Dashboard appointmentDetails={business.businessData.Appointment} businessName={business.businessData.name} userName={business.userData.name} />

              {/* Main Content Area in Business Page */}
              <section className="businessMain"> 
              {/* TODO:: 04/10/22 #EP || Need to not load ALL at once */}
                <h4>page 1</h4>
                {businessPages["1"]}
                <h4>page 2</h4>
                {businessPages["2"]}
                <h4>page 3</h4>
                {(businessPages["3"])}
              </section>
            </section>
          );

          //-- if NOT loading, return loading, otherwise not logged in
          case false: return loading ? "Loading..." : <Navigate replace to="/login" />
          //TODO::04/10/22 #EP | Add loading element
          default:    return "Loading...";
        }
    })()}
    </section>
  )
}
