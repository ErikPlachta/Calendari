//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Navigate } from "react-router-dom";
import { useQuery } from '@apollo/client';


//------------------------------------------------------------------------------
//-- PAGES
import PageNotFound from '../../pages/PageNotFound';
import Appointment from '../../pages/Appointment'; //-- confirmation page

//------------------------------------------------------------------------------
//-- SUB COMPONENTS
import ProgressBar from './../ProgressBar';
import AppointmentTypes from './components/AppointmentTypes';
import DateTime from './components/DateTime';
import Client from './components/Client';

//------------------------------------------------------------------------------
//-- ASSETS

import { QUERY_BUSINESS } from '../../utils/queries';
import { ADD_APPT } from '../../utils/mutations';
const DB_Business = require('../../assets/json/business.json'); //-- Hardcoded data used to simulate the Database

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
/* EXPORT FUNCTION - Scheduler

  URL PARAMS: (business_id_or_name, appointment_type_id)
    - business_id_or_name:    The business they're scheduling for
    - appointment_type_id:    The ID of the Appointment they selected
*/
export default function Scheduler() {

  //TODO:: 05/09/22 #EP || useState(DB_Business) to be replaced with GraphQL Query
  const [Businesses, setBusinesses] = useState(DB_Business); //-- simulating Graph QL query    
  
  const [scheduler, setScheduler] = useState({
    "clientData"      : "",
    "businessData"  : "",
    "addAppt"       : {
      "businessId": "",
      "userId"    : "",
      'appointmentStatus' : '',
      'appointmentTime': '',
      'appointmentDate' : '',
      'apptTypeId'      : ''
    }
  })

  let business = {}; //-- The Specific Business response for the logged in user from API
  //TODO:: 04/09/22 #EP || Get this to work as a state 
  // let [business, setBusiness] = useState({}); //-- The Specific Business response for the logged in user from API

  // const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on AppointmentTypes page
  const [appointment_template, setAppointment_template] = useState("test"); //-- when it's to be built, know what to do with it
  
  
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  
  const [appointment_confirmation_id, setAppointment_confirmation_id] = useState(); //-- when finalized used to build appt
  // let appointment_confirmation_id = ""; //-- placeholder
  //-- Extract URL Parameters
  const {business_id_or_brand_name, appointment_type_id} = useParams();

  // query for business appt info
  const { loading, data, error } = useQuery( QUERY_BUSINESS, { variables: { brandName: business_id_or_brand_name } } );

  if (loading) {
    console.log("loading");
  } else if (data) {
    console.log(data)
  } else {
    console.log(error)
  }

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //-- used to ReRoute Navigation away if invalid details
  // const navigate = useNavigate();

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS  */

  const validateParams = async () => {  //-- Determine which params are sent in and route or re-route accordingly.

    let validRequest = null;
    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_brand_name){ validRequest = false }
    
    // 2. If  valid business_id or business_name extract just the business ID
    else if(!Businesses[business_id_or_brand_name]){ validRequest = false }

    // 3. if the business ID or brand_name IS in the database, Load  Scheduler
    else if(Businesses[business_id_or_brand_name]){
      //-- 1. Update Scheduler state
      setScheduler({...scheduler, businessData: Businesses[business_id_or_brand_name]});
      //-- 2. Confirm it's a valid request
      validRequest = true;
      //-- 3. Set Scheduler state to true so page loads
      setState(validRequest);
    }

    // 4. Does appointment_type_id exist and if yes for this business //TODO:: 04/10/22 #EP || Actually have this do a query and check appointment_type_id

    return validRequest; //-- return results to update the title-bar accordingly
  }
  
  useEffect(() => {
    const validRequest = validateParams();
     //-- IF valid request is TRUE, update title with business name. 
    if(validRequest){ document.title = `Calendari - {business.businessData.name} Scheduler`};
    
    //-- IF NOTE valid request is TRUE, update title with Invalid Request
    if(!validRequest){ document.title = `Calendari - Invalid Request`};
  },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const nextStep = nextStepButton => { //-- Move to the next step until LAST step
    nextStepButton.preventDefault();
    
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
  
  const schedulerPages = { //-- INDEX of Each Page, which is a step of scheduler
    1: <AppointmentTypes business={scheduler.businessData} business_id={scheduler.businessData._id} nextStep={nextStep}></AppointmentTypes>,
    2: <DateTime nextStep={nextStep}/>,
    3: <Client nextStep={nextStep} createAppointment={createAppointment} appointment_template={appointment_template}/>,
    4: <Appointment appointment_confirmation_id={appointment_confirmation_id} />
  };

  const [maxSteps, setMaxSteps] = useState( //-- Get the number of keys in the pages ( needs to be down here to function )
    Object.keys(schedulerPages).length
  );

  //----------------------------------------------------------------------------
  /*TODO:: Browser Local Storage State checking - Should it load anything from local-storage vs default */
  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page scheduler">
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
        {(() => {
          switch(state) {    
            case true:  return (
              <section>
                  
                  {/* The current step / page in the scheduler */}
                  {schedulerPages[step]}
                  
                  {/* The bottom status bar */}
                  <ProgressBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} />
              </section>
            );
            case false: return validateParams ? <PageNotFound /> : <Navigate replace to="/" />;
            //TODO:: 04/10/22 #EP || Add component for loading
            default:    return "Loading...";
          }
        })()}
    </section>
  )
};

 
