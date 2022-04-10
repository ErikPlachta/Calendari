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

export default function Client({nextStep, appointment_template}) {
  
  const approveTimes = dateTimes => {
    dateTimes.preventDefault();
  };

  console.log(appointment_template)
  return (
    <section className="page clientContact">
      <h3>Enter your Contact Information</h3>
      <form id="clientContactForm" className="containerResults">
        {/* {appointment_template} */}
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* CLIENT NAME */}
                    <span>
                      <label htmlFor='contact-name'>Your Name</label>
                      <input typeof='text' id="contact-name" defaultValue="Your name here"></input>
                    </span>
                    
                    {/* PHONE NUMBER */}
                    <span>
                      <label htmlFor='contact-phone'>Phone</label>
                      <input typeof='phone' id='contact-phone'></input>
                    </span>
                    
                    {/* EMAIL ADDRESS */}
                    <span>
                      <label htmlFor='contact-email'>Email</label>
                      <input typeof='email' id='contact-email'></input>
                    </span>

                    {/* DESCRIPTION */}
                    <span>
                      <label htmlFor='contact-description'>Description</label>
                      <textarea  id='contact-email' rows="10" />
                    </span>

                    {/* SUBMIT BUTTON */}
                    <span>
                      <label htmlFor='contact-submit'></label>
                      <button onClick={nextStep} id='contact-submit'>
                        Create my Appointment  
                      </button>
                    </span>

                  </div>
            );
          }
        })()}
      {/* 
      {Object.keys(appointment_types).map( (appointment_type, index) => (        
        
        
      */}
        abc
      </form>
    </section>
    
  )
}
