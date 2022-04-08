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

        {/* container holding appointment types  */}
        <section className="containerResults">
          {Object.keys(appointment_types).map( (appointment_type, index) => (        
            // <form>
              <div className="containerResults appointment_type_card">
                <h3>
                  {capitalizeFirstLetter(appointment_types[appointment_type]['name'])}
                </h3>
                <p>
                  {appointment_types[appointment_type]['summary']}
                </p>
                <span>
                  {appointment_types[appointment_type]['description']}    
                </span>
                
                <span>
                  <button className="appointment_type_button" onClick={approveTimes}>
                    Start Application
                  </button>
                </span>
              </div>
            // </form>
          ))}
                
        </section>
      </main>
    </section>
    
  )
}
