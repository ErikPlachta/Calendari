//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


//------------------------------------------------------------------------------
//-- PAGES
import BusinessScheduler from './pages/BusinessScheduler';
import DateTime from './pages/DateTime';
import Client from './pages/Client';
import PageNotFound from '../../pages/PageNotFound';
import Appointment from '../../pages/Appointment'; //-- confirmation page

//------------------------------------------------------------------------------
//-- SUB COMPONENTS
import StatusBar from './sub-components/StatusBar';

//------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------
//-- ASSETS

//-- Hardcoded data used to simulate the Database
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_Business = require('../../assets/json/business.json');


//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Scheduler

  URL PARAMS: (business_id_or_name, appointment_type_id)
    - business_id_or_name:    The business they're scheduling for
    - appointment_type_id:    The ID of the Appointment they selected
*/
export default function Scheduler() {

  useEffect(() => {
    document.title = `Calendari`;
  },[]);


  //TODO:: 05/09/22 #EP || useState(DB_Business) to be replaced with GraphQL Query
  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query    
  
  const [scheduler, setScheduler] = useState({
    "clientData"      : "",
    "businessData"  : "",
  })

  let business = {}; //-- The Specific Business response for the logged in user from API
  //TODO:: 04/09/22 #EP || Get this to work as a state 
  // let [business, setBusiness] = useState({}); //-- The Specific Business response for the logged in user from API

  // const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on businessScheduler page
  const [appointment_template, setAppointment_template] = useState("test"); //-- when it's to be built, know what to do with it
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  
  const [appointment_confirmation_id, setAppointment_confirmation_id] = useState(); //-- when finalized used to build appt
  // let appointment_confirmation_id = ""; //-- placeholder
  //-- Extract URL Parameters
  const {business_id_or_brand_name, appointment_type_id} = useParams();


  //-- used to ReRoute Navigation away if invalid details
  // const navigate = useNavigate();

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

    let validRequest = null;


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
      validRequest = false
      
    }

    //-- if the business ID or brand_name IS in the database
    if(Businesses[business_id_or_brand_name]){
      //-- 1. Update Scheduler state
      setScheduler({...scheduler, businessData: Businesses[business_id_or_brand_name]});
      //-- 2. Confirm it's a valid request
      validRequest = true;
    }
    
    // 3. Does appointment_type_id exist and if yes for this business
      //TODO:: 04/10/22 #EP || Actually have this do a query and check appointment_type_id
    // if(appointment_type_id) {
      //-- if yes, re-route to that specific appointment type and load page 2 in the schedulerPages index
      // setAppointment_template(business[business_id_TEMP].Appointment_Types[appointment_type_id])
      //-- Otherwise ignore it and/or update screen with message
    // }

    // 4.  Otherwise return the business_id value and assume to load Page 1 on schedulerPages index
    return validRequest;
  }

    
  useEffect(() => {
    const validRequest = validateParams();
    console.log(`validRequest: ${validRequest}`)
  },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic

   - next and former step button onClick events
      nextStep
      formerStep

    - schedulerPages
      the index of what pages it needs to go to

  */

   //-- Client Input Template and Submitting Request  
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

  //-- Move to the next step
  const nextStep = nextStepButton => {
    // nextStepButton.preventDefault();
    
    //-- set the template state variable state
    setAppointment_template(nextStepButton.target.id);
    
    // console.log(nextStepButton.target.id)
    console.log(nextStepButton.target)
    // console.log(appointment_template)
    
    const nextStepButton_id = nextStepButton.target.id;
    
    if(nextStepButton_id === "contact-submit"){
      setAppointment_confirmation_id(nextStepButton_id);
      createAppointment()
    }
    else {
      setStep(step+1);
    }
  };

  const formerStep = formerStepButton => {
    formerStepButton.preventDefault();
    setStep(step-1);
  };

  //-- INDEX of Each Page, which is a step of scheduler
  const schedulerPages = {
    1: <BusinessScheduler business={scheduler.businessData} business_id={scheduler.businessData._id} nextStep={nextStep}></BusinessScheduler>,
    2: <DateTime nextStep={nextStep}/>,
    3: <Client nextStep={nextStep} createAppointment={createAppointment} appointment_template={appointment_template}/>,
    4: <Appointment appointment_confirmation_id={appointment_confirmation_id} />
  };

  //-- Get the number of keys in the pages
  const [maxSteps, setMaxSteps] = useState(
    Object.keys(schedulerPages).length
  );

  //----------------------------------------------------------------------------
  /* Browser Local Storage State checking
    - Should it load anything from local-storage vs default
  */

    //TODO:: 04/09/22 #EP || Build Local Storage to know if scheduling an appt for offline and state awareness. If exists, pull info and start from there.

  //-- Browser Local Storage Checking


  //----------------------------------------------------------------------------
  /* Verify Request Integrity
  */

  //-- Verifying if requests are made properly or not
  const checkState = () => {

    let response = true

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false
    if(!scheduler.businessData._id){ 
      response = false; 
      console.log(scheduler)
    }
    
    return response;
  }
  
  // 
  
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
                        {schedulerPages[step]}
                        (<StatusBar step={step} state={checkState} maxSteps={maxSteps} formerStep={formerStep} />)
                    </section>
                  );
                  case false: return <PageNotFound />;
                  default:    return <PageNotFound />;
                }
            })()}
    </section>
  )
};

 
