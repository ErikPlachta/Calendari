import React, { useState, useEffect } from 'react';

//-- PAGES
import BusinessScheduler from './pages/BusinessScheduler';
import DateTime from './pages/DateTime';
import Client from './pages/Client';

//-- SUB COMPONENTS
import StatusBar from './sub-components/StatusBar';

//-- Helpers
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

//-- HARDCODED DATA USED TO SIMULATE DATA CALLS FROM DATABASE
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_Business = require('../../assets/json/business.json');


//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Scheduler

  props: (business_id_or_name, appointment_type_id)
    - business_id_or_name:    The business they're scheduling for
    - appointment_type_id:    The ID of the Appointment they selected
*/
export default function Scheduler({business_id_or_name, appointment_type_id}) {
  //TODO:: 05/09/22 #EP || Replace fake data query with GraphQL
  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query    
  let business = {}; //-- The Specific Business response for the logged in user from API
  //TODO:: 04/09/22 #EP || Get this to work as a state 
  // let [business, setBusiness] = useState({}); //-- The Specific Business response for the logged in user from API

  const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on businessScheduler page
  const [appointment_template, setAppointment_template] = useState({}); //-- when it's to be built, know what to do with it
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  

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
    
    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_name){
      //-- Doesn't exist, re-route to homepage or 404 page 
    }
    
    // 2. If  valid business_id or business_name extract just the business ID
      // -- grabs it and stores into const here
    //TODO:: 04/09/22 #EP | 
    const business_id = business_id_or_name;
    business = Businesses[business_id];
    
    // console.log(Businesses[business_id]);
    // set_appointment_types = business.configuration.appointment_types;
    
    
    
    // 3. Does appointment_type_id exist and if yes for this business
    if(appointment_type_id) {
      //-- if yes, re-route to that specific appointment type and load page 2 in the schedulerPages index
      // setAppointment_template(business[business_id_TEMP].Appointment_Types[appointment_type_id])
      //-- Otherwise ignore it and/or update screen with message
    }

    // 4.  Otherwise return the business_id value and assume to load Page 1 on schedulerPages index
    return business_id;
  }
  //-- RUN VALIDATION
  const business_id = validateParams()
 
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic

   - next and former step button onClick events
      nextStep
      formerStep

    - schedulerPages
      the index of what pages it needs to go to

  */

  //-- Move to the next step
  const nextStep = nextStepButton => {
    nextStepButton.preventDefault();
    setStep(step+1);
  };

  const formerStep = formerStepButton => {
    formerStepButton.preventDefault();
    setStep(step-1);
  };


  //-- INDEX of Each Page, which is a step of scheduler
  const schedulerPages = {
    1: <BusinessScheduler business={business} business_id={business_id} nextStep={nextStep}></BusinessScheduler>,
    2: <DateTime nextStep={nextStep}/>,
    3: <Client nextStep={nextStep} appointment_template={appointment_template}/>,
    4: "<div>API Reroute to root page Appointment with params business_id and appointment_id</div>"
  };

  //-- Get the number of keys in the pages
  const [maxSteps, setMaxSteps] = useState(
    Object.keys(schedulerPages).length
  );

  
  //-- When Appointment is Verified, Submit it to API, and if success move to verification page
  //TODO:: 04/09/22 #EP || Build logic for API call of submission
  const createAppointment = async params => {
    //-- When client information verified and submitted, update database with appointment data

    // 1. Validate data

    // 2. Submit to database

    // 3. Verify response

    // 4. Approve re-route or message to UI
    setStep(maxSteps); //-- 5 is finshed and out of here.

    // return response;
  }

  //----------------------------------------------------------------------------
  /* Browser Local Storage State checking

    - Should it load anything from local-storage vs default
  */

  //-- Browser Local Storage Checking
  //TODO:: 04/09/22 #EP || Build Local Storage to know if scheduling an appt for offline and state awareness. If exists, pull info and start from there.
  const checkState = () => {
    //-- Looking at Local Storage to see if Client was scheduling an appointment and load if so. 

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false

    
    return false;
  }
  
  //----------------------------------------------------------------------------
  //-- RETURN STATEMENT
  return (
    <section className="page scheduler">
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      <StatusBar step={step} state={checkState} maxSteps={maxSteps} formerStep={formerStep} />
      
      <div>
        {checkState
          ? schedulerPages[step]
          // TODO:: 04/09/22 #EP|| Add local storage logic
          : <h3>checkState Placeholder: TRUE: Has Local Storage</h3>
        }
        
      </div>
    </section>
  )
};

 
