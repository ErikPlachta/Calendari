import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";


//------------------------------------------------------------------------------
//-- PAGES
import PageNotFound from '../../pages/PageNotFound';

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
  const user_id     = '0000-0000';
  const user     = Users[user_id];

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

    
  const validateParams = () => {  //-- Determine which params are sent in and route or re-route accordingly.

    let business_id = "";


    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_brand_name){
      //-- Doesn't exist, re-route to homepage or 404 page 
      //-- this should not happen technically
    }
    
    // 2. If  valid business_id or business_name extract just the business ID
      // -- grabs it and stores into const here
    //TODO:: 04/09/22 #EP | 
    if(!Businesses[business_id_or_brand_name]){
      // navigate('/')
      business_id = false
      
    }

    //-- if the param received matches, update the state with the business info
    if(Businesses[business_id_or_brand_name]){
    
      setBusiness({...business, businessData: Businesses[business_id_or_brand_name]});
      business_id = business_id_or_brand_name;
      
    }
    
   

    // 4.  Otherwise return the business_id value and assume to load Page 1 on schedulerPages index
    return business_id;
  }
   
  useEffect(() => {
    validateParams();
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
  const checkState = () => {

    let response = true

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false
    if(!business['businessData']['_id']){ 
      response = false; 
      console.log(business)
    }
    
    return response;
  }

  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page scheduler">
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      
        {/* { checkState()
              ? <StatusBar step={step} state={checkState} maxSteps={maxSteps} formerStep={formerStep} /> 
              && schedulerPages[step]
              : <PageNotFound /> */}
              {(() => {
                switch(checkState()) {    
                  case true:  return (
                  <section>
                      <h2>{business.name}</h2>
                      <h4>Welcome Message, USER_NAME_HERE_PLACEHOLDER</h4>
                        
                  </section>);
                  case false: return <PageNotFound />;
                  default:    return <PageNotFound />;
                }
            })()}
    </section>
  )
}
