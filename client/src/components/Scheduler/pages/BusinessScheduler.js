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
} = require('../../../utils/helpers');


//-- HARDCODED DATA USED TO SIMULATE DATA CALLS FROM DATABASE
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =              require('../../../assets/json/user.json');
const DB_Business =          require('../../../assets/json/business.json');
const DB_Appointment =       require('../../../assets/json/appointment.json');
const DB_Appointment_Type =  require('../../../assets/json/appointment_type.json');


//------------------------------------------------------------------------------
//-- EXPORT FUNCTION - BusinessScheduler
export default function BusinessScheduler({business, business_id, nextStep}) {
  

  //TODO:: 04/05/22 #EP || Add pull from JWT
  // business_id = '0000-AAAA';

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  //-- extract business from database based on JWT id
  // const business = Businesses[business_id];
  // const business = businessobj;
  const appointment_types = business.configuration.appointment_types;

  //TODO:: 04/05/22 #EP || When selecting appointment type, move to next steps
  const startScheduling = selectedAppointment => {
    selectedAppointment.preventDefault();
  };

  //----------------------------------------------------------------------------
  //-- RETURN JSX ELEMENT
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
            <div className="containerResults appointment_type_card" key={appointment_types[appointment_type]['_id']} id="appointment_types[appointment_type]['_id']">
                <h3>
                  {capitalizeFirstLetter(appointment_types[appointment_type]['name'])}
                </h3>
                <span className="appointment_type_card_summary">
                  {appointment_types[appointment_type]['summary']}
                </span>
                <span className="appointment_type_card_description">
                  {appointment_types[appointment_type]['description']}
                </span>
                <span className="appointment_type_card_details">
                  <h4 className="appointment_type_card_details">
                    {appointment_types[appointment_type]['Details']['subject']}     
                  </h4>
                  <ul>
                    <li>Date:       {appointment_types[appointment_type]['Details']['date']}        </li>
                    <li>Duration:   {appointment_types[appointment_type]['Details']['duration']}    </li>
                    <li>Start Time: {appointment_types[appointment_type]['Details']['time_start']}  </li>
                    <li>Timezone:   {appointment_types[appointment_type]['Details']['timezone']}    </li>
                  </ul>
                </span>
                
                <span>
                  <button className="appointment_type_button" onClick={nextStep}>
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
