import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";


//------------------------------------------------------------------------------
//-- PAGES
import PageNotFound from '../../pages/PageNotFound';
import Aside from './sub-components/Aside';
import Dashboard from './sub-components/Dashboard';
import UserSettings from './sub-components/UserSettings'; //- the actual user settings page
import BusinessSettings from './sub-components/BusinessSettings'; //-- The business settings

// import Aside from './sub-components/Dashboard'; //-- High Level data about business and user
// import Appointments from './sub-components/Appointments'; //-- Appointment Management

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
  dateTimeFullLocal
} = require('../../utils/helpers');

//------------------------------------------------------------------------------
//-- ASSETS

//-- Hardcoded data used to simulate the Database
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =     require('../../assets/json/user.json');
const DB_Business = require('../../assets/json/business.json');

//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Business

  //TODO:: 04/10/22 #EP || Update this
  PROPS: (user_id)
  URL PARAMS: (business_id_or_name)
    - business_id_or_name:    The business they're scheduling for
    
*/
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
  useEffect(() => {
    document.title = `Calendari - BUSINESS_NAME_PLACEHOLDER`;
  },[]);

  const {business_id_or_brand_name, appointment_type_id} = useParams();

  
  //TODO:: 05/09/22 #EP || useState(DB_Business) to be replaced with GraphQL Query
  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query   
  const [Users, setUsers] = useState(DB_User); 
  // const user_id     = '0000-0000';
  // const user     = Users[user_id];

  //-- Business Page State
  const [business, setBusiness] = useState({
    // "config"        : {}, //-- placeholder for templates //TODO:: 04/10/22 #EP || Add these in Phase3
    "userData"      : "",
    "businessData"  : "",
  })
  
  
  //-- TODO:: not hard-coded like this
  // let business = {}; //-- The Specific Business response for the logged in user from API
  

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS

    validateParams
      Looking to see if valid params are provided.

      1. If empty business info
        - Re-routes
      
        2. Check if valid business info provided
        - If exists in database, load
        - If not, re-routes

      3. If valid business info AND provided appointment_type_id info
        - If business has that appointment_type_id skip the select appointment type
        - Otherwise ignore or show messages
      
      4. If valid business info but invalid or no appointment_type_id
        - Loads default schedule
  */
  const validateParams = async () => {  //-- Determine which params are sent in and route or re-route accordingly.
    
    let validRequest = null;  //-- is a valid request to Business component was made, true.


    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_brand_name){
      //-- Doesn't exist, re-route to homepage or 404 page 
      //-- this should not happen technically
      validRequest = false;
    }
    
    // 2. If  valid business_id or business_name extract just the business ID
      // -- grabs it and stores into const here
    //TODO:: 04/09/22 #EP | 
    else if(!Businesses[business_id_or_brand_name]){
      // navigate('/')
      validRequest = false
      
    }

    //-- if the param received matches, update the state with the business info
    else if(Businesses[business_id_or_brand_name]){

      const businessData = Businesses[business_id_or_brand_name];
      
      //TODO:: 04/10/22 #EP || Need to simplify this massively.
      const businessUsersRaw = Businesses[business_id_or_brand_name].Users;
      const businessUsers = () =>{
        return Businesses[business_id_or_brand_name].Users.map( user => {
          // console.log("//-- User: ")
          // console.log(Users[user])
          return Users[user];
        })
      };
      const usersClean = businessUsers();
      
      setBusiness({
        ...business,
        "businessData": businessData,
        "businessUsers" :  businessUsersRaw,
        //TODO:: 04/10/22 #EP || Know the Specific User here, or use JWT for that?
        "userData"    : usersClean
      });

      validRequest = true;
      
    };
    

    // 4.  Otherwise return the business_id value and assume to load Page 1 on schedulerPages index
    return validRequest;
  }
   
  useEffect( () => {
    validateParams();
    
    console.log(`//-- Business Component: Received Payload:`);
    console.log(business)
  },[]);

   //----------------------------------------------------------------------------
  /* Browser Local Storage AND CURRENT STATE CHECKING State checking
    - Should it load anything from local-storage vs default
  */

    //TODO:: 04/09/22 #EP || Build Local Storage to know if scheduling an appt for offline and state awareness. If exists, pull info and start from there.

  //-- Browser Local Storage Checking

  //-------------------------
  /* Verify Request Integrity
  */
  //-- Verifying if requests are made properly or not
  const state = () => {
    //TODO:: 04/10/22 #EP || Convert to an actual useState function
    // const [state, setState] = useState({

    let response = true

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false
    if(!business['businessData']['_id']){ 
      response = false; 
      console.log("//-- Business Component: no business id found...")
    }
    
    return response;
  };

//----------------------------------------------------------------------------
  /* Page Location and Logic
  */
  
  
  //-- Index used for on-click of what to render //TODO:: 04/10/22 #EP || Make a state
  const businessPages = { 
    // 1 : "", 
    // 0 : <Dashboard appointmentDetails={business.businessData.Appointment} businessName={business.businessData.name} userName={business.userData.name} />,
    1 : <UserSettings userData={business.userData} />,
    2 : <BusinessSettings businessData={business.businessData} />
    // 4: <Appointments appointmentData={business.Appointments} />
  };

  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page scheduler">
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      
        {/* { state()
              ? <StatusBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} /> 
              && schedulerPages[step]
              : <PageNotFound /> */}
              {(() => {
                switch(state()) {    
                  case true:  return (
                    <section className="page business">
                      
                      {/* Aside bar within the business page */}
                      <section className="businessAside">
                        {/* <Aside businessName={business.businessData.name} userName={business.userData.name} /> */}
                        <Dashboard appointmentDetails={business.businessData.Appointment} businessName={business.businessData.name} userName={business.userData.name} />
                      </section>

                      {/* Main Content Area in Business Page */}
                      <section className="businessMain">
                        {businessPages[3]}
                      </section>
                    </section>
                  );
                  case false: return <PageNotFound />;
                  //TODO::04/10/22 #EP | Add loading
                  default:    return <PageNotFound />;
                }
            })()}
    </section>
  )
}
