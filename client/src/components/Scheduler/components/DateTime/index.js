import { now } from 'moment';
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from '../../../DateTimePicker';


export default function DateTime({nextStep}) {
  const [value, onChange] = useState('9:00');



  return (
    <section className="page scheduleAppointment">
      <header>
        <h3>Select Date and Time</h3>
        <p>Select the date and your best avaialble time!</p>
      </header>
      <form className="appointmentCard appointmentCalendar"  onSubmit={nextStep}>
        <span className="form-element">
          <DateTimePicker />
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
