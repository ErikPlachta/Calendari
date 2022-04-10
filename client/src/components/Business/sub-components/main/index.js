//------------------------------------------------------------------------------
//-- MODULES
import React from 'react'




{/* Main content within Business Page */}
<main className="container business">
        
{/* Main Header Section on Business Page */}



<section className="containerResults dashboard">
  {/* Dashboard is high-level summary  */}
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
</section>


 {/* Build appointment details here. */}
 <section className="containerResults scheduledAppointments">
  <h3>Here are your schedule appointments</h3>
  
  <div className='scheduledAppointments'>
    
    {Object.keys(business.Appointment).map((appointment, index) => (
      // <h4>{capitalizeFirstLetter(appointment)}</h4>
      <section className="containerResults scheduledAppointment">
        <div>
          <h4>
          {appointments[appointment]["User"]["name_first"]} {appointments[appointment]["User"]["name_last"]} has
          a {appointments[appointment]["status"]}
          - a {appointments[appointment]['Appointment_Type']["name"]} Appointment
            with {appointments[appointment]['Details']['client']['name']} on
            - {dateTimeFull((appointments[appointment]['Details']['date_time']))}
          </h4>

            {/* on {dateFormat((appointments[appointment]['Details']['date_time']))}
            at {dateHourOfDay(appointments[appointment]['Details']['date_time'])}
            for {appointments[appointment]['Details']['durations']} */}
          
          {/* dateGetMonths,
          dateDayOfWeek,
          dateHourOfDay, */}
          <div>
            <h5>Appointment Details</h5>
            <ul>
              <li>Type: {appointments[appointment]['Details']["type"]}</li>
              <li>Subject: {appointments[appointment]['Details']["subject"]}</li>
              <li>Summary: {appointments[appointment]['Details']["summary"]}</li>
              <li>Date & Time for Host: {dateTimeFullLocal(appointments[appointment]['Details']["date_time"])}</li>
              <li>Duration: {appointments[appointment]['Details']["duration"]}</li>
              <li>Appointment ID: {appointments[appointment]["_id"]}</li>
            </ul>
          </div>

          <div>
            <h5>Client Details</h5>
            <ul>
            <li>Name: {appointments[appointment]['Details']['client']['name']}   </li>
            <li>Email: {appointments[appointment]['Details']['client']['email']}  </li>
            <li>Phone: {appointments[appointment]['Details']['client']['phone']}  </li>
            <li>Date & Time for Client: {dateTimeFull(appointments[appointment]['Details']['date_time'])}  </li>
            <li>Timezone: {appointments[appointment]['Details']['timezone']}  </li>
            </ul>
          </div>
        </div>
        <div>
        </div>
      </section>
    ))}
    
    
  </div>

</section>


