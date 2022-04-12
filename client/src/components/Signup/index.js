//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


//------------------------------------------------------------------------------
//-- PAGES

//------------------------------------------------------------------------------
//-- SUB COMPONENTS
import StatusBar from './sub-components/StatusBar';
import Client from './sub-components/Client';

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
    document.title = `Calendari - Signup`;
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

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //-- used to ReRoute Navigation away if invalid details
  // const navigate = useNavigate();

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS  */

  const validateParams = () => {  //-- Determine which params are sent in and route or re-route accordingly.

    let validRequest = true;
    setState(validRequest)
    

    return validRequest; //-- return results to update the title-bar accordingly
  }
  
  useEffect(() => {
    const validRequest = validateParams();
     //-- IF valid request is TRUE, update title with business name. 
    if(validRequest){ document.title = `Calendari - Signup`};
    
    //-- IF NOTE valid request is TRUE, update title with Invalid Request
    if(!validRequest){ document.title = `Calendari - Invalid Request`};
  },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const nextStep = nextStepButton => { //-- Move to the next step until LAST step
    // nextStepButton.preventDefault();
    
    setAppointment_template(nextStepButton.target.id);  //-- set the template state variable state
    const nextStepButton_id = nextStepButton.target.id; //-- grab ID of selected button
    if(nextStepButton_id === "contact-submit"){ //-- if the contact-submit ( final button ) do API call
      setAppointment_confirmation_id(nextStepButton_id);
      //TODO:: 04/10/22 #EP || Get form data here
      createAppointment(appointment_confirmation_id);
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
  const createAppointment = async params => {// TODO - to run the API REQUEST from form submit
    //-- When client information verified and submitted, update database with appointment data

    // 1. Validate data
    // 2. Submit to database
    // 3. Verify response
    // 4. Approve re-route or message to UI
    // return response;
  }
  
  const signupPages = { //-- INDEX of Each Page, which is a step of scheduler
    1: <Client nextStep={nextStep} createAppointment={createAppointment} appointment_template={appointment_template}/>,
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
                  
                  {/* The current step / page in the scheduler */}
                  {signupPages[step]}
                  
                  {/* The bottom status bar */}
                  <StatusBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} />
              </section>
            );
            case false: return "<PageNotFound />";
            //TODO:: 04/10/22 #EP || Add component for loading
            default:    return "Loading...";
          }
        })()}
    </section>
  )
};

 
