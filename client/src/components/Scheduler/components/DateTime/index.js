import { now } from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';


export default function DateTime({nextStep}) {
  const [value, onChange] = useState('9:00');



  return (
    <section className="page scheduleAppointment">
      <header>
        <h3>Select Date and Time</h3>
      </header>
      <div className="appointmentCard appointmentCalendar">
        <Calendar>Pick your appointment date</Calendar>
        <p>Please select your appointment time</p>
        <TimePicker onChange={onChange} value={value}></TimePicker>
        <br></br>
        <br></br>
        <label htmlFor="notes">Anything we should know?</label>
        <textarea
          name="notes"
          rows="5"
          placeholder="During the appointment, I want to talk about..."
        />
        <br></br>
        <button onClick={nextStep}>Schedule Appointment</button>
      </div>
    </section>
    
  )
}