<section className="containerResults dayOfWeek">
    {/* Setup Days of Week, section. */}
    <h3>It looks like your schedule needs to be setup!</h3>
    
    <div className='dayOfWeek'>
        <p>Please confirm the days and times you are available for appointments.</p>
        <form className='dayOfWeek'>
            {Object.keys(schedule).map( (dayOfWeek, index) => (
            <div>
                
                <h4>{capitalizeFirstLetter(dayOfWeek)}</h4>
                {/* Go through each day of week, present days with times and if verified */}
                {Object.keys(schedule[dayOfWeek]).map((value, index) => ( 
                    <span>
                    {(() => {
                        switch (value) {
                            case 'start'    :   return  <input type='time' id={(`${dayOfWeek}_start`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                            case 'end'      :   return  <input type='time' id={(`${dayOfWeek}_end`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                            case 'verified' :   return  <input type="checkbox" id={(`${dayOfWeek}_verified`)} />;
                            // checked={checked ? 'checked' : ''}
                            default         :   return "NULL";
                        }
                        })()}
                    {/* { (`${schedule[dayOfWeek][time]} -`)  || schedule[dayOfWeek][time] } */}
                    </span>
                ))}
            </div>
            ))}
            {/* submit button for times */}
            <input type='button' value="Approve Times" onClick={approveTimes}></input>
        </form>
    </div>
</section>



</main>
  return (
    {/* Main content within Business Page */}
<main className="container business">
        
{/* Main Header Section on Business Page */}



<section className="containerResults dashboard">
  {/* Dashboard is high-level summary  */}
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
</section>


 {/* Build appointment details here. */}
 <section className="containerResults scheduledAppointments">
  <h3>Here are your schedule appointments</h3>
  
  <div className='scheduledAppointments'>
    
    {Object.keys(business.Appointment).map((appointment, index) => (
      // <h4>{capitalizeFirstLetter(appointment)}</h4>
      <section className="containerResults scheduledAppointment">
        <div>
          <h4>
          {appointments[appointment]["User"]["name_first"]} {appointments[appointment]["User"]["name_last"]} has
          a {appointments[appointment]["status"]}
          - a {appointments[appointment]['Appointment_Type']["name"]} Appointment
            with {appointments[appointment]['Details']['client']['name']} on
            - {dateTimeFull((appointments[appointment]['Details']['date_time']))}
          </h4>

            {/* on {dateFormat((appointments[appointment]['Details']['date_time']))}
            at {dateHourOfDay(appointments[appointment]['Details']['date_time'])}
            for {appointments[appointment]['Details']['durations']} */}
          
          {/* dateGetMonths,
          dateDayOfWeek,
          dateHourOfDay, */}
          <div>
            <h5>Appointment Details</h5>
            <ul>
              <li>Type: {appointments[appointment]['Details']["type"]}</li>
              <li>Subject: {appointments[appointment]['Details']["subject"]}</li>
              <li>Summary: {appointments[appointment]['Details']["summary"]}</li>
              <li>Date & Time for Host: {dateTimeFullLocal(appointments[appointment]['Details']["date_time"])}</li>
              <li>Duration: {appointments[appointment]['Details']["duration"]}</li>
              <li>Appointment ID: {appointments[appointment]["_id"]}</li>
            </ul>
          </div>

          <div>
            <h5>Client Details</h5>
            <ul>
            <li>Name: {appointments[appointment]['Details']['client']['name']}   </li>
            <li>Email: {appointments[appointment]['Details']['client']['email']}  </li>
            <li>Phone: {appointments[appointment]['Details']['client']['phone']}  </li>
            <li>Date & Time for Client: {dateTimeFull(appointments[appointment]['Details']['date_time'])}  </li>
            <li>Timezone: {appointments[appointment]['Details']['timezone']}  </li>
            </ul>
          </div>
        </div>
        <div>
        </div>
      </section>
    ))}
    
    
  </div>

</section>


<section className="containerResults dayOfWeek">
    {/* Setup Days of Week, section. */}
    <h3>It looks like your schedule needs to be setup!</h3>
    
    <div className='dayOfWeek'>
        <p>Please confirm the days and times you are available for appointments.</p>
        <form className='dayOfWeek'>
            {Object.keys(schedule).map( (dayOfWeek, index) => (
            <div>
                
                <h4>{capitalizeFirstLetter(dayOfWeek)}</h4>
                {/* Go through each day of week, present days with times and if verified */}
                {Object.keys(schedule[dayOfWeek]).map((value, index) => ( 
                    <span>
                    {(() => {
                        switch (value) {
                            case 'start'    :   return  <input type='time' id={(`${dayOfWeek}_start`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                            case 'end'      :   return  <input type='time' id={(`${dayOfWeek}_end`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                            case 'verified' :   return  <input type="checkbox" id={(`${dayOfWeek}_verified`)} />;
                            // checked={checked ? 'checked' : ''}
                            default         :   return "NULL";
                        }
                        })()}
                    {/* { (`${schedule[dayOfWeek][time]} -`)  || schedule[dayOfWeek][time] } */}
                    </span>
                ))}
            </div>
            ))}
            {/* submit button for times */}
            <input type='button' value="Approve Times" onClick={approveTimes}></input>
        </form>
    </div>
</section>



</main>
  )
}
