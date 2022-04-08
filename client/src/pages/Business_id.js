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
  const appointment_types = business.configuration.appointment_types;

  //TODO:: 04/05/22 #EP || Build this out
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };

  return (
    <section className="page business">

      {/* Main content within Business Page */}
      <main className="container business">
        
        {/* Main Header Section on Business Page */}
        <header className="business">  
        <h2>{business.name}</h2>
          <p>{business.welcome}</p>
        </header>


          {/* Dashboard is high-level summary  */}
        {/* <section className="containerResults dashboard">
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
        </section> */}
        

         {/* Build appointment details here. */}
         <section className="containerResults">
            <form className='dayOfWeek'>
                {Object.keys(appointment_types).map( (appointment_type, index) => (
                  <div className="containerResults">
                    <h3>
                      {capitalizeFirstLetter(appointment_types[appointment_type]['name'])}
                    </h3>
                    <p>
                      {appointment_types[appointment_type]['summary']}
                    </p>
                    <span>
                      {appointment_types[appointment_type]['description']}    
                    </span>
                  </div>
                ))}
                {/* submit button for times */}
                <input type='button' value="Launch" onClick={approveTimes}></input>
            </form>
        </section>
      </main>
    </section>
    
  )
}
