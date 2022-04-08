import React, { useState, useEffect } from 'react';
// import BusinessSchedule from './BusinessSchedule';

const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal
} = require('../utils/helpers');


//-- HARDCODED DATA USED TO SIMULATE DATA CALLS FROM DATABASE
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =              require('../assets/json/user.json');
const DB_Business =          require('../assets/json/business.json');
const DB_Appointment =       require('../assets/json/appointment.json');
const DB_Appointment_Type =  require('../assets/json/appointment_type.json');



export default function Business_id() {

  //-- Onboarding connections to take data to verify integrity
  //TODO:: 04/05/22 #EP|| Make GraphQL Connections here
  const [Businesses, setBusinesses] = useState(DB_Business);
  const [Users, setUsers] = useState(DB_User);
  const [Appointments, setAppointments] = useState(DB_Appointment);
  const [Appointment_Types, setAppointment_Types] = useState(DB_Appointment_Type);


  //TODO:: 04/05/22 #EP || Add pull from JWT
  const business_id = '0000-AAAA';
  const user_id     = '0000-0000';

  //-- extract business from database based on JWT id
  const business = Businesses[business_id];


  //TODO:: 04/05/22 #EP || Build this out
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };

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
        <header className="business">  
          <p>Welcome, message. </p>
        </header>


        <section className="containerResults dashboard">
          {/* Dashboard is high-level summary  */}
          <section className="containerResults">
              <h3>Dashboard</h3>
              <p>placeholder text for summary, here.</p>

              <h4>Appointments</h4>
              <ul>
                <li>Scheduled: </li>
                <li>Completed: </li>
                <li>Canceled: </li>
              </ul>
            </section>
        </section>
        

         {/* Build appointment details here. */}
         <section className="containerResults scheduledAppointments">
          <h3>Here are your schedule appointments</h3>
          
          <div className='scheduledAppointments'>
            
            {Object.keys(business.Appointment).map((appointment, index) => (
              // <h4>{capitalizeFirstLetter(appointment)}</h4>
              <section className="containerResults scheduledAppointment">
                <div>
                  <h4>
                      Placeholder H4
                  </h4>

                    {/* on {dateFormat((appointments[appointment]['Details']['date_time']))}
                    at {dateHourOfDay(appointments[appointment]['Details']['date_time'])}
                    for {appointments[appointment]['Details']['durations']} */}
                  
                  {/* dateGetMonths,
                  dateDayOfWeek,
                  dateHourOfDay, */}
                  <div>
                    <h5>Appointment Details</h5>
                    {/* <ul>
                      <li>Type: {appointments[appointment]['Details']["type"]}</li>
                      <li>Subject: {appointments[appointment]['Details']["subject"]}</li>
                      <li>Summary: {appointments[appointment]['Details']["summary"]}</li>
                      <li>Date & Time for Host: {dateTimeFullLocal(appointments[appointment]['Details']["date_time"])}</li>
                      <li>Duration: {appointments[appointment]['Details']["duration"]}</li>
                      <li>Appointment ID: {appointments[appointment]["_id"]}</li>
                    </ul> */}
                  </div>

                  <div>
                    <h5>Client Details</h5>
                    {/* <ul>
                      <li>Name: {appointments[appointment]['Details']['client']['name']}   </li>
                      <li>Email: {appointments[appointment]['Details']['client']['email']}  </li>
                      <li>Phone: {appointments[appointment]['Details']['client']['phone']}  </li>
                      <li>Date & Time for Client: {dateTimeFull(appointments[appointment]['Details']['date_time'])}  </li>
                      <li>Timezone: {appointments[appointment]['Details']['timezone']}  </li>
                    </ul> */}
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
