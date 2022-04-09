import React, { useState, useEffect } from 'react';
import BusinessScheduler from './pages/BusinessScheduler';
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

export default function Scheduler({business_id, appointment_type_id}) {
  
  //TODO:: 04/09/22 #EP || appointment_type_id - Concept: if defined, goes straight to appt type
  
  
  //----------------------------------------------------------------------------
  //-- PLACEHOLDER CONTENT
  
  
  //-- Onboarding connections to take data to verify integrity
  //TODO:: 04/05/22 #EP|| Make GraphQL Connections here
  const [Businesses, setBusinesses] = useState(DB_Business);
  const [Users, setUsers] = useState(DB_User);
  const [Appointments, setAppointments] = useState(DB_Appointment);
  const [Appointment_Types, setAppointment_Types] = useState(DB_Appointment_Type);
  

  //----------------------------------------------------------------------------
  //-- Component Functions
  
  //-- Each Page represents a STEP of the scheduling process
  const schedulerPages = {
    0: <BusinessScheduler></BusinessScheduler>,
    1: "Date Time Timezone",
    2: "Client Information and Verify",
    3: "API Reroute to root page Appointment with params business_id and appointment_id"
  };
  
  const createAppointment = async params => {
    //-- When client information verified and submitted, update database with appointment data

    // 1. Validate data

    // 2. Submit to database

    // 3. Verify response

    // 4. Approve re-route or message to UI
  }


  
  //-- Browser Local Storage Checking
  const checkState = () => {
    //-- Looking at Local Storage to see if Client was scheduling an appointment and load if so. 
    
    
    //TODO:: 04/09/22 #EP || Local Storage to know if scheduling an appt for offline and state awareness. If exists, pull info and start from there

    //1. See if Local Storage contains data

    //2. If it does, return it

    //3. if does not, just return false

    return false;
  }

  


  //-- extract business from database based on JWT id
  const business = Businesses[business_id];
  const appointment_types = business.configuration.appointment_types;

  
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };

  return (
    <section className="page scheduler">
      <div>
        {checkState
          ? [
              <div className="containerResults">
                <h3>checkState Placeholder: FALSE: No Local Storage</h3>
              </div>,
              <BusinessScheduler></BusinessScheduler>
            ]
          : <h3>checkState Placeholder: TRUE: Has giLocal Storage</h3>
        }
      </div>
    </section>
    
  )
};

 
