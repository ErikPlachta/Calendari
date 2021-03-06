import { now } from 'moment';
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import {dateFormatPicker} from '../../../../utils/helpers'

export default function DateTime({nextStep}) {
  const [value, onChange] = useState('9:00');


  return (
    <section className="page scheduleAppointment">
      <header>
        <h3>Select Date and Time</h3>
        <p>Select the date and your best avaialble time!</p>
      </header>
      
      <form id='scheduler-date-time' className="appointmentCard appointmentCalendar"  onSubmit={nextStep}>
        <span className="form-element">
          <label htmlFor="date">Enter a date for your appointment:</label>
          <input 
            id='date'
            type="date"
            step="1"
            min={dateFormatPicker(Date.now())}
            // max={dateFormatPicker( ) }
            required
           />
          {/* <input id="date1" size="60" type="date" format="MM/DD/YYYY" placeholder="MM/DD/YYYY" /> */}
          <label htmlFor="time-start">Select a Start Time</label>
          <input 
            id="time-start"
            type='time'
            min="9:00 AM"
            max="17:00 PM"
            // step="3600"
            required
          ></input>
          {/* end time */}
          {/* <label for="time">Select an End Time</label>
          <input 
            id="time-end"
            type='time'
            min="9:00 AM"
            max="17:00 PM"
            // step="3600"
            required
          ></input> */}
        </span>
        <span className='form-element'>
        <input
            type="submit"
            className="button"
            id="contact-me-submit"
            value="Next"
          />
        </span>
      </form>
    </section>
    
  )
}
