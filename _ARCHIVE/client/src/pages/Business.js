//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
// import BusinessSchedule from './BusinessSchedule';

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
} = require('../../../../client/src/utils/helpers');


//------------------------------------------------------------------------------
//-- ASSETS

//-- Hardcoded data used to simulate the Database
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =              require('../../../../client/src/assets/json/user.json');
const DB_Business =          require('../../../../client/src/assets/json/business.json');
const DB_Appointment =       require('../../../../client/src/assets/json/appointment.json');
const DB_Appointment_Type =  require('../../../../client/src/assets/json/appointment_type.json');


//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Business
  
  Business Page to load for users that are logged in, otherwise redirect.
*/
export default function Business() {
  
  //-- Onboarding connections to take data to verify integrity
  //TODO:: 04/05/22 #EP|| Make GraphQL Connections here
  const [Businesses, setBusinesses] = useState(DB_Business);
  const [Users, setUsers] = useState(DB_User);
  const [Appointments, setAppointments] = useState(DB_Appointment);
  const [Appointment_Types, setAppointment_Types] = useState(DB_Appointment_Type);


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
  //TODO:: 04/05/22 #EP || Add pull from JWT
  const business_id = '0000-AAAA';
  const user_id     = '0000-0000';


  /*  3. LOAD PROPER BUSINESS NAME ACCORDINGLY    */

  //TODO:: 04/05/22 #EP || Testing basic integrity. Need to build out what these should actually do.
  
  //-- extract business from database based on JWT id
  const business = Businesses[business_id];
  //-- extract schedule from extracted business
  const schedule = business.configuration.schedule;
  //-- extract all users from business //TODO:: 04/05/2022 #EP || Make this the logged in
  const user     = Users[user_id];
  
  const appointments = business.Appointment;
  //TODO:: 04/06/2022 #EP || only return scheduled upcoming by default
    
  
  //TODO:: 04/05/22 #EP || Onboard Appointment_Types
  const appointment_Type = business.Appointment_Type;
  
  //----------------------------------------------------------------------------
  //-- logic

  //TODO:: 04/05/22 #EP || Build this out
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };


  //-- RETURN FUNCTION
  return (
    <section className="page business">
      
      {/* Side Navigational Bar */}
      <aside className='sidebar'>
        <section>
          <h2>{business.name}</h2>
        </section>
        {/* Business Menu */}
        <ul>
          {/* Default landing page for business */}
          <li>Home</li>
          {/* A summary of the business details overall */}
          <li>Dashboard</li>
          {/* Details on upcoming appointments */}
          <li>Appointments</li>
          {/* <li>Reporting</li> */}
          {/* Used to configure options */}
          <li>Settings
            <ul>
              {/* User account specific settings */}
              <li>My Account</li>
              <li>My Business
                <ul>
                  <li>Calendar</li>
                  <li>Appointment Types</li>
                  <li>Users</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      {/* Main content within Business Page */}
      <main className="container business">
        
        {/* Main Header Section on Business Page */}
        


        <section className="containerResults dashboard"> 
          {/* Dashboard is high-level summary  */}
              <h3>Dashboard</h3>
              <ul>
                <li>Scheduled Appointments: </li>
                <li>Completed Appointments: </li>
                <li>Canceled Appointments: </li>
              </ul>
        </section>
        

         {/* Build appointment details here. */}
         <section className="containerResults scheduledAppointments">
          <h3>Here are your scheduled appointments</h3>
          
          <div className='scheduledAppointments'>
            
            {Object.keys(business.Appointment).map((appointment, index) => (
              // <h4>{capitalizeFirstLetter(appointment)}</h4>
              <section className="containerResults scheduledAppointment">
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
      </main>
    </section>
  )
}
