//------------------------------------------------------------------------------
//-- MODULES
import React, { useEffect, useState } from 'react';
import PageNotFound from '../../../../pages/PageNotFound';


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
  } = require('../../../../utils/helpers');



//------------------------------------------------------------------------------
/* EXPORT FUNCTION - User
  //TODO:: 04/10/22 #EP || Update this
*/export default function Appointments({appointmentData}) {
    // console.log(appointmentData)

    const [appointments, setAppointments] = useState({});

    
    const validateParams = async (appointmentData) => {  //-- Determine which params are sent in and update state accordingly
        
        //-- Grab ALL appointment data, update state, prepare to build on page
        if(appointmentData){ 
          setAppointments( appointmentData )
        };
      }
    
    
      //-- Runs to set variables
      useEffect( () => {
        

        validateParams(appointmentData)
      },[]);
    
    
    
    //-- checking to see if things were updated properly and in a place to run
    // const state = () => {
    //TODO:: 04/10/22 #EP || this isn't being used
    // const [state, setState] = useState({

    // let response = true

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false
    // if(!appointments){ 
        // response = false; 
        // console.log("//-- No appointmentData provided...")
    // }

    // return response;
  // };

  return (   
    <section className="scheduledAppointments">
        <header className="business">
          <h3>Here are your schedule appointments</h3>
        </header>
          
          
          <div className='scheduledAppointments'>
            
            {Object.keys(appointments).map((appointment, index) => (
              // <h4>{capitalizeFirstLetter(appointment)}</h4>
              <section className="businessContainerResults scheduledAppointment" key={appointments[appointment]["_id"]}>
                <div>
                  <h4>
                  {appointments[appointment]["User"]["name_first"]} {appointments[appointment]["User"]["name_last"]} has
                  a {appointments[appointment]["status"]}
                  - a {appointments[appointment]['Appointment_Type']["name"]} Appointment
                    with {appointments[appointment]['Details']['client']['name']} on
                    - {dateTimeFull((appointments[appointment]['Details']['date_time']))}
                  </h4>

                    {/* on {dateFormat((appointments[appointment]['Details']['date_time']))}
                    at {dateHourOfDay(appointments[appointment]['Details']['date_time'])}
                    for {appointments[appointment]['Details']['durations']} */}
                  
                  {/* dateGetMonths,
                  dateDayOfWeek,
                  dateHourOfDay, */}
                  <div>
                    <h5>Appointment Details</h5>
                    <ul>
                      <li>Type: {appointments[appointment]['Details']["type"]}</li>
                      <li>Subject: {appointments[appointment]['Details']["subject"]}</li>
                      <li>Summary: {appointments[appointment]['Details']["summary"]}</li>
                      <li>Date & Time for Host: {dateTimeFullLocal(appointments[appointment]['Details']["date_time"])}</li>
                      <li>Duration: {appointments[appointment]['Details']["duration"]}</li>
                      <li>Appointment ID: {appointments[appointment]["_id"]}</li>
                    </ul>
                  </div>

                  <div>
                    <h5>Client Details</h5>
                    <ul>
                    <li>Name: {appointments[appointment]['Details']['client']['name']}   </li>
                    <li>Email: {appointments[appointment]['Details']['client']['email']}  </li>
                    <li>Phone: {appointments[appointment]['Details']['client']['phone']}  </li>
                    <li>Date & Time for Client: {dateTimeFull(appointments[appointment]['Details']['date_time'])}  </li>
                    <li>Timezone: {appointments[appointment]['Details']['timezone']}  </li>
                    </ul>
                  </div>
                </div>
                <div>
                </div>
              </section>
            ))}
            
            
          </div>

    </section>
  )
}
