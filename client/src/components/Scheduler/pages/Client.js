import React, { useState, useEffect } from 'react';


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






//------------------------------------------------------------------------------
//-- EXPORT FUNCTION

export default function Client() {
  
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };

  return (
    <section className="page verify">
      <h3>Contact</h3>
      <form id="clientContactForm">

      {/* 
      {Object.keys(appointment_types).map( (appointment_type, index) => (        
        
        
      */}

      </form>
    </section>
    
  )
}
