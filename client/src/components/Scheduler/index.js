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
import  { QUERY_BUSINESS, QUERY_BUSINESSES, QUERY_BUSINESS_THOROUGH, QUERY_BUSINESS_THOROUGH_BY_ID } from '../../utils/queries';
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
  });


  const formDetails ={
    "businessId": "6257268f1fbc1664e0193a57",
     "userId" : "6258933cccffbe8a38bca462", //-- local
    //  "userId": "62589daf6a7be00016287f94", // cloud
    "apptTypeId": "62572c211fbc1664e0193a6a",
    "appointmentDate": "04/15/2022",
    "appointmentTime": "10:00 am",
    "appointmentStatus": "Scheduled"
  }

  const [business, setBusiness] = useState({
    // "config"        : {}, //-- placeholder for templates //TODO:: 04/10/22 #EP || Add these in Phase3
    "businessData"    : "",
    "appointmentsData" : "",
    "appointmentTypesData" : ""
  });

  // const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on AppointmentTypes page
  const [appointment_template, setAppointment_template] = useState("test"); //-- when it's to be built, know what to do with it
  
  
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  
  const [appointment_confirmation_id, setAppointment_confirmation_id] = useState(); //-- when finalized used to build appt
  // let appointment_confirmation_id = ""; //-- placeholder
  //-- Extract URL Parameters
  const {business_id_or_brand_name, appointment_type_id} = useParams();

  // query for business appt info
  const { loading, data, error } = useQuery( QUERY_BUSINESS, { variables: { brandName: business_id_or_brand_name } } );

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //-- used to ReRoute Navigation away if invalid details
  // const navigate = useNavigate();

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS  */

  const validateParams = async () => {  //-- Determine which params are sent in and route or re-route accordingly.

    let validRequest = null;
    
    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_brand_name){
      validRequest = false 
      //-- IF NOT valid request is TRUE, update title with Invalid Request
      if(!validRequest){ document.title = `Calendari - Invalid Request`};
    }
    
    // 2. If DONE loading but no data, FALSE
    else if(!loading && !data){ 
      validRequest = false 
      //-- IF NOT valid request is TRUE, update title with Invalid Request
      if(!validRequest){ document.title = `Calendari - Invalid Request`};
      // console.log("not loading no data")
    } 
   
    // 3. If not loading and there IS data
    else if( !loading && data ){ 
      
      const businessData = data.businessByBrandName;
      const appointmentsData = data.businessByBrandName.appointments;
      const appointmentTypesData = data.businessByBrandName.appointment_types;
      // console.log(data.businessByBrandName)

      setBusiness({ //-- update Business Page state from query data
        ...business,
        "appointmentsData" : appointmentsData,
        "appointmentTypesData" : appointmentTypesData,
        "businessData": businessData,
      });

      validRequest = true; //-- was a valid request and completed
      setState(validRequest); //-- Update overall Business Page state as TRUE to allow content to load

      if(validRequest){ document.title = `Calendari - ${capitalizeFirstLetter(data.businessByBrandName.brand_name)}'s Scheduler`};
    }

    // 4. Does appointment_type_id exist and if yes for this business //TODO:: 04/10/22 #EP || Actually have this do a query and check appointment_type_id
    return validRequest; //-- return results to update the title-bar accordingly
  }
  
  // useEffect(() => {
  //   const validRequest = validateParams();
     //-- IF valid request is TRUE, update title with business name. 
    // if(validRequest){ document.title = `Calendari - {business.businessData.name} Scheduler`};
    
    //-- IF NOTE valid request is TRUE, update title with Invalid Request
  //   if(!validRequest){ document.title = `Calendari - Invalid Request`};
  // },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const nextStep = nextStepButton => { //-- Move to the next step until LAST step
    nextStepButton.preventDefault();


    
    const results = nextStepButton.target;              //-- used to build dict for mutation
    
    if(results.id == "apptTypeId"){
      setScheduler({...scheduler, apptTypeId: results.value })
    }

    else {
      const resultsLength = results.length;
      let formResults = {}  //--holds form submission results
   
      for(let i = 0; i < resultsLength-1; i++ ){ //-- iterates through all results excluding the button
          formResults[results[i].id] = results[i].value; //-- adds to dictionary
      }


      setScheduler({...scheduler, formResults })

    }

    
    // setAppointment_template(nextStepButton.target.id);  //-- set the template state variable state
    const nextStepButton_id = nextStepButton.target.id; //-- grab ID of selected button
    
    if(nextStepButton_id === "contact-submit"){ //-- if the contact-submit ( final button ) do API call
      setAppointment_confirmation_id(nextStepButton_id);
      // createAppointment(appointment_confirmation_id);
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
    1: <AppointmentTypes
          appointmentsData={business.appointmentsData} 
          appointmentTypesData={business.appointmentTypesData} 
          business={business.businessData}
          business_id={business.businessData._id}
          nextStep={nextStep}>    
      </AppointmentTypes>
    ,
    2: <DateTime nextStep={nextStep}/>,
    3: <Client nextStep={nextStep} createAppointment={createAppointment} appointment_template={appointment_template}/>,
    4: <Appointment appointment_confirmation_id={appointment_confirmation_id} />
  };

  const [maxSteps, setMaxSteps] = useState( //-- Get the number of keys in the pages ( needs to be down here to function )
    Object.keys(schedulerPages).length
  );



  if (loading) {
      console.log("loading");
      // console.log(business_id_or_brand_name)
    } else if (data) {
      // console.log(data)
    } else {
      // console.log(error)
    }

  if(loading)return(<h1>loading</h1>)
  //-- if Error or bad URl request, send to 404
  if(error || !data.businessByBrandName || !data) return(<Navigate replace to="/404" />)

  //----------------------------------------------------------------------------
  /*TODO:: Browser Local Storage State checking - Should it load anything from local-storage vs default */
  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page scheduler">
      { !state ? validateParams() : "" }
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      {schedulerPages[step]}
      <ProgressBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} />
    </section>
  )
};

 




// {(() => {
//           switch(state) {    
//             case true:  return (
//               <section>
                  
//                   {/* The current step / page in the scheduler */}
//                   {schedulerPages[step]}
                  
//                   {/* The bottom status bar */}
//                   <ProgressBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} />
//               </section>
//             );
//             case false: return validateParams ? <PageNotFound /> : <Navigate replace to="/" />;
//             //TODO:: 04/10/22 #EP || Add component for loading
//             default:    return "Loading...";
//           }
//         })()}
