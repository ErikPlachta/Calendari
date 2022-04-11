import { now } from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';


export default function DateTime({nextStep}) {
  const [value, onChange] = useState('9:00');



  return (
    <section className="containerResults">
      <h3>Select Date and Time</h3>
      <Calendar>Pick your appointment date</Calendar>
      <p>Please select your appointment time</p>
      <TimePicker onChange={onChange} value={value}></TimePicker>
      <br></br>
      <label htmlFor="notes">Notes for Astronaut:</label>
      <br></br>
      <textarea name="notes" rows="4"/>
      <br></br>
      <button onClick={nextStep}>Schedule Appointment</button>
    </section>
    
  )
}