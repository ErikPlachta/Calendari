//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
//------------------------------------------------------------------------------
//-- PAGES
import PageNotFound from '../../pages/PageNotFound';

//------------------------------------------------------------------------------
//-- SUB COMPONENTS
import ProgressBar from '../../components/ProgressBar';
import Client from './components/Client';
import Business from './components/Business';
import Confirmation from './components/Confirmation';

//------------------------------------------------------------------------------
//-- ASSETS
//-- Hardcoded data used to simulate the Database
import {ADD_USER, ADD_BUSINESS} from '../../utils/mutations';
const DB_Business = require('../../assets/json/business.json'); //TODO:: 04/05/22 #EP|| Make GraphQL Connections here

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
/* EXPORT FUNCTION - Signup */
export default function Signup() {

  useEffect(() => {
    document.title = `Calendari - Signup`;
  },[]);


  const [signupForm, setSignupForm] = useState({
    "business": {},
    "user"  : {}
  })


  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query - if business name is unique checking   //TODO:: 04/12/22 #EP | Connect to GQL
  const [newAccount, setNewAccount] = useState({ //-- the user form payload
    "user"      : "",   //-- the users data
    "business"  : "",   //-- the business data for the client //TODO:: 04/12/22 #EP | Connect to GQL
  })

  // const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on businessScheduler page
  const [appointment_template, setAppointment_template] = useState("test"); //-- when it's to be built, know what to do with it
  
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  
  const [appointment_confirmation_id, setAppointment_confirmation_id] = useState(); //-- when finalized used to build appt
  // let appointment_confirmation_id = ""; //-- placeholder
  //-- Extract URL Parameters
  const {business_id_or_brand_name, appointment_type_id} = useParams();

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS  */
  const validateParams = () => {  //-- Determine which params are sent in and route or re-route accordingly.
    let validRequest = true; //-- 04/10/22 #EP || ATM always true, but need to know if  offline
    setState(validRequest)
    return validRequest; //-- return results to update the title-bar accordingly
  }
  
  useEffect(() => {
    const validRequest = validateParams(); //-- 04/12/22 #EP|| Always valid until offline awareness.
    if(validRequest){ document.title = `Calendari - Signup`}; //-- IF valid request is TRUE, update title with business name. 
    if(!validRequest){ document.title = `Calendari - Invalid Request`}; //-- IF NOTE valid request is TRUE, update title with Invalid Request
  },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const nextStep = nextStepButton => { //-- Move to the next step until LAST step
    nextStepButton.preventDefault();
    const results = nextStepButton.target;
    const resultsLength = nextStepButton.target.length;
    
    const formResults = {}
    for(let i = 0; i < resultsLength-1; i++ ){
      formResults[results[i].id] = results[i].value;
    }

    if(nextStepButton.target.id == "business"){
      setNewAccount({...newAccount, "business"  : formResults })
    }
    
    if(nextStepButton.target.id == "user"){
      setNewAccount({...newAccount, "user"  : formResults })
    }

    else{
      console.log(newAccount)
    }

    // { results[i].id : results[i].value } 

  
  
    
    const nextStepButton_id = nextStepButton.target.id; //-- grab ID of selected button
    if(nextStepButton_id === "confirmation-submit"){ //-- if the contact-submit ( final button ) do API call
      // setAppointment_confirmation_id(nextStepButton_id); //TODO:: 04/10/22 #EP || Get form data here
      createAppointment(appointment_confirmation_id); //TODO:: 04/10/22 #EP || post form data to database
    }
    else {
      setStep(step+1);
    }
  };
  
  const formerStep = formerStepButton => { //-- Go back a step
    formerStepButton.preventDefault();
    setStep(step-1);
  };

  //-- Client Input Template and Submitting Request //-- When Appointment is Verified, Submit it to API, and if success move to verification page
  const createAppointment = async params => {// TODO 04/10/22 #EP || to run the API REQUEST from form submit
    //-- When client information verified and submitted, update database with appointment data

    // 1. Validate data
    // 2. Submit to database
    // 3. Verify response
    // 4. Approve re-route or message to UI
    // return response;
  }
  
  const signupPages = { //-- INDEX of Each Page, which is a step of scheduler
    1: <Business nextStep={nextStep} />,
    2: <Client nextStep={nextStep}  />,
    3: <Confirmation nextStep={nextStep} />
  };

  const [maxSteps, setMaxSteps] = useState( //-- Get the number of keys in the pages ( needs to be down here to function )
    Object.keys(signupPages).length
  );

  //----------------------------------------------------------------------------
  /*TODO:: Browser Local Storage State checking - Should it load anything from local-storage vs default */
  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page signup">
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
        {(() => {
          switch(state) {    
            case true:  return (
              <section>
                  <section>
                    {signupPages[step]} {/* The current step / page in the scheduler */}
                  </section>
                  <ProgressBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} /> {/* The bottom status bar */}
              </section>
            );
            case false: return <PageNotFound />; //-- Shouldn't happen put here just in case, maybe server error
            default:    return "Loading..."; //TODO:: 04/10/22 #EP || Add component for loading
          }
        })()}
    </section>
  )
};

