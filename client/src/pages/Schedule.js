import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';

export default function Schedule() {
    const [value, onChange] = useState('9:00');
  return (
    <section>
        <Calendar>Pick your appointment date</Calendar>
        <p>Please select your appointment time</p>
        <TimePicker onChange={onChange} value={value}></TimePicker>
    </section>
    
  )
}
