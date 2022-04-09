import React, { useState, useEffect } from 'react';
import BusinessScheduler from './pages/BusinessScheduler';
import StatusBar from './sub-components/StatusBar';
//-- SCHEDULER

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
const DB_User =              require('../../assets/json/user.json');
const DB_Business =          require('../../assets/json/business.json');
const DB_Appointment =       require('../../assets/json/appointment.json');
const DB_Appointment_Type =  require('../../assets/json/appointment_type.json');



//------------------------------------------------------------------------------
//-- EXPORT FUNCTION

/*
    prop: (business_ID, appointment_ID)
      business_ID:      The business they're scheduling for
      appointment_ID:  The ID of the Appointment they selected

*/

export default function Scheduler({business_id_or_name, appointment_type_id}) {
  
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //-- PLACEHOLDER CONTENT
  
  
  //-- Onboarding connections to take data to verify integrity
  //TODO:: 04/05/22 #EP|| Make GraphQL Connections here
  const [Businesses, setBusinesses] = useState(DB_Business);
  const [Users, setUsers] = useState(DB_User);
  const [Appointments, setAppointments] = useState(DB_Appointment);
  const [Appointment_Types, setAppointment_Types] = useState(DB_Appointment_Type);

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  //-- to hold business info and pass down if needed
  
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState({});
  const [appointment_types,set_appointment_types] = useState({});

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
  const validateParams = () => {
    //-- Determine which params are sent in and route or re-route accordingly.

    // 1. If No business_id, no business_name or invalid values found, exit
    if(!business_id_or_name){
      //-- Doesn't exist, re-route to homepage or 404 page
      
    }
    
    // 2. If  valid business_id or business_name extract just the business ID
      // -- grabs it and stores into const here
    //TODO:: 04/09/22 #EP | 
    const business_id_TEMP = business_id_or_name;
    // setBusiness(Businesses[business_id_TEMP]);
    // console.log(Businesses[business_id_TEMP]);
    // set_appointment_types = business.configuration.appointment_types;
    
    
    
    // 3. Does appointment_type_id exist and if yes for this business
    if(appointment_type_id) {
      //-- if yes, re-route to that specific appointment type and load page 2 in the schedulerPages index
      //-- Otherwise ignore it and/or update screen with message
    }

    // 4.  Otherwise return the business_id value and assume to load Page 1 on schedulerPages index
    return business_id_TEMP;
  }
  
  //-- RUN VALIDATION
  const business_id = validateParams();

  //-- IF INVALID PARAMS NOTHING BELOW HERE HAPPENS.
  
  //----------------------------------------------------------------------------
  /*
  */

    
  //-- Move to the next step
  const nextStep = nextStepButton => {
    nextStepButton.preventDefault();
    setStep(step+1);
  };



  //-- INDEX of Each Page, which is a step of scheduler
  const schedulerPages = {
    1: <BusinessScheduler business_id={business_id} nextStep={nextStep}></BusinessScheduler>,
    2: "Date Time Timezone",
    3: "Client Information and Verify",
    4: "API Reroute to root page Appointment with params business_id and appointment_id"
  };

  
  
  const createAppointment = async params => {
    //-- When client information verified and submitted, update database with appointment data

    

    // 1. Validate data

    // 2. Submit to database

    // 3. Verify response

    // 4. Approve re-route or message to UI
    setStep(5);

    // return response;
  }

  //-- Browser Local Storage Checking
  const checkState = () => {
    //-- Looking at Local Storage to see if Client was scheduling an appointment and load if so. 
    
    
    //TODO:: 04/09/22 #EP || Local Storage to know if scheduling an appt for offline and state awareness. If exists, pull info and start from there

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false

    return false;
  }

  //-- extract business from database based on JWT id
  // const business = Businesses[business_id];
  // const appointment_types = business.configuration.appointment_types;




  //----------------------------------------------------------------------------
  //-- RETURN JSX ELEMENT

  return (
    <section className="page scheduler">
      <StatusBar step={step} state={checkState}/>
      
      <div>
        {checkState
          ? schedulerPages[1]
          : <h3>checkState Placeholder: TRUE: Has giLocal Storage</h3>
        }
      </div>
    </section>
  )
};

 
